/**
 * PocketBase Collection Schema Definitions
 * All collection schemas for The Language Network
 */

/**
 * Language options used across collections
 */
const LANGUAGE_OPTIONS = [
  'French',
  'German',
  'Spanish',
  'English',
  'Japanese',
  'Korean',
  'Mandarin'
];

/**
 * Collection schema definitions
 * Each collection includes fields, indexes, and access rules
 */
const collectionSchemas = [
  // 1. Contact Submissions
  {
    name: 'contact_submissions',
    type: 'base',
    schema: [
      { name: 'fullName', type: 'text', required: true, options: { min: 2, max: 100 } },
      { name: 'email', type: 'email', required: true },
      { name: 'mobile', type: 'text', required: true },
      {
        name: 'language',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: LANGUAGE_OPTIONS,
        },
      },
      { name: 'message', type: 'text', required: true, options: { min: 10, max: 1000 } },
      {
        name: 'status',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['new', 'read', 'replied'],
        },
      },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '', // Public
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  },

  // 2. Demo Registrations
  {
    name: 'demo_registrations',
    type: 'base',
    schema: [
      { name: 'name', type: 'text', required: true, options: { min: 2, max: 100 } },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'text', required: true },
      {
        name: 'language',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: LANGUAGE_OPTIONS,
        },
      },
      {
        name: 'status',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['pending', 'scheduled', 'completed', 'cancelled'],
        },
      },
      { name: 'notes', type: 'text', required: false, options: { max: 500 } },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '', // Public
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  },

  // 3. School Enrollments
  {
    name: 'school_enrollments',
    type: 'base',
    schema: [
      { name: 'fullName', type: 'text', required: true, options: { min: 2, max: 100 } },
      { name: 'contactNo', type: 'text', required: true },
      { name: 'designation', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'schoolName', type: 'text', required: true },
      { name: 'schoolAddress', type: 'text', required: true },
      {
        name: 'languageInterest',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: LANGUAGE_OPTIONS,
        },
      },
      {
        name: 'hearAboutUs',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['Social Media', 'Referral', 'Search Engine', 'Other'],
        },
      },
      {
        name: 'status',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['new', 'contacted', 'proposal_sent', 'closed'],
        },
      },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '', // Public
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  },

  // 4. College Enrollments
  {
    name: 'college_enrollments',
    type: 'base',
    schema: [
      { name: 'fullName', type: 'text', required: true, options: { min: 2, max: 100 } },
      { name: 'contactNo', type: 'text', required: true },
      { name: 'designation', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'collegeName', type: 'text', required: true },
      { name: 'collegeAddress', type: 'text', required: true },
      {
        name: 'languageInterest',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: LANGUAGE_OPTIONS,
        },
      },
      {
        name: 'hearAboutUs',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['Social Media', 'Referral', 'Search Engine', 'Other'],
        },
      },
      {
        name: 'status',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['new', 'contacted', 'proposal_sent', 'closed'],
        },
      },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '', // Public
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  },

  // 5. Corporate Enrollments
  {
    name: 'corporate_enrollments',
    type: 'base',
    schema: [
      { name: 'fullName', type: 'text', required: true, options: { min: 2, max: 100 } },
      { name: 'contactNo', type: 'text', required: true },
      { name: 'designation', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'companyName', type: 'text', required: true },
      {
        name: 'languageInterest',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: LANGUAGE_OPTIONS,
        },
      },
      {
        name: 'status',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['new', 'contacted', 'proposal_sent', 'closed'],
        },
      },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '', // Public
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  },

  // 6. Newsletter Subscribers
  {
    name: 'newsletter_subscribers',
    type: 'base',
    schema: [
      { name: 'email', type: 'email', required: true, options: { exceptDomains: [] } },
      { name: 'subscribedAt', type: 'date', required: true },
      { name: 'isActive', type: 'bool', required: true },
    ],
    indexes: ['CREATE UNIQUE INDEX idx_newsletter_email ON newsletter_subscribers (email)'],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: '', // Public
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  },

  // 7. Blogs (requires users collection for author relation)
  {
    name: 'blogs',
    type: 'base',
    schema: [
      { name: 'title', type: 'text', required: true, options: { min: 5, max: 200 } },
      { name: 'slug', type: 'text', required: true, options: { min: 5, max: 200 } },
      { name: 'content', type: 'editor', required: true },
      { name: 'excerpt', type: 'text', required: false, options: { max: 300 } },
      {
        name: 'featuredImage',
        type: 'file',
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880, // 5MB
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        },
      },
      {
        name: 'category',
        type: 'select',
        required: false,
        options: {
          maxSelect: 1,
          values: ['News', 'Tips', 'Success Stories', 'Events', 'General'],
        },
      },
      { name: 'tags', type: 'json', required: false },
      { name: 'published', type: 'bool', required: true },
      { name: 'publishedAt', type: 'date', required: false },
      { name: 'author', type: 'text', required: false, options: { max: 100 } },
    ],
    indexes: ['CREATE UNIQUE INDEX idx_blog_slug ON blogs (slug)'],
    listRule: 'published = true || @request.auth.id != ""',
    viewRule: 'published = true || @request.auth.id != ""',
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  },

  // 8. Batches
  {
    name: 'batches',
    type: 'base',
    schema: [
      {
        name: 'language',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: LANGUAGE_OPTIONS,
        },
      },
      {
        name: 'level',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Beginner', 'Intermediate', 'Advanced'],
        },
      },
      {
        name: 'mode',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['Online', 'Offline', 'Hybrid'],
        },
      },
      { name: 'startDate', type: 'date', required: true },
      { name: 'endDate', type: 'date', required: true },
      { name: 'schedule', type: 'text', required: true, options: { max: 200 } },
      { name: 'capacity', type: 'number', required: true, options: { min: 1, max: 30 } },
      { name: 'enrolled', type: 'number', required: true, options: { min: 0 } },
      { name: 'price', type: 'number', required: true, options: { min: 0 } },
      { name: 'instructor', type: 'text', required: false, options: { max: 100 } },
      {
        name: 'status',
        type: 'select',
        required: true,
        options: {
          maxSelect: 1,
          values: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        },
      },
      { name: 'description', type: 'text', required: false, options: { max: 500 } },
    ],
    listRule: '', // Public read
    viewRule: '', // Public read
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  },
];

module.exports = { LANGUAGE_OPTIONS, collectionSchemas };

