/*
  # Aggiungi tabella upsell_tranche

  ## Descrizione
  Crea una tabella per storicizzare ogni tranche di upsell pagata separatamente,
  in modo da non sommare upsell pagati con nuovi upsell ancora da pagare.

  ## Nuove tabelle
  - `upsell_tranche`
    - `id` (uuid, primary key)
    - `lead_id` (uuid, FK a quote_requests)
    - `flussi_ids` (text[]) - lista degli ID dei flussi inclusi in questa tranche
    - `flussi_labels` (text[]) - lista delle label leggibili dei flussi
    - `totale` (numeric) - importo totale della tranche
    - `golive_date` (date, nullable)
    - `pagamento_stato` ('non_pagato' | 'pagato')
    - `pagamento_data` (date, nullable)
    - `created_at` (timestamptz)

  ## Sicurezza
  - RLS abilitato
  - Policy per authenticated users
*/

CREATE TABLE IF NOT EXISTS upsell_tranche (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
  flussi_ids text[] NOT NULL DEFAULT '{}',
  flussi_labels text[] NOT NULL DEFAULT '{}',
  totale numeric NOT NULL DEFAULT 0,
  golive_date date,
  pagamento_stato text NOT NULL DEFAULT 'non_pagato' CHECK (pagamento_stato IN ('non_pagato', 'pagato')),
  pagamento_data date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE upsell_tranche ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can select upsell_tranche"
  ON upsell_tranche FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert upsell_tranche"
  ON upsell_tranche FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update upsell_tranche"
  ON upsell_tranche FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete upsell_tranche"
  ON upsell_tranche FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS upsell_tranche_lead_id_idx ON upsell_tranche(lead_id);
