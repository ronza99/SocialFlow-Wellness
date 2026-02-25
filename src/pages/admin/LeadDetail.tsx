import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  ArrowLeft, Save, Phone, Mail, MapPin, Building2,
  MessageSquare, Euro, Calendar, User, Check, Loader2
} from 'lucide-react';
import { QuoteRequest, LeadStatus, STATUS_LABELS, STATUS_COLORS } from './types';

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
      setLoading(false);
    };
    fetchLead();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!lead) return;
    setSaving(true);

    const { error } = await supabase
      .from('quote_requests')
      .update({ stato, note })
      .eq('id', lead.id);

    setSaving(false);
    if (!error) {
      setSaved(true);
      setLead({ ...lead, stato, note });
      setTimeout(() => setSaved(false), 2500);
    }
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

  const mainFlows = lead.core_flows
    ? lead.core_flows.split('|').map(f => f.trim()).filter(Boolean)
    : [];
  const extraFlows = lead.extra_flows
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
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Configurazione</h2>
            <div className="space-y-3">
              <InfoRow label="Tipo centro" value={lead.tipo_centro === 'single' ? '1 operatore' : lead.tipo_centro === 'team' ? '2-4 operatori' : '—'} />
              <InfoRow label="Piano manutenzione" value={lead.piano_manutenzione || 'Nessuno'} />
              <InfoRow label="Tempistiche" value={lead.tempistiche || '—'} />
              <InfoRow label="Costo setup" value={`€${(lead.costo_totale || 0).toLocaleString('it-IT')}`} />
            </div>
          </div>
        </div>

        {(mainFlows.length > 0 || extraFlows.length > 0) && (
          <div className="bg-white rounded-2xl shadow-wellness p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Flussi selezionati</h2>
            {mainFlows.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2">Flussi principali</p>
                <div className="flex flex-wrap gap-2">
                  {mainFlows.map((f, i) => (
                    <span key={i} className="bg-misty-teal/10 text-misty-teal-dark text-xs px-3 py-1 rounded-full font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {extraFlows.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-2">Flussi extra</p>
                <div className="flex flex-wrap gap-2">
                  {extraFlows.map((f, i) => (
                    <span key={i} className="bg-sage-green/10 text-forest-green text-xs px-3 py-1 rounded-full font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

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
