import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8098');

// Optional: Enable auto-cancellation
pb.autoCancellation(false);

export default pb;
