import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  ArrowLeft, Save, Phone, Mail, MapPin, Building2,
  MessageSquare, Euro, Calendar, User, Check, Loader2,
  Settings, FolderOpen, ExternalLink, BadgeCheck, Trash2
} from 'lucide-react';
import {
  QuoteRequest, UpsellTranche, LeadStatus, STATUS_LABELS, STATUS_COLORS,
  MAIN_FLOWS_OPTIONS, EXTRA_FLOWS_OPTIONS, MAINTENANCE_OPTIONS, calcCosto,
  getPrezzoAttualeFlow
} from './types';
import PaymentTracker from './PaymentTracker';
import ConversionDialog from './ConversionDialog';
import StripeSubscription, { StripeSubscriptionData } from './StripeSubscription';

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
  const [setupTotaleManuale, setSetupTotaleManuale] = useState(false);

  const [driveLink, setDriveLink] = useState<string>('');
  const [setupTotale, setSetupTotale] = useState<string>('');
  const [goLiveDate, setGoLiveDate] = useState<string>('');
  const [pagamento40Stato, setPagamento40Stato] = useState<'non_pagato' | 'pagato'>('non_pagato');
  const [pagamento40Data, setPagamento40Data] = useState<string>('');
  const [pagamento60Stato, setPagamento60Stato] = useState<'non_pagato' | 'pagato'>('non_pagato');
  const [pagamento60Data, setPagamento60Data] = useState<string>('');

  const [upsellTranche, setUpsellTranche] = useState<UpsellTranche[]>([]);
  const [pendingUpsellTotale, setPendingUpsellTotale] = useState<string>('');
  const [pendingUpsellTotaleManuale, setPendingUpsellTotaleManuale] = useState(false);

  const [showConversionDialog, setShowConversionDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [convertingLoading, setConvertingLoading] = useState(false);

  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [stripeLastCheck, setStripeLastCheck] = useState<string | null>(null);
  const [stripeLastCheckResult, setStripeLastCheckResult] = useState<string | null>(null);
  const [stripeSubscriptionData, setStripeSubscriptionData] = useState<Record<string, unknown> | null>(null);

  const isConverted = stato === 'converted';
  const tipoCentroCalcolo = tipoCentroAttivo.startsWith('team_custom_') ? 'team' : tipoCentroAttivo;

  const getOperatoriCount = (tipo: string): number => {
    if (tipo === 'single') return 1;
    if (tipo === 'team') return 4;
    if (tipo.startsWith('team_custom_')) return parseInt(tipo.replace('team_custom_', ''), 10) || 5;
    return 0;
  };

  const canChangeTipoCentro = (newTipo: string): boolean => {
    if (!isConverted) return true;
    return getOperatoriCount(newTipo) >= getOperatoriCount(tipoCentroAttivo);
  };

  const isCustomPricing = tipoCentroAttivo.startsWith('team_custom_');

  const prezziBloccatiSnapshot = lead?.prezzi_bloccati ?? null;
  const allUpsellMainFlows = isConverted && prezziBloccatiSnapshot
    ? flussiPrincipaliAttivi.filter(fid => !(fid in prezziBloccatiSnapshot))
    : [];
  const allUpsellExtraFlows = isConverted && prezziBloccatiSnapshot
    ? flussiExtraAttivi.filter(fid => !(fid in prezziBloccatiSnapshot))
    : [];

  const trancheFlowIds = new Set(upsellTranche.flatMap(t => t.flussi_ids));
  const pendingUpsellFlows: { id: string; label: string; prezzo: number }[] = [
    ...allUpsellMainFlows
      .filter(fid => !trancheFlowIds.has(fid))
      .map(fid => {
        const flow = MAIN_FLOWS_OPTIONS.find(f => f.id === fid);
        return { id: fid, label: flow?.label ?? fid, prezzo: getPrezzoAttualeFlow(fid, tipoCentroAttivo) };
      }),
    ...allUpsellExtraFlows
      .filter(fid => !trancheFlowIds.has(fid))
      .map(fid => {
        const flow = EXTRA_FLOWS_OPTIONS.find(f => f.id === fid);
        return { id: fid, label: flow?.label ?? fid, prezzo: getPrezzoAttualeFlow(fid, tipoCentroAttivo) };
      }),
  ];

  useEffect(() => {
    if (costoManuale) return;
    const calcolato = calcCosto(tipoCentroCalcolo, flussiPrincipaliAttivi, flussiExtraAttivi);
    setCostoConcordato(calcolato > 0 ? String(calcolato) : '');
  }, [tipoCentroAttivo, tipoCentroCalcolo, flussiPrincipaliAttivi, flussiExtraAttivi, costoManuale]);

  useEffect(() => {
    if (isConverted) return;
    if (setupTotaleManuale) return;
    if (costoConcordato) setSetupTotale(costoConcordato);
  }, [costoConcordato, setupTotaleManuale, isConverted]);

  useEffect(() => {
    if (pendingUpsellTotaleManuale) return;
    const calcolato = pendingUpsellFlows.reduce((sum, f) => sum + f.prezzo, 0);
    setPendingUpsellTotale(calcolato > 0 ? String(calcolato) : '');
  }, [pendingUpsellFlows.map(f => f.id).join(','), pendingUpsellTotaleManuale]);

  useEffect(() => {
    const fetchLead = async () => {
      const [{ data, error }, { data: trancheData }] = await Promise.all([
        supabase.from('quote_requests').select('*').eq('id', id).maybeSingle(),
        supabase.from('upsell_tranche').select('*').eq('lead_id', id).order('created_at'),
      ]);

      if (error || !data) {
        navigate('/admin/dashboard');
        return;
      }
      setLead(data);
      setUpsellTranche((trancheData as UpsellTranche[]) || []);
      setStato(data.stato);
      setNote(data.note || '');
      setDriveLink(data.drive_link || '');
      const calcolatoSetup = calcCosto(
        data.tipo_centro_attivo ?? data.tipo_centro ?? '',
        data.flussi_principali_attivi
          ? data.flussi_principali_attivi.split('|').map((f: string) => f.trim()).filter(Boolean)
          : parseFlowField(data.core_flows).map(labelToId),
        data.flussi_extra_attivi
          ? data.flussi_extra_attivi.split('|').map((f: string) => f.trim()).filter(Boolean)
          : parseFlowField(data.extra_flows).map(labelToExtraId)
      );
      const setupFallback = data.costo_concordato ?? (calcolatoSetup > 0 ? calcolatoSetup : data.costo_totale) ?? null;
      const setupVal = data.setup_totale != null ? String(data.setup_totale) : (setupFallback != null ? String(setupFallback) : '');
      setSetupTotale(setupVal);
      const concVal = data.costo_concordato != null ? String(data.costo_concordato) : (calcolatoSetup > 0 ? String(calcolatoSetup) : String(data.costo_totale || ''));
      setSetupTotaleManuale(data.setup_totale != null && String(data.setup_totale) !== concVal);
      setGoLiveDate(data.golive_date || '');
      setPagamento40Stato((data.pagamento_40_stato as 'non_pagato' | 'pagato') || 'non_pagato');
      setPagamento40Data(data.pagamento_40_data || '');
      setPagamento60Stato((data.pagamento_60_stato as 'non_pagato' | 'pagato') || 'non_pagato');
      setPagamento60Data(data.pagamento_60_data || '');

      const centro = data.tipo_centro_attivo ?? data.tipo_centro ?? '';
      const mainAttivi = data.flussi_principali_attivi
        ? data.flussi_principali_attivi.split('|').map((f: string) => f.trim()).filter(Boolean)
        : parseFlowField(data.core_flows).map(labelToId);
      const extraAttivi = data.flussi_extra_attivi
        ? data.flussi_extra_attivi.split('|').map((f: string) => f.trim()).filter(Boolean)
        : parseFlowField(data.extra_flows).map(labelToExtraId);

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

      setStripeCustomerId(data.stripe_customer_id || null);
      setStripeLastCheck(data.stripe_last_check || null);
      setStripeLastCheckResult(data.stripe_last_check_result || null);
      setStripeSubscriptionData(data.stripe_subscription_data || null);

      setLoading(false);
    };
    fetchLead();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!lead) return;
    setSaving(true);

    const nuovoCostoTotale = costoConcordato ? Number(costoConcordato) : lead.costo_totale;
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
        costo_totale: nuovoCostoTotale,
        drive_link: driveLink || null,
        setup_totale: setupTotale ? Number(setupTotale) : null,
        golive_date: goLiveDate || null,
        pagamento_40_stato: pagamento40Stato,
        pagamento_40_data: pagamento40Data || null,
        pagamento_60_stato: pagamento60Stato,
        pagamento_60_data: pagamento60Data || null,
      })
      .eq('id', lead.id);

    setSaving(false);
    if (!error) {
      setSaved(true);
      setLead(prev => prev ? {
        ...prev, stato, note,
        tipo_centro_attivo: tipoCentroAttivo || null,
        flussi_principali_attivi: flussiPrincipaliAttivi.length > 0 ? flussiPrincipaliAttivi.join(' | ') : null,
        flussi_extra_attivi: flussiExtraAttivi.length > 0 ? flussiExtraAttivi.join(' | ') : null,
        piano_manutenzione_attivo: pianoManutenzioneAttivo || null,
        costo_concordato: costoConcordato ? Number(costoConcordato) : null,
        costo_totale: nuovoCostoTotale,
        drive_link: driveLink || null,
        setup_totale: setupTotale ? Number(setupTotale) : null,
        golive_date: goLiveDate || null,
        pagamento_40_stato: pagamento40Stato,
        pagamento_40_data: pagamento40Data || null,
        pagamento_60_stato: pagamento60Stato,
        pagamento_60_data: pagamento60Data || null,
      } : null);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const handleConvertConfirm = async () => {
    if (!lead) return;
    setConvertingLoading(true);

    const isTeam = tipoCentroAttivo === 'team' || tipoCentroAttivo.startsWith('team_custom_');
    const prezziBloccati: Record<string, number> = {};
    flussiPrincipaliAttivi.forEach(flowId => {
      const f = MAIN_FLOWS_OPTIONS.find(o => o.id === flowId);
      if (f) prezziBloccati[flowId] = isTeam ? f.priceTeam : f.priceSingle;
    });
    flussiExtraAttivi.forEach(flowId => {
      const f = EXTRA_FLOWS_OPTIONS.find(o => o.id === flowId);
      if (f) prezziBloccati[flowId] = f.price;
    });

    const { error } = await supabase
      .from('quote_requests')
      .update({
        stato: 'converted',
        data_conversione: new Date().toISOString(),
        prezzi_bloccati: prezziBloccati,
        costo_concordato: costoConcordato ? Number(costoConcordato) : null,
        costo_totale: costoConcordato ? Number(costoConcordato) : lead.costo_totale,
        tipo_centro_attivo: tipoCentroAttivo || null,
        flussi_principali_attivi: flussiPrincipaliAttivi.length > 0 ? flussiPrincipaliAttivi.join(' | ') : null,
        flussi_extra_attivi: flussiExtraAttivi.length > 0 ? flussiExtraAttivi.join(' | ') : null,
        piano_manutenzione_attivo: pianoManutenzioneAttivo || null,
        drive_link: driveLink || null,
        setup_totale: setupTotale ? Number(setupTotale) : null,
        golive_date: goLiveDate || null,
        pagamento_40_stato: pagamento40Stato,
        pagamento_40_data: pagamento40Data || null,
        pagamento_60_stato: pagamento60Stato,
        pagamento_60_data: pagamento60Data || null,
        note,
      })
      .eq('id', lead.id);

    if (!error) {
      setStato('converted');
      setLead(prev => prev ? {
        ...prev,
        stato: 'converted',
        data_conversione: new Date().toISOString(),
        prezzi_bloccati: prezziBloccati,
      } : null);
    }
    setShowConversionDialog(false);
    setConvertingLoading(false);
  };

  const handleDelete = async () => {
    if (!lead) return;
    setDeleting(true);
    await supabase.from('quote_requests').delete().eq('id', lead.id);
    setDeleting(false);
    navigate('/admin/dashboard');
  };

  const toggleMainFlow = (flowId: string) => {
    const isOriginal = prezziBloccatiSnapshot && flowId in prezziBloccatiSnapshot;
    if (isOriginal) return;
    setFlussiPrincipaliAttivi(prev =>
      prev.includes(flowId) ? prev.filter(f => f !== flowId) : [...prev, flowId]
    );
    if (isConverted) {
      if (isCustomPricing) {
        setPendingUpsellTotaleManuale(true);
      } else {
        setPendingUpsellTotaleManuale(false);
      }
    }
  };

  const toggleExtraFlow = (flowId: string) => {
    const isOriginal = prezziBloccatiSnapshot && flowId in prezziBloccatiSnapshot;
    if (isOriginal) return;
    setFlussiExtraAttivi(prev =>
      prev.includes(flowId) ? prev.filter(f => f !== flowId) : [...prev, flowId]
    );
    if (isConverted) {
      if (isCustomPricing) {
        setPendingUpsellTotaleManuale(true);
      } else {
        setPendingUpsellTotaleManuale(false);
      }
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

  const mainFlowsOriginal = parseFlowField(lead.core_flows);
  const extraFlowsOriginal = parseFlowField(lead.extra_flows);
  const challenges = parseFlowField(lead.sfide_principali);

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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 text-sm px-3 py-2 rounded-xl transition-colors"
              title="Elimina cliente"
            >
              <Trash2 size={15} />
            </button>
            {!isConverted && (
              <button
                onClick={() => setShowConversionDialog(true)}
                disabled={convertingLoading}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
              >
                <BadgeCheck size={15} />
                Converti cliente
              </button>
            )}
            {isConverted && (
              <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-100 text-xs font-semibold px-3 py-1.5 rounded-xl">
                <BadgeCheck size={13} />
                Convertito
                {lead.data_conversione && (
                  <span className="text-emerald-500 font-normal">
                    {' '}· {new Date(lead.data_conversione).toLocaleDateString('it-IT')}
                  </span>
                )}
              </span>
            )}
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
              {saved ? 'Salvato!' : 'Salva'}
            </button>
          </div>
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

          <div className="mt-4 pt-4 border-t border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
              <FolderOpen size={12} />
              Cartella Google Drive
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={driveLink}
                onChange={e => setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal bg-white transition-all"
              />
              {driveLink && (
                <a
                  href={driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-misty-teal/10 hover:bg-misty-teal/20 text-misty-teal-dark text-sm font-medium transition-colors flex-shrink-0"
                >
                  <ExternalLink size={13} />
                  Apri Drive
                </a>
              )}
            </div>
          </div>
        </div>

        <PaymentTracker
          lead={lead}
          setupTotale={setupTotale}
          onSetupTotaleChange={v => { setSetupTotale(v); setSetupTotaleManuale(true); }}
          goLiveDate={goLiveDate}
          onGoLiveDateChange={setGoLiveDate}
          pagamento40Stato={pagamento40Stato}
          pagamento40Data={pagamento40Data}
          onPagamento40StatoChange={(s, d) => { setPagamento40Stato(s); setPagamento40Data(d); }}
          pagamento40DataChange={setPagamento40Data}
          pagamento60Stato={pagamento60Stato}
          pagamento60Data={pagamento60Data}
          onPagamento60StatoChange={(s, d) => { setPagamento60Stato(s); setPagamento60Data(d); }}
          pagamento60DataChange={setPagamento60Data}
          isConverted={isConverted}
          upsellTranche={upsellTranche}
          onUpsellTrancheChange={setUpsellTranche}
          pendingUpsellFlows={pendingUpsellFlows}
          pendingUpsellTotale={pendingUpsellTotale}
          onPendingUpsellTotaleChange={setPendingUpsellTotale}
          pendingUpsellTotaleManuale={pendingUpsellTotaleManuale}
          onPendingUpsellTotaleManualeChange={setPendingUpsellTotaleManuale}
          isCustomPricing={isCustomPricing}
        />

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
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">Tipo di centro</label>
              {isConverted && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">
                  Puoi solo aumentare il numero di operatori
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'single', label: '1 operatore' },
                { value: 'team', label: '2-4 operatori' },
              ].map(opt => {
                const canChange = canChangeTipoCentro(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => canChange && setTipoCentroAttivo(opt.value)}
                    disabled={!canChange}
                    title={!canChange ? 'Non puoi ridurre il numero di operatori' : undefined}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                      tipoCentroAttivo === opt.value
                        ? 'bg-misty-teal/10 text-misty-teal-dark border-misty-teal'
                        : canChange
                        ? 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                        : 'bg-gray-50 text-gray-300 border-transparent opacity-40 cursor-not-allowed'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  const n = operatoriCustom || '5';
                  const newTipo = `team_custom_${n}`;
                  if (!canChangeTipoCentro(newTipo)) return;
                  setOperatoriCustom(n);
                  setTipoCentroAttivo(newTipo);
                }}
                disabled={!canChangeTipoCentro(`team_custom_${operatoriCustom || '5'}`)}
                title={!canChangeTipoCentro(`team_custom_${operatoriCustom || '5'}`) ? 'Non puoi ridurre il numero di operatori' : undefined}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                  tipoCentroAttivo.startsWith('team_custom_')
                    ? 'bg-misty-teal/10 text-misty-teal-dark border-misty-teal'
                    : canChangeTipoCentro(`team_custom_${operatoriCustom || '5'}`)
                    ? 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                    : 'bg-gray-50 text-gray-300 border-transparent opacity-40 cursor-not-allowed'
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
                  min={isConverted ? getOperatoriCount(lead?.tipo_centro_attivo ?? tipoCentroAttivo) : 5}
                  value={operatoriCustom}
                  onChange={e => {
                    const val = e.target.value;
                    const newTipo = `team_custom_${val}`;
                    if (isConverted && !canChangeTipoCentro(newTipo)) return;
                    setOperatoriCustom(val);
                    if (val) setTipoCentroAttivo(newTipo);
                  }}
                  className="w-20 px-3 py-1.5 rounded-xl border border-misty-teal text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal bg-white"
                />
              </div>
            )}
            {isConverted && isCustomPricing && (
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <span className="font-semibold">Nota:</span> Per 5+ operatori i prezzi dei nuovi upsell non hanno una tariffa standard — inseriscili manualmente nel totale upsell.
              </p>
            )}
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-gray-700">Flussi principali attivi</label>
              {isConverted && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">
                  Accordo originale bloccato — puoi aggiungere upsell
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {MAIN_FLOWS_OPTIONS.map(flow => {
                const isOriginal = isConverted && prezziBloccatiSnapshot && flow.id in prezziBloccatiSnapshot;
                const isUpsell = isConverted && flussiPrincipaliAttivi.includes(flow.id) && !isOriginal;
                const isActive = flussiPrincipaliAttivi.includes(flow.id);
                return (
                  <button
                    key={flow.id}
                    onClick={() => toggleMainFlow(flow.id)}
                    disabled={!!isOriginal}
                    title={isOriginal ? "Bloccato — flusso dell'accordo originale" : undefined}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                      isUpsell
                        ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                        : isOriginal
                        ? 'bg-misty-teal/10 text-misty-teal-dark border-misty-teal cursor-default'
                        : isActive
                        ? 'bg-misty-teal/10 text-misty-teal-dark border-misty-teal'
                        : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    {isActive ? '✓ ' : ''}{flow.label}
                    {isUpsell && <span className="ml-1.5 text-xs bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-md">Upsell</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Flussi extra attivi</label>
            <div className="flex flex-wrap gap-2">
              {EXTRA_FLOWS_OPTIONS.map(flow => {
                const isOriginal = isConverted && prezziBloccatiSnapshot && flow.id in prezziBloccatiSnapshot;
                const isUpsell = isConverted && flussiExtraAttivi.includes(flow.id) && !isOriginal;
                const isActive = flussiExtraAttivi.includes(flow.id);
                return (
                  <button
                    key={flow.id}
                    onClick={() => toggleExtraFlow(flow.id)}
                    disabled={!!isOriginal}
                    title={isOriginal ? "Bloccato — flusso dell'accordo originale" : undefined}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                      isUpsell
                        ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                        : isOriginal
                        ? 'bg-sage-green/10 text-forest-green border-sage-green cursor-default'
                        : isActive
                        ? 'bg-sage-green/10 text-forest-green border-sage-green'
                        : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    {isActive ? '✓ ' : ''}{flow.label}
                    {isUpsell && <span className="ml-1.5 text-xs bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-md">Upsell</span>}
                  </button>
                );
              })}
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
              {!isConverted && (
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
              )}
            </div>
            <div className="relative">
              <Euro size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={costoConcordato}
                onChange={e => setCostoConcordato(e.target.value)}
                disabled={!costoManuale || isConverted}
                placeholder="Seleziona i blocchi per calcolare"
                className={`w-full pl-8 pr-4 py-2 rounded-xl border text-sm transition-all ${
                  costoManuale && !isConverted
                    ? 'border-amber-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 bg-white'
                    : 'border-gray-200 text-gray-700 bg-gray-50 cursor-default'
                }`}
              />
            </div>
            {!costoManuale && flussiPrincipaliAttivi.length > 0 && !isConverted && (
              <p className="text-xs text-gray-400 mt-1">
                Calcolato automaticamente dai blocchi selezionati
                {flussiPrincipaliAttivi.length === 3 && ' (sconto 3 flussi applicato)'}
              </p>
            )}
          </div>

          {(tipoCentroAttivo || flussiPrincipaliAttivi.length > 0 || flussiExtraAttivi.length > 0 || costoConcordato) && (
            <div className="mt-5 pt-4 border-t border-gray-100 space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-2">Setup originale</p>
                <div className="flex flex-wrap gap-1.5">
                  {tipoCentroAttivo && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                      {tipoCentroAttivo === 'single' ? '1 operatore' :
                       tipoCentroAttivo === 'team' ? '2-4 operatori' :
                       tipoCentroAttivo.startsWith('team_custom_') ? `${tipoCentroAttivo.replace('team_custom_', '')} operatori` :
                       tipoCentroAttivo}
                    </span>
                  )}
                  {flussiPrincipaliAttivi.filter(fid => !allUpsellMainFlows.includes(fid)).map(fid => {
                    const flow = MAIN_FLOWS_OPTIONS.find(f => f.id === fid);
                    return flow ? (
                      <span key={fid} className="bg-misty-teal/10 text-misty-teal-dark text-xs px-3 py-1 rounded-full font-medium">
                        {flow.label}
                      </span>
                    ) : null;
                  })}
                  {flussiExtraAttivi.filter(fid => !allUpsellExtraFlows.includes(fid)).map(fid => {
                    const flow = EXTRA_FLOWS_OPTIONS.find(f => f.id === fid);
                    return flow ? (
                      <span key={fid} className="bg-sage-green/10 text-forest-green text-xs px-3 py-1 rounded-full font-medium">
                        {flow.label}
                      </span>
                    ) : null;
                  })}
                  {costoConcordato && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                      €{Number(costoConcordato).toLocaleString('it-IT')}
                    </span>
                  )}
                </div>
              </div>
              {(allUpsellMainFlows.length > 0 || allUpsellExtraFlows.length > 0) && (
                <div>
                  <p className="text-xs text-amber-600 font-semibold mb-2">Upsell aggiuntivi</p>
                  <div className="flex flex-wrap gap-1.5">
                    {allUpsellMainFlows.map(fid => {
                      const flow = MAIN_FLOWS_OPTIONS.find(f => f.id === fid);
                      const prezzo = getPrezzoAttualeFlow(fid, tipoCentroAttivo);
                      const inTranche = trancheFlowIds.has(fid);
                      return flow ? (
                        <span key={fid} className={`border text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${inTranche ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          {flow.label}
                          <span className={inTranche ? 'text-emerald-400' : 'text-amber-400'}>€{prezzo.toLocaleString('it-IT')}</span>
                          {inTranche && <span className="text-xs bg-emerald-100 text-emerald-600 px-1 rounded">tranche</span>}
                        </span>
                      ) : null;
                    })}
                    {allUpsellExtraFlows.map(fid => {
                      const flow = EXTRA_FLOWS_OPTIONS.find(f => f.id === fid);
                      const prezzo = getPrezzoAttualeFlow(fid, tipoCentroAttivo);
                      const inTranche = trancheFlowIds.has(fid);
                      return flow ? (
                        <span key={fid} className={`border text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${inTranche ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          {flow.label}
                          <span className={inTranche ? 'text-emerald-400' : 'text-amber-400'}>€{prezzo.toLocaleString('it-IT')}</span>
                          {inTranche && <span className="text-xs bg-emerald-100 text-emerald-600 px-1 rounded">tranche</span>}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
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

        <StripeSubscription
          leadId={lead.id}
          email={lead.email}
          stripeCustomerId={stripeCustomerId}
          stripeLastCheck={stripeLastCheck}
          stripeLastCheckResult={stripeLastCheckResult}
          stripeSubscriptionData={stripeSubscriptionData as StripeSubscriptionData | null}
          onUpdate={(fields) => {
            if (fields.stripe_customer_id !== undefined) setStripeCustomerId(fields.stripe_customer_id || null);
            if (fields.stripe_last_check !== undefined) setStripeLastCheck(fields.stripe_last_check || null);
            if (fields.stripe_last_check_result !== undefined) setStripeLastCheckResult(fields.stripe_last_check_result || null);
            if (fields.stripe_subscription_data !== undefined) setStripeSubscriptionData(fields.stripe_subscription_data as Record<string, unknown> | null);
          }}
        />

        <div className="bg-white rounded-2xl shadow-wellness p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Gestione lead</h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Stato</label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(opt => {
                const isLocked = isConverted && opt.value !== 'converted';
                return (
                  <button
                    key={opt.value}
                    onClick={() => !isLocked && setStato(opt.value)}
                    disabled={isLocked}
                    title={isLocked ? 'Non puoi rimuovere la conversione' : undefined}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                      stato === opt.value
                        ? `${STATUS_COLORS[opt.value]} border-current`
                        : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {isConverted && (
              <p className="text-xs text-gray-400 mt-1.5">Lo stato "Convertito" e' permanente.</p>
            )}
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

      {showConversionDialog && (
        <ConversionDialog
          onConfirm={handleConvertConfirm}
          onCancel={() => setShowConversionDialog(false)}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash2 size={18} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-800">Elimina cliente</h3>
                <p className="text-sm text-gray-500">Questa azione non e' reversibile</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Stai per eliminare <span className="font-semibold">{lead.nome} {lead.cognome}</span> e tutti i dati associati. Sei sicuro?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Annulla
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? 'Eliminazione...' : 'Elimina'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function parseFlowField(field: string | string[] | null): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field.filter(Boolean);
  return field.split('|').map(f => f.trim()).filter(Boolean);
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
