/*
  # Add upsell payment tracking fields

  ## Summary
  Adds dedicated payment tracking fields for upsell flows — flows added after the initial conversion.
  These are separate from the original setup 40/60 payment tracking so there's no confusion.

  ## New Columns on quote_requests
  - `upsell_totale` (numeric): Total agreed cost for upsell flows added after conversion
  - `upsell_pagamento_40_stato` (text): Acconto 40% payment status for upsell ('non_pagato' | 'pagato')
  - `upsell_pagamento_40_data` (date): Date the upsell 40% was paid
  - `upsell_pagamento_60_stato` (text): Saldo 60% payment status for upsell ('non_pagato' | 'pagato')
  - `upsell_pagamento_60_data` (date): Date the upsell 60% was paid
  - `upsell_golive_date` (date): Go-live date for upsell flows (used to calculate saldo 60% deadline)

  ## Notes
  - No existing data is modified
  - All columns are nullable to maintain backward compatibility
  - Upsell detection is done in the frontend by comparing current flows against prezzi_bloccati snapshot
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'upsell_totale'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN upsell_totale numeric DEFAULT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'upsell_pagamento_40_stato'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN upsell_pagamento_40_stato text DEFAULT 'non_pagato';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'upsell_pagamento_40_data'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN upsell_pagamento_40_data date DEFAULT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'upsell_pagamento_60_stato'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN upsell_pagamento_60_stato text DEFAULT 'non_pagato';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'upsell_pagamento_60_data'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN upsell_pagamento_60_data date DEFAULT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'upsell_golive_date'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN upsell_golive_date date DEFAULT NULL;
  END IF;
END $$;
