import PocketBase from 'pocketbase';

// Initialize PocketBase client with environment variable
// Falls back to localhost for development
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Enable auto cancellation for duplicate requests
pb.autoCancellation(false);

export default pb;
