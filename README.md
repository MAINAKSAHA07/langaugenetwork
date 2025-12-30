# The Language Network

A modern language learning platform built with React, Vite, and PocketBase.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd language-network
   npm install
   ```

2. **Start the application**:
   ```bash
   npm run dev:all
   ```
   This starts both frontend (port 5173) and backend (port 8098).

3. **Access the application**:
   - **Frontend**: http://localhost:5173
   - **Admin Panel**: http://localhost:5173/admin/login
   - **PocketBase Admin**: http://127.0.0.1:8098/_/

---

## 📁 Project Structure

```
language-network/
├── backend/                    # Backend (PocketBase)
│   ├── api/services/          # Service layer for data operations
│   ├── pb_data/               # PocketBase database
│   └── scripts/               # Setup and seed scripts
│
├── src/                       # Frontend (React + Vite)
│   ├── admin/                 # Admin section
│   │   ├── pages/            # Admin pages
│   │   ├── components/       # Admin components
│   │   └── hooks/            # Admin hooks
│   ├── api/                  # API client layer
│   ├── components/           # Shared components
│   ├── pages/                # Public pages
│   └── App.jsx               # Main application
│
└── public/                    # Static assets
```

---

## 🔐 Admin Access

### Login Credentials
- **Email**: `mainaksaha0807@gmail.com`
- **Password**: `8104760831`

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard
- `/admin/batches` - Batch management
- `/admin/blogs` - Blog management
- `/admin/contacts` - Contact submissions
- `/admin/demos` - Demo registrations
- `/admin/newsletters` - Newsletter subscribers

### Admin Features
- ✅ Dashboard with statistics
- ✅ Batch CRUD operations
- ✅ Blog CRUD operations with image upload
- ✅ Contact form submissions
- ✅ Demo registration management
- ✅ Newsletter subscriber management

---

## 🗄️ Database (PocketBase)

### Collections

| Collection | Purpose | Public Access |
|-----------|---------|---------------|
| `batches` | Language batches/courses | Read only |
| `blogs` | Blog posts | Published only |
| `contact_submissions` | Contact form data | Create only |
| `demo_registrations` | Demo requests | Create only |
| `school_enrollments` | School inquiries | Create only |
| `college_enrollments` | College inquiries | Create only |
| `corporate_enrollments` | Corporate inquiries | Create only |
| `newsletter_subscribers` | Email subscriptions | Create only |

### Database Setup

**First-time setup**:
```bash
npm run pb:setup    # Create collections
npm run pb:seed     # Add sample data (optional)
```

**Reset database** (if needed):
```bash
npm run pb:reset    # Delete and recreate all collections
```

---

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start frontend only (port 5173)
npm run backend      # Start PocketBase only (port 8098)
npm run dev:all      # Start both frontend and backend
```

### Database Management
```bash
npm run pb:setup     # Create PocketBase collections
npm run pb:seed      # Seed sample data
npm run pb:reset     # Reset database (delete all data)
npm run pb:init      # Setup + seed (fresh start)
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🎨 Key Features

### Public Features
- 🌍 Multi-language course offerings (French, German, Spanish, etc.)
- 📚 Blog with categories and tags
- 📅 Upcoming batch listings (real-time from database)
- 📝 Contact forms
- 🎓 Demo class registration
- 🏫 B2B enrollment (Schools, Colleges, Corporate)
- 📧 Newsletter subscription

### Admin Features
- 📊 Dashboard with statistics
- 📝 Batch management (CRUD)
- ✍️ Blog management with rich text editor
- 📬 View and manage submissions
- 👥 User management (future)

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# PocketBase Configuration
VITE_POCKETBASE_URL=http://127.0.0.1:8098
VITE_API_URL=http://127.0.0.1:8098/api

# App Configuration
VITE_APP_NAME=The Language Network
VITE_APP_URL=http://localhost:5173

# Admin Credentials (for reference only - do not commit!)
pocketbase_admin=mainaksaha0807@gmail.com
pocketbase_password=8104760831
```

⚠️ **Security**: Never commit `.env` to git. It's already in `.gitignore`.

---

## 🐛 Common Issues & Fixes

### Issue: 405 Method Not Allowed

**Cause**: PocketBase URL misconfigured or server needs restart

**Solution**:
1. Check `.env` has correct `VITE_POCKETBASE_URL=http://127.0.0.1:8098`
2. Restart servers: `Ctrl+C` then `npm run dev:all`

### Issue: Batches not showing on homepage

**Cause**: No batches with status "upcoming" in database

**Solution**:
1. Go to admin panel: http://localhost:5173/admin/login
2. Create a batch with `status = "upcoming"`
3. Refresh homepage

### Issue: Can't login to admin

**Cause**: Wrong credentials or PocketBase not running

**Solution**:
1. Verify PocketBase is running: `npm run backend`
2. Check credentials: `mainaksaha0807@gmail.com` / `8104760831`
3. Create admin account at: http://127.0.0.1:8098/_/

### Issue: Demo registration fails

**Cause**: Collections not created

**Solution**:
```bash
npm run pb:setup
```

---

## 📚 Documentation

### Backend Services

Located in `backend/api/services/`:
- `authService.js` - Authentication & authorization
- `batchService.js` - Batch CRUD operations
- `blogService.js` - Blog CRUD operations
- `contactService.js` - Contact form submissions
- `demoService.js` - Demo registrations
- `newsletterService.js` - Newsletter subscriptions

### Frontend Structure

- **Admin Section** (`src/admin/`): Protected admin pages
- **Public Section** (`src/pages/`): Public-facing pages
- **Shared Components** (`src/components/`): Reusable components
- **API Layer** (`src/api/`): PocketBase client and services

---

## 🔒 Security

### Admin Access
- ✅ Admin-only authentication enforced
- ✅ Protected routes with auth checks
- ✅ Token-based authentication (JWT)
- ✅ Session persistence

### Data Access
- ✅ Public can only CREATE submissions (not read)
- ✅ Public can READ published blogs and batches
- ✅ Only admins can manage data
- ✅ CORS configured for local development

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set environment variable: `VITE_POCKETBASE_URL=<your-pocketbase-url>`

### Backend (PocketBase)
1. Download PocketBase for your server OS
2. Copy `pb_data/` folder
3. Run: `./pocketbase serve --http=0.0.0.0:8098`
4. Configure domain and SSL

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📞 Support

- **Admin Panel**: http://127.0.0.1:8098/_/
- **Frontend**: http://localhost:5173
- **Issues**: Check browser console for errors

---

## 📝 License

Private project - All rights reserved

---

## 🎉 Credits

Built with:
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [PocketBase](https://pocketbase.io/) - Backend & database
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

**Last Updated**: December 29, 2025
**Version**: 1.0.0
