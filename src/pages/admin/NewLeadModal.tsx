import React, { useState } from 'react';
import { X, UserPlus, ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
  MAIN_FLOWS_OPTIONS,
  EXTRA_FLOWS_OPTIONS,
  MAINTENANCE_OPTIONS,
  calcCosto,
} from './types';

interface NewLeadModalProps {
  onClose: () => void;
  onCreated: (id: string) => void;
}

const STEP_LABELS = ['Contatto', 'Attività', 'Configurazione', 'Riepilogo'];

const BUSINESS_TYPES = [
  'Centro estetico',
  'Parrucchiere',
  'Barbiere',
  'Centro benessere / Spa',
  'Studio medico / Odontoiatrico',
  'Palestra / Studio fitness',
  'Nail salon',
  'Tatuatore / Piercing',
  'Altro',
];

const TIMEFRAME_OPTIONS = [
  'Subito (< 2 settimane)',
  'Entro 1 mese',
  'Entro 3 mesi',
  'Sto solo valutando',
];

const CONTACT_OPTIONS = ['Telefono', 'WhatsApp', 'Email'];

export default function NewLeadModal({ onClose, onCreated }: NewLeadModalProps) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nomeCentro, setNomeCentro] = useState('');
  const [citta, setCitta] = useState('');
  const [tipoAttivita, setTipoAttivita] = useState('');
  const [clientiAttuali, setClientiAttuali] = useState('');
  const [tempistiche, setTempistiche] = useState('');
  const [contattoPreferito, setContattoPreferito] = useState('');
  const [sfidePrincipali, setSfidePrincipali] = useState('');
  const [tipoCentro, setTipoCentro] = useState<'single' | 'team'>('single');
  const [mainFlows, setMainFlows] = useState<string[]>([]);
  const [extraFlows, setExtraFlows] = useState<string[]>([]);
  const [pianoManutenzione, setPianoManutenzione] = useState('');
  const [note, setNote] = useState('');
  const [stato, setStato] = useState<'new' | 'contacted' | 'converted' | 'declined'>('new');

  const toggleFlow = (id: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(id) ? list.filter(f => f !== id) : [...list, id]);
  };

  const costoTotale = calcCosto(tipoCentro, mainFlows, extraFlows);

  const validateStep = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!nome.trim()) errs.nome = 'Campo obbligatorio';
      if (!cognome.trim()) errs.cognome = 'Campo obbligatorio';
      if (!email.trim()) errs.email = 'Campo obbligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Email non valida';
      if (!telefono.trim()) errs.telefono = 'Campo obbligatorio';
    }
    if (step === 1) {
      if (!nomeCentro.trim()) errs.nomeCentro = 'Campo obbligatorio';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleCreate = async () => {
    setSaving(true);
    const { data, error } = await supabase
      .from('quote_requests')
      .insert({
        nome,
        cognome,
        email,
        telefono,
        nome_centro: nomeCentro,
        citta: citta || null,
        tipo_attivita: tipoAttivita || null,
        clienti_attuali: clientiAttuali || null,
        tempistiche: tempistiche || null,
        contatto_preferito: contattoPreferito || null,
        sfide_principali: sfidePrincipali ? [sfidePrincipali] : null,
        tipo_centro: tipoCentro,
        flussi_principali: mainFlows.map(id => {
          const f = MAIN_FLOWS_OPTIONS.find(o => o.id === id);
          return { id, name: f?.label || id };
        }),
        flussi_extra: extraFlows.map(id => {
          const f = EXTRA_FLOWS_OPTIONS.find(o => o.id === id);
          return { id, name: f?.label || id };
        }),
        piano_manutenzione: pianoManutenzione || null,
        costo_totale: costoTotale,
        tipo_centro_attivo: tipoCentro,
        flussi_principali_attivi: mainFlows.join(','),
        flussi_extra_attivi: extraFlows.join(','),
        piano_manutenzione_attivo: pianoManutenzione || null,
        stato,
        note: note || null,
      })
      .select('id')
      .single();

    setSaving(false);
    if (error) {
      setErrors({ submit: 'Errore nel salvataggio: ' + error.message });
    } else if (data) {
      onCreated(data.id);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal transition-colors ${
      errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-200'
    }`;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="bg-forest-green/10 text-forest-green p-2 rounded-lg">
              <UserPlus size={18} />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-base">Nuovo cliente</h2>
              <p className="text-xs text-gray-400">{STEP_LABELS[step]} — Step {step + 1} di {STEP_LABELS.length}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pt-3 pb-1">
          <div className="flex gap-1.5">
            {STEP_LABELS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-forest-green' : 'bg-gray-100'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {step === 0 && (
            <>
              <p className="text-sm font-semibold text-gray-700">Dati di contatto</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Nome *</label>
                  <input value={nome} onChange={e => setNome(e.target.value)} className={inputClass('nome')} placeholder="Mario" />
                  {errors.nome && <p className="text-xs text-red-500 mt-0.5">{errors.nome}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Cognome *</label>
                  <input value={cognome} onChange={e => setCognome(e.target.value)} className={inputClass('cognome')} placeholder="Rossi" />
                  {errors.cognome && <p className="text-xs text-red-500 mt-0.5">{errors.cognome}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass('email')} placeholder="mario@esempio.it" />
                {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Telefono *</label>
                <input value={telefono} onChange={e => setTelefono(e.target.value)} className={inputClass('telefono')} placeholder="+39 333 123 4567" />
                {errors.telefono && <p className="text-xs text-red-500 mt-0.5">{errors.telefono}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Stato lead</label>
                <select value={stato} onChange={e => setStato(e.target.value as typeof stato)} className={inputClass('stato')}>
                  <option value="new">Nuovo</option>
                  <option value="contacted">Contattato</option>
                  <option value="converted">Convertito</option>
                  <option value="declined">Declinato</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Note interne</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} className={inputClass('note')} placeholder="Aggiunta manuale..." />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-sm font-semibold text-gray-700">Dati attività</p>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Nome centro / attività *</label>
                <input value={nomeCentro} onChange={e => setNomeCentro(e.target.value)} className={inputClass('nomeCentro')} placeholder="Centro Estetico Bella" />
                {errors.nomeCentro && <p className="text-xs text-red-500 mt-0.5">{errors.nomeCentro}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Città</label>
                <input value={citta} onChange={e => setCitta(e.target.value)} className={inputClass('citta')} placeholder="Milano" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tipo di attività</label>
                <select value={tipoAttivita} onChange={e => setTipoAttivita(e.target.value)} className={inputClass('tipoAttivita')}>
                  <option value="">Seleziona...</option>
                  {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Clienti attuali</label>
                <input value={clientiAttuali} onChange={e => setClientiAttuali(e.target.value)} className={inputClass('clientiAttuali')} placeholder="Es. 50-100" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tempistiche</label>
                <select value={tempistiche} onChange={e => setTempistiche(e.target.value)} className={inputClass('tempistiche')}>
                  <option value="">Seleziona...</option>
                  {TIMEFRAME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Contatto preferito</label>
                <select value={contattoPreferito} onChange={e => setContattoPreferito(e.target.value)} className={inputClass('contattoPreferito')}>
                  <option value="">Seleziona...</option>
                  {CONTACT_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Sfide principali</label>
                <textarea value={sfidePrincipali} onChange={e => setSfidePrincipali(e.target.value)} rows={2} className={inputClass('sfide')} placeholder="Es. troppi DM senza risposta, nessuna automazione..." />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm font-semibold text-gray-700">Configurazione flussi</p>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">Tipo di centro</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['single', 'team'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTipoCentro(t)}
                      className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        tipoCentro === t
                          ? 'border-forest-green bg-emerald-50 text-forest-green'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {t === 'single' ? 'Singolo operatore' : 'Team / più operatori'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">Flussi principali</label>
                <div className="space-y-2">
                  {MAIN_FLOWS_OPTIONS.map(f => (
                    <label key={f.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      mainFlows.includes(f.id) ? 'border-forest-green bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="checkbox"
                        checked={mainFlows.includes(f.id)}
                        onChange={() => toggleFlow(f.id, mainFlows, setMainFlows)}
                        className="rounded text-forest-green"
                      />
                      <span className="text-sm flex-1">{f.label}</span>
                      <span className="text-xs text-gray-400">
                        €{tipoCentro === 'team' ? f.priceTeam : f.priceSingle}
                      </span>
                    </label>
                  ))}
                </div>
                {mainFlows.length === 3 && (
                  <p className="text-xs text-forest-green mt-1.5 font-medium">Sconto pacchetto 3 flussi applicato</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">Flussi extra (opzionali)</label>
                <div className="space-y-2">
                  {EXTRA_FLOWS_OPTIONS.map(f => (
                    <label key={f.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      extraFlows.includes(f.id) ? 'border-misty-teal bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="checkbox"
                        checked={extraFlows.includes(f.id)}
                        onChange={() => toggleFlow(f.id, extraFlows, setExtraFlows)}
                        className="rounded text-misty-teal"
                      />
                      <span className="text-sm flex-1">{f.label}</span>
                      <span className="text-xs text-gray-400">€{f.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">Piano manutenzione</label>
                <select value={pianoManutenzione} onChange={e => setPianoManutenzione(e.target.value)} className={inputClass('manutenzione')}>
                  {MAINTENANCE_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm font-semibold text-gray-700">Riepilogo</p>

              <div className="bg-warm-sand/50 rounded-xl p-4 space-y-2.5 text-sm">
                <Row label="Nome" value={`${nome} ${cognome}`} />
                <Row label="Email" value={email} />
                <Row label="Telefono" value={telefono} />
                <Row label="Centro" value={nomeCentro} />
                {citta && <Row label="Città" value={citta} />}
                {tipoAttivita && <Row label="Tipo attività" value={tipoAttivita} />}
                <div className="border-t border-gray-200 pt-2 mt-2" />
                <Row label="Tipo centro" value={tipoCentro === 'team' ? 'Team' : 'Singolo'} />
                <Row label="Flussi principali" value={mainFlows.length > 0 ? mainFlows.map(id => MAIN_FLOWS_OPTIONS.find(o => o.id === id)?.label).join(', ') : 'Nessuno'} />
                <Row label="Flussi extra" value={extraFlows.length > 0 ? extraFlows.map(id => EXTRA_FLOWS_OPTIONS.find(o => o.id === id)?.label).join(', ') : 'Nessuno'} />
                {pianoManutenzione && <Row label="Manutenzione" value={MAINTENANCE_OPTIONS.find(o => o.id === pianoManutenzione)?.label || ''} />}
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-gray-700">Costo totale setup</span>
                  <span className="text-forest-green">€{costoTotale.toLocaleString('it-IT')}</span>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-600">
                  {errors.submit}
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-between gap-3">
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={15} /> Indietro
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annulla
            </button>
          )}

          {step < STEP_LABELS.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-forest-green text-white text-sm font-medium hover:bg-forest-green/90 transition-colors"
            >
              Avanti <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              disabled={saving}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-forest-green text-white text-sm font-medium hover:bg-forest-green/90 transition-colors disabled:opacity-60"
            >
              {saving ? 'Salvataggio...' : 'Crea cliente'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium text-right">{value || '—'}</span>
    </div>
  );
}
