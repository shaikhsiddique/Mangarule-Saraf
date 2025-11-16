# TODO: Fix 401 Error on /api/auth/me

## Steps to Complete
- [x] Update context/AuthContext.tsx to use 'token' as localStorage key instead of 'auth_token'
- [x] Update pages/admin/login.tsx to use 'token' as localStorage key instead of 'auth_token'
- [ ] Redeploy the project on Vercel
- [ ] Test login flow (user and admin) to verify /api/auth/me returns 200 instead of 401

## New Issues: 500 Internal Server Errors
- [ ] Investigate 500 error on GET /api/products
- [ ] Investigate 500 error on POST /api/auth/login
- [ ] Check Vercel logs for server-side errors (e.g., MongoDB connection, environment variables)
