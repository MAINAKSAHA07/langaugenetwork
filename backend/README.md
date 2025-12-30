# Backend Structure

This directory contains the backend infrastructure for The Language Network application.

## Directory Structure

```
backend/
├── api/                    # API layer
│   ├── routes/            # API route definitions
│   ├── controllers/       # Request handlers and business logic
│   ├── middleware/        # Authentication, validation, error handling
│   └── services/          # Database interaction layer
├── pb_data/               # PocketBase database files
├── scripts/               # Setup and utility scripts
│   ├── setup-collections.cjs    # Database schema setup
│   ├── seed-data.cjs           # Seed data for development
│   └── admin-client.cjs        # Admin client utilities
└── schema-setup.md        # Database schema documentation

## Technology Stack

- **Database**: PocketBase (SQLite-based)
- **Authentication**: PocketBase Auth
- **API**: RESTful API with PocketBase SDK
- **File Storage**: PocketBase File Storage

## API Structure

### Routes
- `/api/auth/*` - Authentication endpoints
- `/api/batches/*` - Batch management
- `/api/blogs/*` - Blog management
- `/api/contacts/*` - Contact submissions
- `/api/demos/*` - Demo registrations
- `/api/newsletters/*` - Newsletter subscriptions

### Controllers
Each controller handles business logic for a specific resource:
- `authController.js` - Authentication logic
- `batchController.js` - Batch CRUD operations
- `blogController.js` - Blog CRUD operations
- `contactController.js` - Contact form handling
- `demoController.js` - Demo registration handling
- `newsletterController.js` - Newsletter subscription handling

### Services
Services provide a clean interface to the database:
- `batchService.js` - Batch database operations
- `blogService.js` - Blog database operations
- `contactService.js` - Contact database operations
- `demoService.js` - Demo database operations
- `newsletterService.js` - Newsletter database operations

### Middleware
- `authMiddleware.js` - JWT validation and user authentication
- `validationMiddleware.js` - Request validation
- `errorHandler.js` - Global error handling

## Running the Backend

```bash
# Start PocketBase server
npm run backend

# Build PocketBase Docker image
npm run backend:build

# Stop PocketBase server
npm run backend:down

# View PocketBase logs
npm run backend:logs

# Setup database collections
npm run pb:setup

# Seed database with sample data
npm run pb:seed

# Reset database (WARNING: Deletes all data)
npm run pb:reset

# Initialize database (setup + seed)
npm run pb:init
```

## Environment Variables

Required environment variables (see `.env.example`):
- `VITE_POCKETBASE_URL` - PocketBase server URL (default: http://127.0.0.1:8098)

## PocketBase Admin Panel

Access the PocketBase admin panel at: http://127.0.0.1:8098/_/

Default admin credentials are created during first setup.

## API Documentation

### Authentication

**Login**
```
POST /api/collections/users/auth-with-password
Body: { email, password }
```

**Logout**
```
POST /api/collections/users/auth-refresh
```

### Batches

**Get All Batches**
```
GET /api/collections/batches/records
Query: ?filter=status="upcoming"&sort=-startDate
```

**Get Single Batch**
```
GET /api/collections/batches/records/:id
```

**Create Batch** (Admin only)
```
POST /api/collections/batches/records
Body: { language, level, mode, startDate, endDate, ... }
```

**Update Batch** (Admin only)
```
PATCH /api/collections/batches/records/:id
Body: { field: value }
```

**Delete Batch** (Admin only)
```
DELETE /api/collections/batches/records/:id
```

### Blogs

Similar structure to Batches, with additional fields for content, excerpt, featuredImage, etc.

### Contacts

**Submit Contact Form**
```
POST /api/collections/contact_submissions/records
Body: { name, email, message, ... }
```

### Demo Registrations

**Register for Demo**
```
POST /api/collections/demo_registrations/records
Body: { name, email, phone, language, ... }
```

### Newsletter

**Subscribe to Newsletter**
```
POST /api/collections/newsletter_subscribers/records
Body: { email }
```

## Database Schema

See `schema-setup.md` for detailed database schema documentation.

## Development Notes

1. **PocketBase SDK**: The frontend uses the PocketBase JavaScript SDK for direct database access
2. **Real-time**: PocketBase supports real-time subscriptions for live updates
3. **File Upload**: Images and files are handled through PocketBase's built-in file storage
4. **Authentication**: Uses PocketBase's built-in authentication system with JWT tokens
5. **CORS**: Configured in PocketBase settings for frontend access

## Security

- Admin routes require authentication
- File uploads are validated for type and size
- SQL injection protection through PocketBase ORM
- XSS protection through input sanitization
- CSRF protection through token validation
