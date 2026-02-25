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
}

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
