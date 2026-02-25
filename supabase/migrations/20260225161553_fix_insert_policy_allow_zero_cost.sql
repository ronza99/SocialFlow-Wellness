/*
  # Fix RLS INSERT policy for quote_requests

  ## Problem
  The current INSERT policy requires costo_totale > 0, which blocks submissions
  when users have a custom quote (isCustomQuote) or edge cases where cost calculation
  results in 0. Also relaxes the constraint to allow costo_totale >= 0.

  ## Changes
  - Drop existing INSERT policy
  - Recreate it with costo_totale >= 0 instead of costo_totale > 0
  - This allows custom quotes (sent with costo_totale = 1) and any valid submission
*/

DROP POLICY IF EXISTS "Validated public quote submissions" ON quote_requests;

CREATE POLICY "Validated public quote submissions"
  ON quote_requests
  FOR INSERT
  WITH CHECK (
    email IS NOT NULL AND
    email <> '' AND
    email LIKE '%@%' AND
    nome IS NOT NULL AND
    nome <> '' AND
    cognome IS NOT NULL AND
    cognome <> '' AND
    telefono IS NOT NULL AND
    telefono <> '' AND
    costo_totale >= 0
  );
