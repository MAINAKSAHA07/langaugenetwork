import PocketBase from 'pocketbase';

// For local development, use the IP address that works
// For production, this will be set via VITE_POCKETBASE_URL environment variable
const getPocketBaseUrl = () => {
  const envUrl = import.meta.env.VITE_POCKETBASE_URL;
  
  // Check if we're in development (localhost)
  if (import.meta.env.DEV) {
    // If env URL is the production URL, use the working IP for local dev
    if (envUrl && envUrl.includes('thelanguagenetwork.co')) {
      return 'http://3.101.63.121:8098';
    }
    // Otherwise use env URL or default to working IP
    return envUrl || 'http://3.101.63.121:8098';
  }
  // Production: use environment variable or default
  return envUrl || 'https://thelanguagenetwork.co';
};

const pb = new PocketBase(getPocketBaseUrl());

// Optional: Enable auto-cancellation
pb.autoCancellation(false);

export default pb;
