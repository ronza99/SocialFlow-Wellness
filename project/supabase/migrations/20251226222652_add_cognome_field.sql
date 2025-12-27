/*
  # Aggiungi campo cognome

  1. Modifiche
    - Aggiungi colonna `cognome` alla tabella `quote_requests`
    - Modifica commento colonna `nome` per chiarire che contiene solo il nome
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'cognome'
  ) THEN
    ALTER TABLE quote_requests ADD COLUMN cognome text;
    COMMENT ON COLUMN quote_requests.cognome IS 'Cognome del cliente';
    COMMENT ON COLUMN quote_requests.nome IS 'Nome del cliente';
  END IF;
END $$;