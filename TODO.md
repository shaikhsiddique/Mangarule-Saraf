# Admin Panel Implementation TODO

## Database Schema Updates
- [ ] Create Product model (server/models/Product.ts)
- [ ] Update User model to add role field (server/models/User.ts)

## Authentication & Access Control
- [ ] Update auth utils to include role checking (server/utils/auth.ts)
- [ ] Create admin middleware for protecting routes

## API Endpoints
- [ ] Create /api/admin/products.ts (CRUD operations)
- [ ] Create /api/admin/users.ts (fetch all users)
- [ ] Create /api/products.ts (public product fetching by collection)

## Admin Pages
- [ ] Create /admin/dashboard.tsx (overview with stats)
- [ ] Create /admin/products.tsx (product management)
- [ ] Create /admin/users.tsx (user management)

## Frontend Updates
- [ ] Update Navbar to show admin link for admins (components/Navbar.tsx)
- [ ] Update _app.tsx to handle admin routes
- [ ] Update collection pages to fetch products dynamically
- [ ] Migrate hardcoded products to database

## Testing & Validation
- [ ] Test admin authentication
- [ ] Test product CRUD operations
- [ ] Test user management
- [ ] Test public product fetching
- [ ] Verify collection pages work with dynamic data
