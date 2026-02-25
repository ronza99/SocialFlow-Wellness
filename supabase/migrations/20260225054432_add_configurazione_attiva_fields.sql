/*
  # Aggiungi campi configurazione attiva

  ## Descrizione
  Aggiunge colonne per tracciare la configurazione definitiva concordata con il cliente dopo la call,
  separata dalla configurazione iniziale del preventivo inviata dal sito.

  ## Nuove colonne
  - `tipo_centro_attivo`: tipo di centro concordato definitivo ('single' | 'team')
  - `flussi_principali_attivi`: flussi principali attivi (stringa separata da |), modificabile dall'admin
  - `flussi_extra_attivi`: flussi extra attivi (stringa separata da |), modificabile dall'admin
  - `piano_manutenzione_attivo`: piano di manutenzione attivo definitivo
  - `costo_concordato`: prezzo finale concordato con il cliente (può differire dal preventivo)

  ## Note
  Questi campi vengono inizialmente copiati dal preventivo originale ma possono essere
  aggiornati dall'admin nel CRM dopo la call con il cliente.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'tipo_centro_attivo'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN tipo_centro_attivo text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'flussi_principali_attivi'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN flussi_principali_attivi text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'flussi_extra_attivi'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN flussi_extra_attivi text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'piano_manutenzione_attivo'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN piano_manutenzione_attivo text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'costo_concordato'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN costo_concordato numeric;
  END IF;
END $$;
