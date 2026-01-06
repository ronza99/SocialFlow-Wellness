# Admin Setup Guide

## Security Fixes Applied

The following security improvements have been implemented:

### 1. ✅ Removed Unused Index
- Dropped `idx_quote_requests_email_data` which was not being utilized

### 2. ✅ Fixed INSERT Policy
- Added validation for quote request submissions:
  - Email must contain @ symbol
  - Required fields: nome, cognome, email, telefono
  - Cost must be positive
- Prevents invalid or incomplete quote submissions

### 3. ✅ Fixed UPDATE Policy
- Restricted updates to admin users only
- Any authenticated user can NO LONGER modify quote requests
- Only users with admin role can update requests

### 4. ✅ Fixed Function Search Path
- Secured `is_admin()` function against search_path manipulation attacks
- Set immutable search_path to prevent SQL injection vulnerabilities
- Follows PostgreSQL security best practices for SECURITY DEFINER functions

### 5. ⚠️ Auth DB Connection Strategy (Manual Action Required)

**This setting cannot be changed via SQL and must be configured in the Supabase Dashboard.**

#### Steps to Fix:
1. Go to your Supabase Dashboard
2. Navigate to **Project Settings** → **Database**
3. Find **Connection Pooling** settings
4. Change **Auth Connection Strategy** from **Fixed (10 connections)** to **Percentage-based**
5. Save changes

This ensures the Auth server scales properly with your instance size.

---

## Setting Up Admin Access

To allow a user to update quote requests, you must grant them admin role.

### Option 1: Via Supabase Dashboard SQL Editor

Run this query, replacing the email with your admin email:

```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
WHERE email = 'your-admin-email@example.com';
```

### Option 2: Via Database Direct Query

Connect to your database and run the same query as above.

### Verify Admin Access

To check which users have admin access:

```sql
SELECT email, raw_app_meta_data->'role' as role
FROM auth.users
WHERE raw_app_meta_data->>'role' = 'admin';
```

---

## Security Best Practices

1. **Rate Limiting**: Consider implementing application-level rate limiting for quote submissions to prevent spam
2. **Admin Users**: Only grant admin role to trusted users who need to manage quote requests
3. **Monitor Access**: Regularly review admin users and remove access when no longer needed
4. **Email Validation**: The current validation checks for @ symbol, but consider adding more robust email validation in your application
