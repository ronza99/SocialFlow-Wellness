/*
  # CRM avanzato: Drive, pagamenti setup, conversione e moduli acquistati

  ## Nuovi campi aggiunti a quote_requests

  ### Cartella Drive
  - `drive_link` (text): URL opzionale alla cartella Google Drive del cliente

  ### Pagamenti Setup (40/60)
  - `setup_totale` (numeric): importo totale del setup concordato (modificabile pre-conversione)
  - `golive_date` (date): data di go-live prevista
  - `pagamento_40_stato` (text): 'non_pagato' | 'pagato'
  - `pagamento_40_data` (date): data del pagamento del 40%
  - `pagamento_60_stato` (text): 'non_pagato' | 'pagato'
  - `pagamento_60_data` (date): data del pagamento del 60%

  ### Conversione con blocco prezzi
  - `data_conversione` (timestamptz): timestamp della conversione
  - `prezzi_bloccati` (jsonb): snapshot dei prezzi dei moduli al momento della conversione

  ## Nuova tabella: moduli_acquistati
  Tiene traccia di ogni modulo aggiunto al cliente con il suo prezzo fissato al momento dell'acquisto.
  Il prezzo non cambia mai, neanche se il listino viene aggiornato.

  ## Security
  - RLS abilitato su moduli_acquistati
  - Solo admin (service role) può leggere/scrivere
*/

-- Aggiungo colonne a quote_requests
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'drive_link') THEN
    ALTER TABLE quote_requests ADD COLUMN drive_link text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'setup_totale') THEN
    ALTER TABLE quote_requests ADD COLUMN setup_totale numeric;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'golive_date') THEN
    ALTER TABLE quote_requests ADD COLUMN golive_date date;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'pagamento_40_stato') THEN
    ALTER TABLE quote_requests ADD COLUMN pagamento_40_stato text DEFAULT 'non_pagato';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'pagamento_40_data') THEN
    ALTER TABLE quote_requests ADD COLUMN pagamento_40_data date;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'pagamento_60_stato') THEN
    ALTER TABLE quote_requests ADD COLUMN pagamento_60_stato text DEFAULT 'non_pagato';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'pagamento_60_data') THEN
    ALTER TABLE quote_requests ADD COLUMN pagamento_60_data date;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'data_conversione') THEN
    ALTER TABLE quote_requests ADD COLUMN data_conversione timestamptz;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quote_requests' AND column_name = 'prezzi_bloccati') THEN
    ALTER TABLE quote_requests ADD COLUMN prezzi_bloccati jsonb;
  END IF;
END $$;

-- Tabella moduli acquistati
CREATE TABLE IF NOT EXISTS moduli_acquistati (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
  nome text NOT NULL,
  prezzo numeric NOT NULL DEFAULT 0,
  data_acquisto timestamptz DEFAULT now()
);

ALTER TABLE moduli_acquistati ENABLE ROW LEVEL SECURITY;

-- Solo service role (admin backend) può accedere
CREATE POLICY "Admin full access to moduli_acquistati"
  ON moduli_acquistati
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Admin insert moduli_acquistati"
  ON moduli_acquistati
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Admin update moduli_acquistati"
  ON moduli_acquistati
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete moduli_acquistati"
  ON moduli_acquistati
  FOR DELETE
  TO service_role
  USING (true);

CREATE INDEX IF NOT EXISTS moduli_acquistati_lead_id_idx ON moduli_acquistati(lead_id);
