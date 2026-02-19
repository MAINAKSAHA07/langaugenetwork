import pb from './pocketbase';

/**
 * Load Razorpay script
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Create Razorpay order
 */
export const createRazorpayOrder = async (orderData) => {
  try {
    // Normalize language to match PocketBase select enum (must be capitalized)
    const VALID_LANGUAGES = ['French', 'German', 'Spanish', 'English', 'Japanese', 'Korean', 'Mandarin'];
    const rawLanguage = (orderData.batchDetails?.language || orderData.language || '').trim();
    const normalizedLanguage = rawLanguage
      ? rawLanguage.charAt(0).toUpperCase() + rawLanguage.slice(1).toLowerCase()
      : null;
    const language = VALID_LANGUAGES.includes(normalizedLanguage) ? normalizedLanguage : null;

    // Only send fields that exist in the PocketBase orders schema
    const order = await pb.collection('orders').create({
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      status: 'pending',
      paymentGateway: 'razorpay',
      courseType: orderData.courseType || '',
      batchId: orderData.batchId || '',
      batchDetails: orderData.batchDetails || {},
      language: language,
    });

    return { success: true, order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Initiate Razorpay payment
 */
export const initiateRazorpayPayment = async (orderDetails) => {
  // Load Razorpay script
  const scriptLoaded = await loadRazorpayScript();

  if (!scriptLoaded) {
    alert('Razorpay SDK failed to load. Please check your internet connection.');
    return { success: false, error: 'Script load failed' };
  }

  const {
    amount,
    currency = 'INR',
    orderId,
    name,
    description,
    email,
    phone,
    onSuccess,
    onFailure,
  } = orderDetails;

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: amount * 100, // Convert to paise (smallest currency unit)
    currency: currency,
    name: 'The Language Network',
    description: description || 'Course Enrollment Payment',
    image: '/images/TLN_icon.png',
    prefill: {
      name: name || '',
      email: email || '',
      contact: phone || '',
    },
    notes: {
      address: 'The Language Network',
    },
    theme: {
      color: '#1F9F90', // Your brand color
    },
    handler: async function (response) {
      // Payment successful
      console.log('Payment successful:', response);

      try {
        // Update order status in PocketBase (no auth needed — updateRule is open)
        await pb.collection('orders').update(orderId, {
          status: 'completed',
          razorpayPaymentId: response.razorpay_payment_id,   // correct field name
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          completedAt: new Date().toISOString(),
        });
        console.log('✅ Order updated to completed');

        // Create enrollment record (best-effort, non-blocking)
        try {
          const order = await pb.collection('orders').getOne(orderId);
          await pb.collection('enrollments').create({
            studentName: order.customerName,
            studentEmail: order.customerEmail,
            studentPhone: order.customerPhone,
            batchId: order.batchId || '',
            courseType: order.courseType || 'mastery-kit',
            courseName: description || 'Course Enrollment',
            orderId: orderId,
            status: 'active',
            enrollmentDate: new Date().toISOString(),
            courseDetails: order.batchDetails || {},
          });
          console.log('✅ Enrollment record created');
        } catch (enrollError) {
          console.error('Warning: Failed to create enrollment record:', enrollError);
          // Non-fatal — don't block onSuccess
        }

        // Always call onSuccess so access-granting logic runs
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (error) {
        console.error('Error updating order:', error);
        // Still call onSuccess so user gets access even if DB update failed
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
    modal: {
      ondismiss: function () {
        // Payment cancelled
        console.log('Payment cancelled by user');
        if (onFailure) {
          onFailure({ error: 'Payment cancelled by user' });
        }
      },
    },
  };

  try {
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    return { success: true };
  } catch (error) {
    console.error('Error opening Razorpay:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Verify payment (call this after payment success)
 */
export const verifyPayment = async (paymentData) => {
  try {
    // Check if the payment record exists and is completed
    const order = await pb.collection('orders').getOne(paymentData.orderId);

    return {
      success: order.status === 'completed',
      order,
    };
  } catch (error) {
    console.error('Payment verification error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get order by ID
 */
export const getOrder = async (orderId) => {
  try {
    const order = await pb.collection('orders').getOne(orderId);
    return { success: true, order };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: error.message };
  }
};

