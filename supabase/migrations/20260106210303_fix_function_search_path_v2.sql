/*
  # Fix Function Search Path Vulnerability

  ## Summary
  This migration fixes a security vulnerability in the `is_admin()` function by setting
  an immutable search_path. This prevents potential SQL injection attacks through
  search_path manipulation.

  ## Changes Made

  ### 1. Fix is_admin() Function
    - Add `SET search_path = ''` to make the function's search_path immutable
    - This prevents attackers from manipulating the search_path to inject malicious code
    - The function will now explicitly reference schema-qualified objects

  ## Security Improvements
    - Eliminates search_path manipulation attack vector
    - Makes the function behavior predictable and secure
    - Follows PostgreSQL security best practices for SECURITY DEFINER functions

  ## Important Notes
    1. The Auth DB Connection Strategy issue requires manual action in Supabase Dashboard:
       - Go to Project Settings → Database → Connection Pooling
       - Change from "Fixed (10)" to "Percentage-based"
    2. This change does not affect the function's behavior, only its security
    3. Uses CREATE OR REPLACE to update the existing function without breaking dependencies
*/

-- Recreate the is_admin function with immutable search_path
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
$$ LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = '';

-- Update comment to function
COMMENT ON FUNCTION is_admin() IS 'Returns true if the current user has admin role in app_metadata. Secure against search_path manipulation.';
