/*
  # Add Stripe fields to quote_requests

  ## Changes
  - `stripe_customer_id` (text, nullable): Stripe Customer ID, saved after first lookup
  - `stripe_last_check` (timestamptz, nullable): Timestamp of the last Stripe subscription check
  - `stripe_last_check_result` (text, nullable): Human-readable result of the last check (e.g. "active", "trialing", "past_due", "canceled", "not_found", "multiple_found")
  - `stripe_subscription_data` (jsonb, nullable): Full snapshot of the subscription data returned by Stripe at last check

  ## Notes
  - All fields are optional and nullable (Stripe integration is on-demand)
  - No RLS changes needed; existing admin-only UPDATE policy covers these fields
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN stripe_customer_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'stripe_last_check'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN stripe_last_check timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'stripe_last_check_result'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN stripe_last_check_result text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'stripe_subscription_data'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN stripe_subscription_data jsonb;
  END IF;
END $$;
