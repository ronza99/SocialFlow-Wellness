/*
  # Rinomina colonne in italiano e aggiungi protezione anti-spam

  ## Descrizione
  Rinomina tutte le colonne della tabella quote_requests in italiano per maggiore chiarezza.
  Aggiunge anche un indice per prevenire lo spam di preventivi dalla stessa email.

  ## Modifiche Colonne
  
  ### Dati Cliente
  - `name` → `nome`
  - `email` → `email` (rimane uguale)
  - `phone` → `telefono`
  - `business_name` → `nome_centro`
  - `city` → `citta`
  - `business_type` → `tipo_attivita`
  - `current_clients` → `clienti_attuali`
  - `preferred_contact` → `contatto_preferito`
  - `timeframe` → `tempistiche`
  - `main_challenges` → `sfide_principali`

  ### Configurazione Sistema
  - `center_type` → `tipo_centro`
  - `main_flows` → `flussi_principali`
  - `extra_flows_details` → `flussi_extra`
  - `maintenance_plan` → `piano_manutenzione`
  - `total_cost` → `costo_totale`

  ### Campi Tecnici
  - `status` → `stato`
  - `notes` → `note`
  - `created_at` → `data_creazione`

  ## Indici
  - Aggiunge indice su (email, data_creazione) per controlli anti-spam veloci
*/

-- Rinomina colonne dati cliente
ALTER TABLE quote_requests RENAME COLUMN name TO nome;
ALTER TABLE quote_requests RENAME COLUMN phone TO telefono;
ALTER TABLE quote_requests RENAME COLUMN business_name TO nome_centro;
ALTER TABLE quote_requests RENAME COLUMN city TO citta;
ALTER TABLE quote_requests RENAME COLUMN business_type TO tipo_attivita;
ALTER TABLE quote_requests RENAME COLUMN current_clients TO clienti_attuali;
ALTER TABLE quote_requests RENAME COLUMN preferred_contact TO contatto_preferito;
ALTER TABLE quote_requests RENAME COLUMN timeframe TO tempistiche;
ALTER TABLE quote_requests RENAME COLUMN main_challenges TO sfide_principali;

-- Rinomina colonne configurazione sistema
ALTER TABLE quote_requests RENAME COLUMN center_type TO tipo_centro;
ALTER TABLE quote_requests RENAME COLUMN main_flows TO flussi_principali;
ALTER TABLE quote_requests RENAME COLUMN extra_flows_details TO flussi_extra;
ALTER TABLE quote_requests RENAME COLUMN maintenance_plan TO piano_manutenzione;
ALTER TABLE quote_requests RENAME COLUMN total_cost TO costo_totale;

-- Rinomina campi tecnici
ALTER TABLE quote_requests RENAME COLUMN status TO stato;
ALTER TABLE quote_requests RENAME COLUMN notes TO note;
ALTER TABLE quote_requests RENAME COLUMN created_at TO data_creazione;

-- Crea indice per controlli anti-spam veloci
CREATE INDEX IF NOT EXISTS idx_quote_requests_email_data 
ON quote_requests(email, data_creazione DESC);

-- Aggiorna commenti colonne in italiano
COMMENT ON COLUMN quote_requests.nome IS 'Nome e cognome del cliente';
COMMENT ON COLUMN quote_requests.email IS 'Email del cliente';
COMMENT ON COLUMN quote_requests.telefono IS 'Numero di telefono del cliente';
COMMENT ON COLUMN quote_requests.nome_centro IS 'Nome del centro estetico/wellness';
COMMENT ON COLUMN quote_requests.citta IS 'Città dove si trova il centro';
COMMENT ON COLUMN quote_requests.tipo_attivita IS 'Tipo di attività (Centro Massaggi, Centro Estetico, SPA & Wellness, ecc.)';
COMMENT ON COLUMN quote_requests.clienti_attuali IS 'Numero di clienti attuali al mese';
COMMENT ON COLUMN quote_requests.contatto_preferito IS 'Metodo di contatto preferito: email, phone, whatsapp';
COMMENT ON COLUMN quote_requests.tempistiche IS 'Quando vorrebbe iniziare il progetto';
COMMENT ON COLUMN quote_requests.sfide_principali IS 'Sfide principali del cliente (array)';
COMMENT ON COLUMN quote_requests.tipo_centro IS 'Tipo di centro: single (Studio singolo 1 operatore) o team (Piccolo team 2-4 operatori)';
COMMENT ON COLUMN quote_requests.flussi_principali IS 'Flussi principali selezionati con ID e nomi leggibili';
COMMENT ON COLUMN quote_requests.flussi_extra IS 'Flussi extra selezionati con ID e nomi leggibili';
COMMENT ON COLUMN quote_requests.piano_manutenzione IS 'Piano manutenzione scelto';
COMMENT ON COLUMN quote_requests.costo_totale IS 'Costo totale del setup in euro';
COMMENT ON COLUMN quote_requests.stato IS 'Stato richiesta: new, contacted, converted, declined';
COMMENT ON COLUMN quote_requests.note IS 'Note interne sulla richiesta';
COMMENT ON COLUMN quote_requests.data_creazione IS 'Data e ora di creazione della richiesta';
