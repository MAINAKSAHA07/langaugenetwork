# PocketBase Database Schema Setup Guide

This guide will help you set up all the required collections in PocketBase for The Language Network application.

## Prerequisites

- PocketBase is running (use `npm run backend`)
- Access to PocketBase Admin Panel at http://127.0.0.1:8098/_/

## Setup Steps

### 1. Create Admin Account

When you first access the admin panel, you'll be prompted to create an admin account:

1. Visit http://127.0.0.1:8098/_/
2. Fill in your admin credentials (email and password)
3. Click "Create and login"

**Note:** The first user created automatically becomes the admin.

---

## Collections to Create

### Collection 1: `contact_submissions`

**Purpose:** Store contact form submissions from the Contact page

**Fields:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| fullName | Text | Yes | Min: 2, Max: 100 |
| email | Email | Yes | - |
| mobile | Text | Yes | - |
| language | Select | Yes | Options: French, German, Spanish, English, Japanese, Korean, Mandarin |
| message | Text | Yes | Min: 10, Max: 1000 |
| status | Select | No | Options: new, read, replied (Default: new) |

**Access Rules:**
- List Rule: `@request.auth.id != ""`
- View Rule: `@request.auth.id != ""`
- Create Rule: `` (empty - allow public)
- Update Rule: `@request.auth.id != ""`
- Delete Rule: `@request.auth.id != ""`

**Steps to Create:**
1. Click "New collection"
2. Name: `contact_submissions`
3. Type: Base collection
4. Add fields as specified above
5. Configure access rules in the "API Rules" tab

---

### Collection 2: `demo_registrations`

**Purpose:** Store demo class registration requests

**Fields:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| name | Text | Yes | Min: 2, Max: 100 |
| email | Email | Yes | - |
| phone | Text | Yes | - |
| language | Select | Yes | Options: French, German, Spanish, English, Japanese, Korean, Mandarin |
| status | Select | No | Options: pending, scheduled, completed, cancelled (Default: pending) |
| notes | Text | No | Max: 500 |

**Access Rules:** Same as contact_submissions

---

### Collection 3: `school_enrollments`

**Purpose:** Store B2B enrollment inquiries from schools

**Fields:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| fullName | Text | Yes | Min: 2, Max: 100 |
| contactNo | Text | Yes | - |
| designation | Text | Yes | - |
| email | Email | Yes | - |
| schoolName | Text | Yes | - |
| schoolAddress | Text | Yes | - |
| languageInterest | Select | Yes | Options: French, German, Spanish, English, Japanese, Korean, Mandarin |
| hearAboutUs | Select | No | Options: Social Media, Referral, Search Engine, Other |
| status | Select | No | Options: new, contacted, proposal_sent, closed (Default: new) |

**Access Rules:** Same as contact_submissions

---

### Collection 4: `college_enrollments`

**Purpose:** Store B2B enrollment inquiries from colleges

**Fields:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| fullName | Text | Yes | Min: 2, Max: 100 |
| contactNo | Text | Yes | - |
| designation | Text | Yes | - |
| email | Email | Yes | - |
| collegeName | Text | Yes | - |
| collegeAddress | Text | Yes | - |
| languageInterest | Select | Yes | Options: French, German, Spanish, English, Japanese, Korean, Mandarin |
| hearAboutUs | Select | No | Options: Social Media, Referral, Search Engine, Other |
| status | Select | No | Options: new, contacted, proposal_sent, closed (Default: new) |

**Access Rules:** Same as contact_submissions

---

### Collection 5: `corporate_enrollments`

**Purpose:** Store B2B enrollment inquiries from companies

**Fields:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| fullName | Text | Yes | Min: 2, Max: 100 |
| contactNo | Text | Yes | - |
| designation | Text | Yes | - |
| email | Email | Yes | - |
| companyName | Text | Yes | - |
| languageInterest | Select | Yes | Options: French, German, Spanish, English, Japanese, Korean, Mandarin |
| status | Select | No | Options: new, contacted, proposal_sent, closed (Default: new) |

**Access Rules:** Same as contact_submissions

---

### Collection 6: `newsletter_subscribers`

**Purpose:** Store newsletter email subscriptions

**Fields:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| email | Email | Yes | Unique: true |
| subscribedAt | Date | Yes | - |
| isActive | Bool | Yes | Default: true |

**Access Rules:**
- List Rule: `@request.auth.id != ""`
- View Rule: `@request.auth.id != ""`
- Create Rule: `` (empty - allow public)
- Update Rule: `@request.auth.id != ""`
- Delete Rule: `@request.auth.id != ""`

---

### Collection 7: `blogs`

**Purpose:** Store blog posts with author information

**Fields:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| title | Text | Yes | Min: 5, Max: 200 |
| slug | Text | Yes | Unique: true, Pattern: URL-safe (lowercase, hyphens) |
| content | Editor | Yes | Rich text editor |
| excerpt | Text | No | Max: 300 |
| featuredImage | File | No | Max files: 1, Allowed types: image/jpeg, image/png, image/webp |
| author | Relation | Yes | Collection: users, Display fields: name |
| category | Select | No | Options: News, Tips, Success Stories, Events, General |
| tags | JSON | No | Array of strings |
| published | Bool | Yes | Default: false |
| publishedAt | Date | No | - |

**Access Rules:**
- List Rule: `published = true || @request.auth.id != ""`
- View Rule: `published = true || @request.auth.id != ""`
- Create Rule: `@request.auth.id != ""`
- Update Rule: `@request.auth.id != ""`
- Delete Rule: `@request.auth.id != ""`

---

### Collection 8: `batches`

**Purpose:** Store language batch/course information

**Fields:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| language | Select | Yes | Options: French, German, Spanish, English, Japanese, Korean, Mandarin |
| level | Select | Yes | Options: A1, A2, B1, B2, C1, C2, Beginner, Intermediate, Advanced |
| mode | Select | Yes | Options: Online, Offline, Hybrid |
| startDate | Date | Yes | - |
| endDate | Date | Yes | - |
| schedule | Text | Yes | e.g., "Mon/Wed/Fri 6-7 PM" |
| capacity | Number | Yes | Min: 1, Max: 30 |
| enrolled | Number | Yes | Default: 0, Min: 0 |
| price | Number | Yes | Min: 0 |
| instructor | Relation | No | Collection: users, Display fields: name |
| status | Select | Yes | Options: upcoming, ongoing, completed, cancelled (Default: upcoming) |
| description | Text | No | Max: 500 |

**Access Rules:**
- List Rule: `` (empty - public read)
- View Rule: `` (empty - public read)
- Create Rule: `@request.auth.id != ""`
- Update Rule: `@request.auth.id != ""`
- Delete Rule: `@request.auth.id != ""`

---

### Collection 9: `users` (Built-in - Customize)

**Purpose:** User authentication and profile management

**Additional Custom Fields to Add:**

| Field Name | Type | Required | Options/Validation |
|------------|------|----------|-------------------|
| role | Select | Yes | Options: student, teacher, admin (Default: student) |
| phone | Text | No | - |
| languages | JSON | No | Array of language preferences |
| avatar | File | No | Max files: 1, Allowed types: image/jpeg, image/png, image/webp |

**Built-in Fields:** (Already present)
- email (Email, required, unique)
- emailVisibility (Bool)
- verified (Bool)
- name (Text)
- avatar (File)

**Access Rules:**
- List Rule: `@request.auth.id != ""`
- View Rule: `@request.auth.id != "" || id = @request.auth.id`
- Create Rule: `` (empty - allow registration)
- Update Rule: `id = @request.auth.id`
- Delete Rule: `id = @request.auth.id`

---

## Testing Your Setup

### 1. Test Form Submissions

After creating all collections, test the forms:

1. Start the backend: `npm run backend`
2. Start the frontend: `npm run dev`
3. Navigate to http://localhost:5173/contact
4. Fill and submit the contact form
5. Check the PocketBase admin panel → contact_submissions to verify the data was saved

### 2. Test Other Forms

- Demo registration: Click "Book Free Demo" button on homepage
- School enrollment: Visit http://localhost:5173/school
- College enrollment: Visit http://localhost:5173/college
- Corporate enrollment: Visit http://localhost:5173/corporate

### 3. Check Data in Admin Panel

1. Go to http://127.0.0.1:8098/_/
2. Click on each collection
3. Verify that submitted data appears correctly
4. Test updating the status field for submissions

---

## Import/Export Schema (Optional)

### Export Collections

To backup your schema:
1. PocketBase Admin → Settings → Export collections
2. Save the JSON file

### Import Collections

To restore or replicate schema:
1. PocketBase Admin → Settings → Import collections
2. Upload the JSON file

---

## Troubleshooting

### Issue: Can't submit forms (403 Forbidden)

**Solution:** Check Create Rule is empty (``) for public collections (contact_submissions, demo_registrations, etc.)

### Issue: Can't see submitted data

**Solution:**
1. Check if data was actually submitted (browser console for errors)
2. Verify List/View rules allow authenticated users
3. Make sure you're logged into admin panel

### Issue: Unique constraint violation

**Solution:** For fields like `email` in newsletter_subscribers, the field is set to unique. Submitting the same email twice will fail. This is expected behavior.

---

## Next Steps

1. ✅ All collections created
2. ✅ Access rules configured
3. ✅ Forms tested and working
4. Consider adding sample data for blogs and batches
5. Set up email notifications (optional - requires SMTP configuration)
6. Create admin user accounts for team members

---

## Sample Data for Testing

### Sample Blog Post

```json
{
  "title": "5 Reasons to Learn French in 2025",
  "slug": "5-reasons-to-learn-french-2025",
  "content": "<p>Learning French opens doors to amazing opportunities...</p>",
  "excerpt": "Discover why French is one of the most valuable languages to learn this year",
  "published": true,
  "publishedAt": "2025-01-15",
  "category": "Tips"
}
```

### Sample Batch

```json
{
  "language": "French",
  "level": "A1",
  "mode": "Online",
  "startDate": "2025-02-01",
  "endDate": "2025-04-30",
  "schedule": "Mon/Wed/Fri 6-7 PM",
  "capacity": 15,
  "enrolled": 8,
  "price": 15000,
  "status": "upcoming",
  "description": "Beginner French course for complete beginners"
}
```

---

**Congratulations!** Your PocketBase database is now fully set up and ready to use with The Language Network application.
