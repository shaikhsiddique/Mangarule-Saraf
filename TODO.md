# TODO: Fix Admin Login Page Accessibility

## Tasks to Complete
- [x] Update `pages/_app.tsx` to include `/admin/login` in the `publicRoutes` set

- [ ] Test the application by navigating to the admin login page (via navbar link or user login page link) to confirm it opens without redirecting to user login
- [ ] Verify that logging in as an admin from `/admin/login` correctly redirects to `/admin/dashboard`
- [ ] Ensure non-admin users are properly denied access in the admin login flow
- [x] Run the app and perform end-to-end testing for both user and admin login flows
