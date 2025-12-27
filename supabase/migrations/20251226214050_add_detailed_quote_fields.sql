/*
  # Aggiungi campi dettagliati alle richieste preventivo

  ## Descrizione
  Aggiunge campi dettagliati per salvare tutte le scelte del cliente in modo chiaro e leggibile.
  Ora il database conterrà esattamente quello che il cliente ha selezionato nel listino.

  ## Nuove Colonne

  ### Configurazione Sistema
  - `center_type` (text) - Tipo di centro: 'single' (Studio singolo) o 'team' (Piccolo team)
  - `main_flows` (jsonb) - Flussi principali selezionati con nomi leggibili
  - `extra_flows_details` (jsonb) - Flussi extra selezionati con nomi leggibili
  - `maintenance_plan` (text) - Piano manutenzione: 'technical', 'growth', 'none' o nome completo

  ### Dati Centro
  - `business_name` (text) - Nome del centro estetico/wellness
  - `city` (text) - Città dove si trova il centro
  - `business_type` (text) - Tipo attività (Centro Massaggi, Centro Estetico, SPA, ecc.)
  - `current_clients` (text) - Numero clienti al mese (0-50, 50-100, ecc.)

  ### Informazioni Cliente
  - `main_challenges` (jsonb) - Sfide principali del cliente (array di stringhe)
  - `preferred_contact` (text) - Come preferisce essere contattato (email, phone, whatsapp)
  - `timeframe` (text) - Quando vorrebbe iniziare (Il prima possibile, Entro 1 mese, ecc.)

  ## Note Importanti
  - Tutti i campi sono opzionali (nullable) per compatibilità con richieste esistenti
  - I nuovi preventivi useranno tutti questi campi
  - Le colonne esistenti (core_flows, extra_flows, maintenance_service) restano per retrocompatibilità
*/

-- Aggiungi colonne per configurazione sistema
ALTER TABLE quote_requests
ADD COLUMN IF NOT EXISTS center_type text,
ADD COLUMN IF NOT EXISTS main_flows jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS extra_flows_details jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS maintenance_plan text;

-- Aggiungi colonne per dati centro
ALTER TABLE quote_requests
ADD COLUMN IF NOT EXISTS business_name text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS business_type text,
ADD COLUMN IF NOT EXISTS current_clients text;

-- Aggiungi colonne per informazioni cliente
ALTER TABLE quote_requests
ADD COLUMN IF NOT EXISTS main_challenges jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS preferred_contact text DEFAULT 'email',
ADD COLUMN IF NOT EXISTS timeframe text;

-- Aggiungi commenti alle colonne per documentazione
COMMENT ON COLUMN quote_requests.center_type IS 'Tipo di centro: single (Studio singolo 1 operatore) o team (Piccolo team 2-4 operatori)';
COMMENT ON COLUMN quote_requests.main_flows IS 'Flussi principali selezionati con nomi leggibili';
COMMENT ON COLUMN quote_requests.extra_flows_details IS 'Flussi extra selezionati con nomi leggibili';
COMMENT ON COLUMN quote_requests.maintenance_plan IS 'Piano manutenzione scelto';
COMMENT ON COLUMN quote_requests.business_name IS 'Nome del centro estetico/wellness';
COMMENT ON COLUMN quote_requests.city IS 'Città dove si trova il centro';
COMMENT ON COLUMN quote_requests.business_type IS 'Tipo di attività (Centro Massaggi, Centro Estetico, SPA & Wellness, ecc.)';
COMMENT ON COLUMN quote_requests.current_clients IS 'Numero di clienti attuali al mese';
COMMENT ON COLUMN quote_requests.main_challenges IS 'Sfide principali del cliente (array)';
COMMENT ON COLUMN quote_requests.preferred_contact IS 'Metodo di contatto preferito: email, phone, whatsapp';
COMMENT ON COLUMN quote_requests.timeframe IS 'Quando vorrebbe iniziare il progetto';
