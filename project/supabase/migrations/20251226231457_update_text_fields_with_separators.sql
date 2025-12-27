/*
  # Aggiorna campi testo con separatori migliorati

  ## Descrizione
  Modifica i campi core_flows, extra_flows e sfide_principali per usare separatori
  leggibili " | " invece di array o stringhe concatenate.

  ## Modifiche
  1. Campi modificati:
    - `core_flows`: da text[] a text - nomi flussi separati da " | "
    - `extra_flows`: da text[] a text - nomi flussi separati da " | "
    - `sfide_principali`: da text[] a text - sfide separate da " | "

  ## Note
  I separatori " | " (due spazi, pipe, due spazi) rendono i dati più leggibili
  nel database e facilitano l'analisi manuale dei preventivi.
*/

-- Modifica core_flows da array a text
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'core_flows'
    AND data_type = 'ARRAY'
  ) THEN
    ALTER TABLE quote_requests ALTER COLUMN core_flows TYPE text USING array_to_string(core_flows, '  |  ');
  END IF;
END $$;

-- Modifica extra_flows da array a text
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'extra_flows'
    AND data_type = 'ARRAY'
  ) THEN
    ALTER TABLE quote_requests ALTER COLUMN extra_flows TYPE text USING array_to_string(extra_flows, '  |  ');
  END IF;
END $$;

-- Modifica sfide_principali da array a text
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'sfide_principali'
    AND data_type = 'ARRAY'
  ) THEN
    ALTER TABLE quote_requests ALTER COLUMN sfide_principali TYPE text USING array_to_string(sfide_principali, '  |  ');
  END IF;
END $$;

-- Aggiorna commenti per riflettere il nuovo formato
COMMENT ON COLUMN quote_requests.core_flows IS 'Nomi dei flussi principali selezionati, separati da " | "';
COMMENT ON COLUMN quote_requests.extra_flows IS 'Nomi dei flussi extra selezionati, separati da " | "';
COMMENT ON COLUMN quote_requests.sfide_principali IS 'Sfide principali del cliente, separate da " | "';