/**
 * Admin Pages Index
 * Centralized exports for all admin pages
 */

// Main admin pages
export { default as AdminLogin } from './AdminLogin';
export { default as AdminDashboard } from './AdminDashboard';

// Batch management
export { default as AdminBatches } from './batches/AdminBatches';
export { default as AdminBatchEditor } from './batches/AdminBatchEditor';

// Blog management
export { default as AdminBlogs } from './blogs/AdminBlogs';
export { default as AdminBlogEditor } from './blogs/AdminBlogEditor';

// Enrollment management
export { default as AdminSchoolEnrollments } from './AdminSchoolEnrollments';
export { default as AdminCollegeEnrollments } from './AdminCollegeEnrollments';
