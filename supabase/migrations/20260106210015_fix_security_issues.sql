/*
  # Fix Security Issues

  ## Summary
  This migration addresses critical security vulnerabilities in the quote_requests table
  by improving RLS policies and removing unused indexes.

  ## Changes Made

  ### 1. Remove Unused Index
    - Drop `idx_quote_requests_email_data` index which is not being utilized
    - This index was created for anti-spam checks but is not actively used by queries

  ### 2. Fix INSERT Policy (Spam Prevention)
    - Replace overly permissive INSERT policy with validation rules
    - Add checks to prevent:
      * Empty or invalid email addresses
      * Missing required fields (nome, cognome, email, telefono)
      * Negative or zero cost values
    - Note: Rate limiting should be implemented at application level

  ### 3. Fix UPDATE Policy (Admin-Only Access)
    - Replace unrestricted UPDATE policy with admin-only access
    - Create helper function to check if user is an admin
    - Only users with admin role in app_metadata can update quote requests
    - This prevents any authenticated user from modifying quote requests

  ## Security Improvements
    - INSERT: Now validates required fields and data formats
    - UPDATE: Restricted to admin users only via app_metadata role check
    - Removes unused database objects to reduce attack surface

  ## Important Notes
    1. Admin users must have `role: 'admin'` in their auth.users app_metadata
    2. To create an admin user, update their metadata:
       ```sql
       UPDATE auth.users 
       SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
       WHERE email = 'your-admin@email.com';
       ```
    3. Application-level rate limiting is still recommended for INSERT operations
    4. Auth DB connection strategy must be changed to percentage-based in Supabase Dashboard
       (This cannot be configured via SQL migrations)
*/

-- Drop the unused index
DROP INDEX IF EXISTS idx_quote_requests_email_data;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit quote requests" ON quote_requests;
DROP POLICY IF EXISTS "Authenticated users can update requests" ON quote_requests;

-- Create improved INSERT policy with validation
CREATE POLICY "Validated public quote submissions"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Email must be provided and contain @
    email IS NOT NULL 
    AND email != '' 
    AND email LIKE '%@%'
    -- Required fields must be present
    AND nome IS NOT NULL 
    AND nome != ''
    AND cognome IS NOT NULL
    AND cognome != ''
    AND telefono IS NOT NULL 
    AND telefono != ''
    -- Cost must be positive
    AND costo_totale > 0
  );

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  -- Check if the authenticated user has admin role in app_metadata
  RETURN (
    SELECT COALESCE(
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
      false
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create restricted UPDATE policy for admins only
CREATE POLICY "Only admins can update quote requests"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Add comment to function
COMMENT ON FUNCTION is_admin() IS 'Returns true if the current user has admin role in app_metadata';
