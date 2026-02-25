/*
  # Fix RLS policies for upsell_tranche

  ## Problem
  All RLS policies on `upsell_tranche` use `true` in USING/WITH CHECK clauses,
  granting unrestricted access to all authenticated users. This bypasses row-level
  security entirely.

  ## Solution
  Replace all existing policies with restrictive ones that only allow users with
  `role = 'admin'` in their JWT app_metadata to access the table.

  ## Changes
  - Drop all 4 existing always-true policies
  - Recreate SELECT, INSERT, UPDATE, DELETE policies restricted to admin role via JWT claim
*/

DROP POLICY IF EXISTS "Authenticated users can select upsell_tranche" ON public.upsell_tranche;
DROP POLICY IF EXISTS "Authenticated users can insert upsell_tranche" ON public.upsell_tranche;
DROP POLICY IF EXISTS "Authenticated users can update upsell_tranche" ON public.upsell_tranche;
DROP POLICY IF EXISTS "Authenticated users can delete upsell_tranche" ON public.upsell_tranche;

CREATE POLICY "Admins can select upsell_tranche"
  ON public.upsell_tranche
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can insert upsell_tranche"
  ON public.upsell_tranche
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update upsell_tranche"
  ON public.upsell_tranche
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete upsell_tranche"
  ON public.upsell_tranche
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
