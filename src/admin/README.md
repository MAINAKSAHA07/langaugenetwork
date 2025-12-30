# Admin Section Documentation

## 📍 Location
All admin files are located in `src/admin/`

## 🔐 Access
- **URL**: http://localhost:5173/admin/login
- **Credentials**: 
  - Email: `mainaksaha0807@gmail.com`
  - Password: `8104760831`

## 📁 Structure

```
src/admin/
├── pages/                      # Admin pages
│   ├── AdminLogin.jsx         # Login page
│   ├── AdminDashboard.jsx     # Main dashboard
│   ├── batches/               # Batch management
│   │   ├── AdminBatches.jsx   # Batch listing
│   │   └── AdminBatchEditor.jsx # Create/edit batches
│   └── blogs/                 # Blog management
│       ├── AdminBlogs.jsx     # Blog listing
│       └── AdminBlogEditor.jsx # Create/edit blogs
├── components/                # Admin-specific components (future)
└── hooks/                     # Admin-specific hooks (future)
```

## 🎯 Features

### Dashboard
- View statistics for all collections
- Quick action buttons
- Navigation to management sections

### Batch Management
- List all batches
- Filter by status/language
- Create new batches
- Edit existing batches
- Delete batches
- View enrollment status

### Blog Management
- List all blog posts
- Filter by publish status
- Create new blog posts
- Edit existing posts
- Upload featured images
- Toggle publish status
- Delete posts

## 🔒 Security

- ✅ Admin-only authentication
- ✅ Protected routes
- ✅ JWT token-based auth
- ✅ Auto-redirect if not authenticated

## 🛠️ Development

### Adding New Admin Pages

1. Create page in `src/admin/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in dashboard

### Import Paths

```javascript
// PocketBase client
import pb from '../../api/pocketbase';  // From root admin pages
import pb from '../../../api/pocketbase'; // From nested pages
```

## 📝 Notes

- All admin pages check authentication on mount
- Unauthenticated users are redirected to login
- Admin uses same PocketBase instance as public site
- Admin credentials are stored in PocketBase `_admins` collection

---

For more information, see the main [README.md](../README.md)
