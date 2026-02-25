import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  ArrowLeft, Save, Phone, Mail, MapPin, Building2,
  MessageSquare, Euro, Calendar, User, Check, Loader2, Settings
} from 'lucide-react';
import {
  QuoteRequest, LeadStatus, STATUS_LABELS, STATUS_COLORS,
  MAIN_FLOWS_OPTIONS, EXTRA_FLOWS_OPTIONS, MAINTENANCE_OPTIONS, calcCosto
} from './types';

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'Nuovo' },
  { value: 'contacted', label: 'Contattato' },
  { value: 'converted', label: 'Convertito' },
  { value: 'declined', label: 'Declinato' },
];

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stato, setStato] = useState<LeadStatus>('new');
  const [note, setNote] = useState('');

  const [tipoCentroAttivo, setTipoCentroAttivo] = useState<string>('');
  const [operatoriCustom, setOperatoriCustom] = useState<string>('');
  const [flussiPrincipaliAttivi, setFlussiPrincipaliAttivi] = useState<string[]>([]);
  const [flussiExtraAttivi, setFlussiExtraAttivi] = useState<string[]>([]);
  const [pianoManutenzioneAttivo, setPianoManutenzioneAttivo] = useState<string>('');
  const [costoConcordato, setCostoConcordato] = useState<string>('');
  const [costoManuale, setCostoManuale] = useState(false);

  const tipoCentroCalcolo = tipoCentroAttivo.startsWith('team_custom_') ? 'team' : tipoCentroAttivo;

  useEffect(() => {
    if (costoManuale) return;
    const calcolato = calcCosto(tipoCentroCalcolo, flussiPrincipaliAttivi, flussiExtraAttivi);
    setCostoConcordato(calcolato > 0 ? String(calcolato) : '');
  }, [tipoCentroAttivo, tipoCentroCalcolo, flussiPrincipaliAttivi, flussiExtraAttivi, costoManuale]);

  useEffect(() => {
    const fetchLead = async () => {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        navigate('/admin/dashboard');
        return;
      }
      setLead(data);
      setStato(data.stato);
      setNote(data.note || '');

      const centro = data.tipo_centro_attivo ?? data.tipo_centro ?? '';
      const mainAttivi = data.flussi_principali_attivi
        ? data.flussi_principali_attivi.split('|').map((f: string) => f.trim()).filter(Boolean)
        : data.core_flows
        ? data.core_flows.split('|').map((f: string) => f.trim()).filter(Boolean).map(labelToId)
        : [];
      const extraAttivi = data.flussi_extra_attivi
        ? data.flussi_extra_attivi.split('|').map((f: string) => f.trim()).filter(Boolean)
        : data.extra_flows
        ? data.extra_flows.split('|').map((f: string) => f.trim()).filter(Boolean).map(labelToExtraId)
        : [];

      setTipoCentroAttivo(centro);
      if (centro.startsWith('team_custom_')) {
        setOperatoriCustom(centro.replace('team_custom_', ''));
      }
      setFlussiPrincipaliAttivi(mainAttivi);
      setFlussiExtraAttivi(extraAttivi);
      setPianoManutenzioneAttivo(data.piano_manutenzione_attivo ?? data.piano_manutenzione ?? '');

      const calcolato = calcCosto(centro, mainAttivi, extraAttivi);

      if (data.costo_concordato != null && data.costo_concordato !== calcolato) {
        setCostoConcordato(String(data.costo_concordato));
        setCostoManuale(true);
      } else {
        setCostoConcordato(calcolato > 0 ? String(calcolato) : String(data.costo_totale || ''));
        setCostoManuale(false);
      }

      setLoading(false);
    };
    fetchLead();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!lead) return;
    setSaving(true);

    const { error } = await supabase
      .from('quote_requests')
      .update({
        stato,
        note,
        tipo_centro_attivo: tipoCentroAttivo || null,
        flussi_principali_attivi: flussiPrincipaliAttivi.length > 0 ? flussiPrincipaliAttivi.join(' | ') : null,
        flussi_extra_attivi: flussiExtraAttivi.length > 0 ? flussiExtraAttivi.join(' | ') : null,
        piano_manutenzione_attivo: pianoManutenzioneAttivo || null,
        costo_concordato: costoConcordato ? Number(costoConcordato) : null,
      })
      .eq('id', lead.id);

    setSaving(false);
    if (!error) {
      setSaved(true);
      setLead({
        ...lead, stato, note,
        tipo_centro_attivo: tipoCentroAttivo || null,
        flussi_principali_attivi: flussiPrincipaliAttivi.length > 0 ? flussiPrincipaliAttivi.join(' | ') : null,
        flussi_extra_attivi: flussiExtraAttivi.length > 0 ? flussiExtraAttivi.join(' | ') : null,
        piano_manutenzione_attivo: pianoManutenzioneAttivo || null,
        costo_concordato: costoConcordato ? Number(costoConcordato) : null,
      });
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const toggleMainFlow = (flowId: string) => {
    setFlussiPrincipaliAttivi(prev =>
      prev.includes(flowId) ? prev.filter(f => f !== flowId) : [...prev, flowId]
    );
  };

  const toggleExtraFlow = (flowId: string) => {
    setFlussiExtraAttivi(prev =>
      prev.includes(flowId) ? prev.filter(f => f !== flowId) : [...prev, flowId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading || !lead) {
    return (
      <div className="min-h-screen bg-warm-sand flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-misty-teal" />
      </div>
    );
  }

  const mainFlowsOriginal = lead.core_flows
    ? lead.core_flows.split('|').map(f => f.trim()).filter(Boolean)
    : [];
  const extraFlowsOriginal = lead.extra_flows
    ? lead.extra_flows.split('|').map(f => f.trim()).filter(Boolean)
    : [];
  const challenges = lead.sfide_principali
    ? lead.sfide_principali.split('|').map(f => f.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-warm-sand">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Torna alla lista</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-misty-teal hover:bg-misty-teal-dark text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : saved ? (
              <Check size={15} />
            ) : (
              <Save size={15} />
            )}
            {saved ? 'Salvato!' : 'Salva modifiche'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div className="bg-white rounded-2xl shadow-wellness p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {lead.nome} {lead.cognome}
              </h1>
              <p className="text-gray-500 mt-1">{lead.nome_centro}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold text-forest-green">
                €{(lead.costo_totale || 0).toLocaleString('it-IT')}
              </div>
              <div className="text-xs text-gray-400 mt-1 flex items-center sm:justify-end gap-1">
                <Calendar size={12} />
                {formatDate(lead.data_creazione)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl shadow-wellness p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Contatti</h2>
            <div className="space-y-3">
              <ContactRow icon={<Mail size={15} />} label="Email" value={lead.email} href={`mailto:${lead.email}`} />
              <ContactRow icon={<Phone size={15} />} label="Telefono" value={lead.telefono} href={`tel:${lead.telefono}`} />
              <ContactRow icon={<MapPin size={15} />} label="Citta'" value={lead.citta || '—'} />
              <ContactRow icon={<Building2 size={15} />} label="Tipo attivita'" value={lead.tipo_attivita || '—'} />
              <ContactRow icon={<User size={15} />} label="Clienti/mese" value={lead.clienti_attuali || '—'} />
              <ContactRow icon={<MessageSquare size={15} />} label="Contatto pref." value={lead.contatto_preferito || '—'} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-wellness p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Preventivo originale</h2>
            <div className="space-y-3">
              <InfoRow label="Tipo centro" value={
                lead.tipo_centro === 'single' ? '1 operatore' :
                lead.tipo_centro === 'team' ? '2-4 operatori' :
                lead.tipo_centro?.startsWith('team_custom_') ? `${lead.tipo_centro.replace('team_custom_', '')} operatori` :
                '—'
              } />
              <InfoRow label="Piano manutenzione" value={lead.piano_manutenzione || 'Nessuno'} />
              <InfoRow label="Tempistiche" value={lead.tempistiche || '—'} />
              <InfoRow label="Costo preventivo" value={`€${(lead.costo_totale || 0).toLocaleString('it-IT')}`} />
            </div>
            {(mainFlowsOriginal.length > 0 || extraFlowsOriginal.length > 0) && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {mainFlowsOriginal.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-400 mb-1">Flussi principali richiesti</p>
                    <div className="flex flex-wrap gap-1">
                      {mainFlowsOriginal.map((f, i) => (
                        <span key={i} className="bg-misty-teal/10 text-misty-teal-dark text-xs px-2 py-0.5 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {extraFlowsOriginal.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Flussi extra richiesti</p>
                    <div className="flex flex-wrap gap-1">
                      {extraFlowsOriginal.map((f, i) => (
                        <span key={i} className="bg-sage-green/10 text-forest-green text-xs px-2 py-0.5 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-wellness p-6">
          <div className="flex items-center gap-2 mb-5">
            <Settings size={16} className="text-misty-teal" />
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Configurazione attiva (post-call)</h2>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo di centro</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'single', label: '1 operatore' },
                { value: 'team', label: '2-4 operatori' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTipoCentroAttivo(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                    tipoCentroAttivo === opt.value
                      ? 'bg-misty-teal/10 text-misty-teal-dark border-misty-teal'
                      : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <button
                onClick={() => {
                  const n = operatoriCustom || '5';
                  setOperatoriCustom(n);
                  setTipoCentroAttivo(`team_custom_${n}`);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                  tipoCentroAttivo.startsWith('team_custom_')
                    ? 'bg-misty-teal/10 text-misty-teal-dark border-misty-teal'
                    : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                }`}
              >
                5+ operatori
              </button>
            </div>
            {tipoCentroAttivo.startsWith('team_custom_') && (
              <div className="mt-3 flex items-center gap-2">
                <label className="text-sm text-gray-500">Numero esatto di operatori:</label>
                <input
                  type="number"
                  min={5}
                  value={operatoriCustom}
                  onChange={e => {
                    const val = e.target.value;
                    setOperatoriCustom(val);
                    if (val) setTipoCentroAttivo(`team_custom_${val}`);
                  }}
                  className="w-20 px-3 py-1.5 rounded-xl border border-misty-teal text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal bg-white"
                />
              </div>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Flussi principali attivi</label>
            <div className="flex flex-wrap gap-2">
              {MAIN_FLOWS_OPTIONS.map(flow => (
                <button
                  key={flow.id}
                  onClick={() => toggleMainFlow(flow.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                    flussiPrincipaliAttivi.includes(flow.id)
                      ? 'bg-misty-teal/10 text-misty-teal-dark border-misty-teal'
                      : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {flussiPrincipaliAttivi.includes(flow.id) ? '✓ ' : ''}{flow.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Flussi extra attivi</label>
            <div className="flex flex-wrap gap-2">
              {EXTRA_FLOWS_OPTIONS.map(flow => (
                <button
                  key={flow.id}
                  onClick={() => toggleExtraFlow(flow.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                    flussiExtraAttivi.includes(flow.id)
                      ? 'bg-sage-green/10 text-forest-green border-sage-green'
                      : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {flussiExtraAttivi.includes(flow.id) ? '✓ ' : ''}{flow.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Piano manutenzione concordato</label>
            <select
              value={pianoManutenzioneAttivo}
              onChange={e => setPianoManutenzioneAttivo(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal transition-all bg-white"
            >
              {MAINTENANCE_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Costo concordato (€)</label>
              <button
                onClick={() => setCostoManuale(m => !m)}
                className={`text-xs px-2 py-0.5 rounded-lg transition-all border ${
                  costoManuale
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {costoManuale ? 'Manuale (clicca per auto)' : 'Automatico (clicca per modificare)'}
              </button>
            </div>
            <div className="relative">
              <Euro size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={costoConcordato}
                onChange={e => setCostoConcordato(e.target.value)}
                disabled={!costoManuale}
                placeholder="Seleziona i blocchi per calcolare"
                className={`w-full pl-8 pr-4 py-2 rounded-xl border text-sm transition-all ${
                  costoManuale
                    ? 'border-amber-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 bg-white'
                    : 'border-gray-200 text-gray-700 bg-gray-50 cursor-default'
                }`}
              />
            </div>
            {!costoManuale && flussiPrincipaliAttivi.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                Calcolato automaticamente dai blocchi selezionati
                {flussiPrincipaliAttivi.length === 3 && ' (sconto 3 flussi applicato)'}
              </p>
            )}
          </div>

          {(tipoCentroAttivo || flussiPrincipaliAttivi.length > 0 || flussiExtraAttivi.length > 0 || costoConcordato) && (
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Riepilogo configurazione attiva</p>
              <div className="flex flex-wrap gap-1.5">
                {tipoCentroAttivo && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                    {tipoCentroAttivo === 'single' ? '1 operatore' :
                     tipoCentroAttivo === 'team' ? '2-4 operatori' :
                     tipoCentroAttivo.startsWith('team_custom_') ? `${tipoCentroAttivo.replace('team_custom_', '')} operatori` :
                     tipoCentroAttivo}
                  </span>
                )}
                {flussiPrincipaliAttivi.map(id => {
                  const flow = MAIN_FLOWS_OPTIONS.find(f => f.id === id);
                  return flow ? (
                    <span key={id} className="bg-misty-teal/10 text-misty-teal-dark text-xs px-3 py-1 rounded-full font-medium">
                      {flow.label}
                    </span>
                  ) : null;
                })}
                {flussiExtraAttivi.map(id => {
                  const flow = EXTRA_FLOWS_OPTIONS.find(f => f.id === id);
                  return flow ? (
                    <span key={id} className="bg-sage-green/10 text-forest-green text-xs px-3 py-1 rounded-full font-medium">
                      {flow.label}
                    </span>
                  ) : null;
                })}
                {costoConcordato && (
                  <span className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">
                    €{Number(costoConcordato).toLocaleString('it-IT')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {challenges.length > 0 && (
          <div className="bg-white rounded-2xl shadow-wellness p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Sfide principali</h2>
            <div className="flex flex-wrap gap-2">
              {challenges.map((c, i) => (
                <span key={i} className="bg-soft-apricot text-mocha-mousse text-xs px-3 py-1 rounded-full font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-wellness p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Gestione lead</h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Stato</label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setStato(opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                    stato === opt.value
                      ? `${STATUS_COLORS[opt.value]} border-current`
                      : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Note interne</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              placeholder="Aggiungi note sul contatto, stato trattativa, follow-up previsti..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal resize-none transition-all"
            />
          </div>
        </div>

        {lead.message && (
          <div className="bg-white rounded-2xl shadow-wellness p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Messaggio del cliente</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{lead.message}</p>
          </div>
        )}
      </main>
    </div>
  );
}

function labelToId(label: string): string {
  const map: Record<string, string> = {
    'prenotazioni in chat': 'bookings',
    'prenotazioni trattamenti in chat': 'bookings',
    'abbonamenti ricorrenti': 'subscriptions',
    'vendita cosmetici in chat': 'cosmetics',
    'vendita cosmetici': 'cosmetics',
  };
  return map[label.toLowerCase()] ?? label;
}

function labelToExtraId(label: string): string {
  const map: Record<string, string> = {
    'segretaria ai in chat': 'ai-assistant',
    'card & gift card digitali (con coupon)': 'gift-cards',
    'card & gift card digitali': 'gift-cards',
    'pacchetti di sedute': 'packages',
    'promemoria e follow-up su whatsapp': 'whatsapp',
    'promemoria e follow-up whatsapp': 'whatsapp',
  };
  return map[label.toLowerCase()] ?? label;
}

function ContactRow({
  icon, label, value, href
}: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 flex-shrink-0">{icon}</span>
      <span className="text-xs text-gray-400 w-24 flex-shrink-0">{label}</span>
      {href ? (
        <a href={href} className="text-sm text-misty-teal hover:underline truncate">
          {value}
        </a>
      ) : (
        <span className="text-sm text-gray-700 truncate">{value}</span>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
  );
}
