export interface QuoteRequest {
  id: string;
  data_creazione: string;
  stato: 'new' | 'contacted' | 'converted' | 'declined';
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  nome_centro: string;
  citta: string | null;
  tipo_attivita: string | null;
  clienti_attuali: string | null;
  tipo_centro: string | null;
  flussi_principali: { id: string; name: string }[] | null;
  flussi_extra: { id: string; name: string }[] | null;
  core_flows: string | null;
  extra_flows: string | null;
  piano_manutenzione: string | null;
  costo_totale: number;
  maintenance_service: boolean | null;
  contatto_preferito: string | null;
  sfide_principali: string | null;
  tempistiche: string | null;
  note: string | null;
  message: string | null;
  tipo_centro_attivo: string | null;
  flussi_principali_attivi: string | null;
  flussi_extra_attivi: string | null;
  piano_manutenzione_attivo: string | null;
  costo_concordato: number | null;
}

export const MAIN_FLOWS_OPTIONS = [
  { id: 'bookings', label: 'Prenotazioni in chat' },
  { id: 'subscriptions', label: 'Abbonamenti ricorrenti' },
  { id: 'cosmetics', label: 'Vendita cosmetici in chat' },
];

export const EXTRA_FLOWS_OPTIONS = [
  { id: 'ai-assistant', label: 'Segretaria AI in chat' },
  { id: 'gift-cards', label: 'Card & Gift Card digitali' },
  { id: 'packages', label: 'Pacchetti di sedute' },
  { id: 'whatsapp', label: 'Promemoria e follow-up WhatsApp' },
];

export const MAINTENANCE_OPTIONS = [
  { id: '', label: 'Nessuno' },
  { id: 'piano manutenzione tecnica', label: 'Piano Manutenzione tecnica (€59/mese)' },
  { id: 'piano crescita dm', label: 'Piano Crescita DM (€129/mese)' },
  { id: 'none', label: 'Solo interventi spot' },
];

export type LeadStatus = QuoteRequest['stato'];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Nuovo',
  contacted: 'Contattato',
  converted: 'Convertito',
  declined: 'Declinato',
};

export const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  converted: 'bg-emerald-100 text-emerald-700',
  declined: 'bg-red-100 text-red-600',
};
