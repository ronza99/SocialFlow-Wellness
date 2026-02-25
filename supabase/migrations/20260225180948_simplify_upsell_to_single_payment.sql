/*
  # Simplify upsell payment to single payment (no 40/60 split)

  ## Summary
  Upsell flows are paid in full (no deposit/balance split).
  Replaces the 40/60 upsell columns with a single payment status + date.
  Old columns are kept to avoid data loss but new simplified columns are added.

  ## Changes
  - Add `upsell_pagamento_stato` (text): 'non_pagato' | 'pagato'
  - Add `upsell_pagamento_data` (date): Date the upsell was paid in full

  ## Notes
  - Old upsell_pagamento_40/60 columns are left in place (no data loss)
  - New columns default to 'non_pagato'
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'upsell_pagamento_stato'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN upsell_pagamento_stato text DEFAULT 'non_pagato';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'upsell_pagamento_data'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN upsell_pagamento_data date DEFAULT NULL;
  END IF;
END $$;
