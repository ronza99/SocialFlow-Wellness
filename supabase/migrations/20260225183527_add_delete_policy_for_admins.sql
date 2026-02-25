/*
  # Add DELETE policy for admins on quote_requests

  ## Changes
  - Adds a DELETE policy so that authenticated admin users can delete quote_requests rows
  - Uses the existing is_admin() helper function for consistency
*/

CREATE POLICY "Only admins can delete quote requests"
  ON quote_requests
  FOR DELETE
  TO authenticated
  USING (is_admin());
