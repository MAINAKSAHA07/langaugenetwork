/**
 * PocketBase Collection API Rules Setup
 * 
 * This script sets up the correct API rules for mastery_kits and mastery_kit_purchases collections
 * Run this on your PocketBase server to allow proper access
 */

// For mastery_kits collection:
// List/View Rule: Allow everyone to list and view (for browsing)
// Create Rule: Only admins (@request.auth.id != "")
// Update Rule: Only admins
// Delete Rule: Only admins

// For mastery_kit_purchases collection:
// List/View Rule: Users can only see their own purchases
//   @request.auth.id != "" && user = @request.auth.id
// Create Rule: Authenticated users can create (for purchases)
//   @request.auth.id != ""
// Update Rule: Only admins
// Delete Rule: Only admins

console.log(`
================================================================================
POCKETBASE API RULES SETUP
================================================================================

Please set the following API rules in your PocketBase admin panel:
http://3.101.63.121:8098/_/

1. Go to Collections → mastery_kits → API Rules

   List/View Rule (allow public browsing):
   ----------------------------------------
   Leave empty or use: @request.auth.id != ""

   Create Rule (admin only):
   -------------------------
   Leave empty (only admins via dashboard)

   Update Rule (admin only):
   -------------------------
   Leave empty (only admins via dashboard)

   Delete Rule (admin only):
   -------------------------
   Leave empty (only admins via dashboard)


2. Go to Collections → mastery_kit_purchases → API Rules

   List/View Rule (users see only their purchases):
   ------------------------------------------------
   @request.auth.id != "" && user = @request.auth.id

   Create Rule (authenticated users can purchase):
   -----------------------------------------------
   @request.auth.id != ""

   Update Rule (admin only):
   -------------------------
   Leave empty (only admins via dashboard)

   Delete Rule (admin only):
   -------------------------
   Leave empty (only admins via dashboard)


3. IMPORTANT: For admin access to work properly, you need to either:
   
   Option A: Use admin authentication
   - Login via: pb.admins.authWithPassword(email, password)
   - Admins bypass all API rules
   
   Option B: Make your user an admin
   - Go to Settings → Admins
   - Create an admin account
   - Use that for admin panel access


================================================================================
CURRENT ISSUE:
================================================================================

Your admin panel is using regular user authentication, but trying to access
collections that require admin permissions. You need to:

1. Set the API rules as shown above, OR
2. Update AdminLogin.jsx to use admin authentication:
   
   Change:
   await pb.collection('users').authWithPassword(email, password);
   
   To:
   await pb.admins.authWithPassword(email, password);

================================================================================
`);
