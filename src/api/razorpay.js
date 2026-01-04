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
    // Extract language from batchDetails or orderData
    let language = '';
    if (orderData.batchDetails && orderData.batchDetails.language) {
      language = orderData.batchDetails.language;
    } else if (orderData.language) {
      language = orderData.language;
    }
    
    // Create order record in PocketBase
    const order = await pb.collection('orders').create({
      ...orderData,
      language: language || null, // Add language field
      status: 'pending',
      paymentGateway: 'razorpay',
      createdAt: new Date().toISOString(),
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
        // Get the order details to create enrollment
        const order = await pb.collection('orders').getOne(orderId);
        
        // Update order status in PocketBase
        await pb.collection('orders').update(orderId, {
          status: 'completed',
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          completedAt: new Date().toISOString(),
        });

        // Create enrollment record
        try {
          await pb.collection('enrollments').create({
            studentName: order.customerName,
            studentEmail: order.customerEmail,
            studentPhone: order.customerPhone,
            batchId: order.batchId || '',
            courseType: order.courseType || 'batch',
            courseName: description || 'Course Enrollment',
            orderId: orderId,
            status: 'active',
            enrollmentDate: new Date().toISOString(),
            courseDetails: order.batchDetails || {},
          });
          console.log('✅ Enrollment record created');
        } catch (enrollError) {
          console.error('Warning: Failed to create enrollment record:', enrollError);
          // Don't fail the payment if enrollment creation fails
        }

        if (onSuccess) {
          onSuccess(response);
        }
      } catch (error) {
        console.error('Error updating order:', error);
        if (onFailure) {
          onFailure(error);
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

