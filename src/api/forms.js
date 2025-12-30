import pb from './pocketbase';

/**
 * Submit contact form
 */
export const submitContactForm = async (formData) => {
  try {
    const record = await pb.collection('contact_submissions').create({
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      language: formData.language,
      message: formData.message,
    });
    return { success: true, data: record };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Submit demo registration
 */
export const submitDemoRegistration = async (formData) => {
  try {
    const record = await pb.collection('demo_registrations').create({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      language: formData.language,
    });
    return { success: true, data: record };
  } catch (error) {
    console.error('Demo registration error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Submit school enrollment
 */
export const submitSchoolEnrollment = async (formData) => {
  try {
    const record = await pb.collection('school_enrollments').create(formData);
    return { success: true, data: record };
  } catch (error) {
    console.error('School enrollment error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Submit college enrollment
 */
export const submitCollegeEnrollment = async (formData) => {
  try {
    const record = await pb.collection('college_enrollments').create(formData);
    return { success: true, data: record };
  } catch (error) {
    console.error('College enrollment error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Submit corporate enrollment
 */
export const submitCorporateEnrollment = async (formData) => {
  try {
    const record = await pb.collection('corporate_enrollments').create(formData);
    return { success: true, data: record };
  } catch (error) {
    console.error('Corporate enrollment error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Subscribe to newsletter
 */
export const subscribeNewsletter = async (email) => {
  try {
    const record = await pb.collection('newsletter_subscribers').create({
      email,
      subscribedAt: new Date().toISOString(),
      isActive: true, // Add required field
    });
    return { success: true, data: record };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error: error.message };
  }
};
