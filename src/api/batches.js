import pb from './pocketbase';

/**
 * Get upcoming batches
 */
export const getUpcomingBatches = async (language = null, level = null) => {
  try {
    let filter = 'status = "upcoming" || status = "ongoing"';
    if (language) filter += ` && language = "${language}"`;
    if (level) filter += ` && level = "${level}"`;

    const records = await pb.collection('batches').getFullList({
      filter,
      sort: 'startDate',
      expand: 'instructor',
    });
    return { success: true, data: records };
  } catch (error) {
    console.error('Fetch batches error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get batch by ID
 */
export const getBatchById = async (id) => {
  try {
    const record = await pb.collection('batches').getOne(id, {
      expand: 'instructor',
    });
    return { success: true, data: record };
  } catch (error) {
    console.error('Fetch batch error:', error);
    return { success: false, error: error.message };
  }
};
