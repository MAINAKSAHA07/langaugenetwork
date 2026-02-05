import PocketBase from 'pocketbase';

// Initialize PocketBase client
const pb = new PocketBase('http://3.101.63.121:8098');

// Enable auto cancellation for duplicate requests
pb.autoCancellation(false);

export default pb;
