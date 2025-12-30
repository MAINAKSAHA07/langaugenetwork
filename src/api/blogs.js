import pb from './pocketbase';

/**
 * Get all published blogs
 */
export const getPublishedBlogs = async () => {
  try {
    const records = await pb.collection('blogs').getFullList({
      filter: 'published = true',
      sort: '-publishedAt',
      expand: 'author',
    });
    return { success: true, data: records };
  } catch (error) {
    console.error('Fetch blogs error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get single blog by slug
 */
export const getBlogBySlug = async (slug) => {
  try {
    const record = await pb.collection('blogs').getFirstListItem(`slug="${slug}"`, {
      expand: 'author',
    });
    return { success: true, data: record };
  } catch (error) {
    console.error('Fetch blog error:', error);
    return { success: false, error: error.message };
  }
};
