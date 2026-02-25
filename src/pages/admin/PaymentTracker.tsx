import React from 'react';
import { CreditCard, Calendar, CheckCircle2, Clock, TrendingUp, Plus, Trash2 } from 'lucide-react';
import { QuoteRequest, UpsellTranche } from './types';
import { supabase } from '../../lib/supabase';

interface Props {
  lead: QuoteRequest;
  setupTotale: string;
  onSetupTotaleChange: (v: string) => void;
  goLiveDate: string;
  onGoLiveDateChange: (v: string) => void;
  pagamento40Stato: 'non_pagato' | 'pagato';
  pagamento40Data: string;
  onPagamento40StatoChange: (stato: 'non_pagato' | 'pagato', data: string) => void;
  pagamento40DataChange: (v: string) => void;
  pagamento60Stato: 'non_pagato' | 'pagato';
  pagamento60Data: string;
  onPagamento60StatoChange: (stato: 'non_pagato' | 'pagato', data: string) => void;
  pagamento60DataChange: (v: string) => void;
  isConverted: boolean;
  upsellTranche: UpsellTranche[];
  onUpsellTrancheChange: (tranche: UpsellTranche[]) => void;
  pendingUpsellFlows: { id: string; label: string; prezzo: number }[];
  pendingUpsellTotale: string;
  onPendingUpsellTotaleChange: (v: string) => void;
  pendingUpsellTotaleManuale: boolean;
  onPendingUpsellTotaleManualeChange: (v: boolean) => void;
  isCustomPricing?: boolean;
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function addDays(dateStr: string, days: number): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function formatDateIT(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function PaymentTracker({
  lead,
  setupTotale,
  onSetupTotaleChange,
  goLiveDate,
  onGoLiveDateChange,
  pagamento40Stato,
  pagamento40Data,
  onPagamento40StatoChange,
  pagamento40DataChange,
  pagamento60Stato,
  pagamento60Data,
  onPagamento60StatoChange,
  pagamento60DataChange,
  isConverted,
  upsellTranche,
  onUpsellTrancheChange,
  pendingUpsellFlows,
  pendingUpsellTotale,
  onPendingUpsellTotaleChange,
  pendingUpsellTotaleManuale,
  onPendingUpsellTotaleManualeChange,
  isCustomPricing = false,
}: Props) {
  const totale = parseFloat(setupTotale) || 0;
  const imp40 = Math.round(totale * 0.4);
  const imp60 = Math.round(totale * 0.6);
  const scadenza60 = goLiveDate ? addDays(goLiveDate, 30) : '';

  const hasPendingUpsell = pendingUpsellFlows.length > 0;
  const pendingTot = parseFloat(pendingUpsellTotale) || 0;

  const handleCreateTranche = async () => {
    if (!hasPendingUpsell || pendingTot <= 0) return;
    const { data, error } = await supabase
      .from('upsell_tranche')
      .insert({
        lead_id: lead.id,
        flussi_ids: pendingUpsellFlows.map(f => f.id),
        flussi_labels: pendingUpsellFlows.map(f => f.label),
        totale: pendingTot,
        pagamento_stato: 'non_pagato',
      })
      .select()
      .maybeSingle();

    if (!error && data) {
      onUpsellTrancheChange([...upsellTranche, data]);
    }
  };

  const handleTrancheSegna = async (trancheId: string) => {
    const { error } = await supabase
      .from('upsell_tranche')
      .update({ pagamento_stato: 'pagato', pagamento_data: today() })
      .eq('id', trancheId);

    if (!error) {
      onUpsellTrancheChange(upsellTranche.map(t =>
        t.id === trancheId ? { ...t, pagamento_stato: 'pagato', pagamento_data: today() } : t
      ));
    }
  };

  const handleTrancheAnnulla = async (trancheId: string) => {
    const { error } = await supabase
      .from('upsell_tranche')
      .update({ pagamento_stato: 'non_pagato', pagamento_data: null })
      .eq('id', trancheId);

    if (!error) {
      onUpsellTrancheChange(upsellTranche.map(t =>
        t.id === trancheId ? { ...t, pagamento_stato: 'non_pagato', pagamento_data: null } : t
      ));
    }
  };

  const handleTrancheDataChange = async (trancheId: string, data: string) => {
    await supabase
      .from('upsell_tranche')
      .update({ pagamento_data: data })
      .eq('id', trancheId);

    onUpsellTrancheChange(upsellTranche.map(t =>
      t.id === trancheId ? { ...t, pagamento_data: data } : t
    ));
  };

  const handleTrancheGoLiveChange = async (trancheId: string, date: string) => {
    await supabase
      .from('upsell_tranche')
      .update({ golive_date: date || null })
      .eq('id', trancheId);

    onUpsellTrancheChange(upsellTranche.map(t =>
      t.id === trancheId ? { ...t, golive_date: date || null } : t
    ));
  };

  const handleTrancheDelete = async (trancheId: string) => {
    const { error } = await supabase
      .from('upsell_tranche')
      .delete()
      .eq('id', trancheId);

    if (!error) {
      onUpsellTrancheChange(upsellTranche.filter(t => t.id !== trancheId));
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-wellness p-6">
        <div className="flex items-center gap-2 mb-5">
          <CreditCard size={16} className="text-misty-teal" />
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pagamenti Setup</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Totale setup (€)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
              <input
                type="number"
                value={setupTotale}
                onChange={e => onSetupTotaleChange(e.target.value)}
                disabled={isConverted}
                placeholder="0"
                className={`w-full pl-7 pr-4 py-2 rounded-xl border text-sm transition-all ${
                  isConverted
                    ? 'border-gray-100 bg-gray-50 text-gray-500 cursor-default'
                    : 'border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal bg-white'
                }`}
              />
            </div>
            {isConverted && (
              <p className="text-xs text-amber-600 mt-1">Bloccato dopo conversione</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Data Go-live</label>
            <div className="relative">
              <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={goLiveDate}
                onChange={e => onGoLiveDateChange(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal bg-white transition-all"
              />
            </div>
            {scadenza60 && (
              <p className="text-xs text-gray-400 mt-1">Scadenza 60%: {formatDateIT(scadenza60)}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <PaymentSlice
            label="Acconto 40%"
            importo={imp40}
            stato={pagamento40Stato}
            data={pagamento40Data}
            onSegna={() => onPagamento40StatoChange('pagato', today())}
            onDataChange={pagamento40DataChange}
            onAnnulla={() => onPagamento40StatoChange('non_pagato', '')}
          />
          <PaymentSlice
            label="Saldo 60%"
            importo={imp60}
            stato={pagamento60Stato}
            data={pagamento60Data}
            onSegna={() => onPagamento60StatoChange('pagato', today())}
            onDataChange={pagamento60DataChange}
            onAnnulla={() => onPagamento60StatoChange('non_pagato', '')}
            scadenza={scadenza60}
          />
        </div>
      </div>

      {isConverted && (upsellTranche.length > 0 || hasPendingUpsell) && (
        <div className="bg-white rounded-2xl shadow-wellness p-6 border-2 border-amber-100">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Upsell</h2>
          </div>

          {upsellTranche.length > 0 && (
            <div className="space-y-4 mb-5">
              {upsellTranche.map((tranche, idx) => (
                <UpsellTrancheCard
                  key={tranche.id}
                  tranche={tranche}
                  index={idx + 1}
                  onSegna={() => handleTrancheSegna(tranche.id)}
                  onAnnulla={() => handleTrancheAnnulla(tranche.id)}
                  onDataChange={d => handleTrancheDataChange(tranche.id, d)}
                  onGoLiveChange={d => handleTrancheGoLiveChange(tranche.id, d)}
                  onDelete={() => handleTrancheDelete(tranche.id)}
                />
              ))}
            </div>
          )}

          {hasPendingUpsell && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-amber-700">Nuovi upsell da confermare</p>
                <span className="text-xs text-amber-500 bg-amber-100 px-2 py-0.5 rounded-lg">
                  Non ancora salvati come tranche
                </span>
              </div>
              {isCustomPricing && (
                <div className="mb-3 flex items-start gap-2 bg-amber-100 rounded-lg px-3 py-2">
                  <span className="text-amber-600 text-xs font-semibold mt-0.5">!</span>
                  <p className="text-xs text-amber-700">
                    Centro 5+ operatori: i prezzi indicati sono basati sulla tariffa team standard. Inserisci manualmente il totale concordato.
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {pendingUpsellFlows.map(f => (
                  <span key={f.id} className={`bg-white border text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${isCustomPricing ? 'border-amber-300 text-amber-700' : 'border-amber-200 text-amber-700'}`}>
                    {f.label}
                    {!isCustomPricing && <span className="text-amber-400">€{f.prezzo.toLocaleString('it-IT')}</span>}
                    {isCustomPricing && <span className="text-amber-400 line-through">€{f.prezzo.toLocaleString('it-IT')}</span>}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[120px] max-w-[160px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                  <input
                    type="number"
                    value={pendingUpsellTotale}
                    onChange={e => { onPendingUpsellTotaleChange(e.target.value); onPendingUpsellTotaleManualeChange(true); }}
                    placeholder="0"
                    className={`w-full pl-7 pr-3 py-2 rounded-xl border text-sm text-gray-700 focus:outline-none focus:ring-2 bg-white transition-all ${
                      isCustomPricing
                        ? 'border-amber-400 focus:ring-amber-200 focus:border-amber-500'
                        : 'border-amber-300 focus:ring-amber-200 focus:border-amber-400'
                    }`}
                  />
                </div>
                {!pendingUpsellTotaleManuale && !isCustomPricing && (
                  <span className="text-xs text-gray-400">Calcolato automaticamente</span>
                )}
                {isCustomPricing && (
                  <span className="text-xs text-amber-600 font-medium">Inserisci prezzo concordato</span>
                )}
                <button
                  onClick={handleCreateTranche}
                  disabled={pendingTot <= 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                  Crea tranche upsell
                </button>
              </div>
              <p className="text-xs text-amber-600 mt-2">
                Crea una nuova tranche separata. Potrai poi segnare il pagamento indipendentemente.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function UpsellTrancheCard({
  tranche,
  index,
  onSegna,
  onAnnulla,
  onDataChange,
  onGoLiveChange,
  onDelete,
}: {
  tranche: UpsellTranche;
  index: number;
  onSegna: () => void;
  onAnnulla: () => void;
  onDataChange: (d: string) => void;
  onGoLiveChange: (d: string) => void;
  onDelete: () => void;
}) {
  const pagato = tranche.pagamento_stato === 'pagato';

  return (
    <div className={`rounded-xl border-2 p-4 transition-all ${pagato ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-100 bg-amber-50/30'}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          {pagato ? (
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
          ) : (
            <Clock size={16} className="text-amber-400 flex-shrink-0" />
          )}
          <div>
            <p className="text-sm font-semibold text-gray-700">Upsell tranche #{index}</p>
            <p className="text-lg font-bold text-gray-800">€{tranche.totale.toLocaleString('it-IT')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${pagato ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {pagato ? 'Pagato' : 'Non pagato'}
          </span>
          {!pagato ? (
            <button
              onClick={onSegna}
              className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Segna pagato
            </button>
          ) : (
            <button
              onClick={onAnnulla}
              className="text-xs bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Annulla
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50"
            title="Elimina tranche"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {tranche.flussi_labels.map((label, i) => (
          <span key={i} className="bg-white border border-amber-200 text-amber-700 text-xs px-2 py-0.5 rounded-full">
            {label}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Go-live upsell</label>
          <div className="relative">
            <Calendar size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={tranche.golive_date || ''}
              onChange={e => onGoLiveChange(e.target.value)}
              className="pl-7 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-300 bg-white"
            />
          </div>
        </div>
        {pagato && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">Data pagamento</label>
            <input
              type="date"
              value={tranche.pagamento_data || ''}
              onChange={e => onDataChange(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-emerald-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-300 bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentSlice({
  label,
  importo,
  stato,
  data,
  onSegna,
  onDataChange,
  onAnnulla,
  scadenza,
}: {
  label: string;
  importo: number;
  stato: 'non_pagato' | 'pagato';
  data: string;
  onSegna: () => void;
  onDataChange: (v: string) => void;
  onAnnulla: () => void;
  scadenza?: string;
}) {
  const pagato = stato === 'pagato';

  return (
    <div className={`rounded-xl border-2 p-4 transition-all ${pagato ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-100 bg-gray-50/50'}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {pagato ? (
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
          ) : (
            <Clock size={16} className="text-gray-400 flex-shrink-0" />
          )}
          <div>
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <p className="text-lg font-bold text-gray-800">
              {importo > 0 ? `€${importo.toLocaleString('it-IT')}` : '—'}
            </p>
            {scadenza && !pagato && (
              <p className="text-xs text-amber-600 mt-0.5">Scade: {new Date(scadenza).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 min-w-[140px]">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${pagato ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
            {pagato ? 'Pagato' : 'Non pagato'}
          </span>
          {!pagato ? (
            <button
              onClick={onSegna}
              className="text-xs bg-misty-teal hover:bg-misty-teal-dark text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Segna come pagato
            </button>
          ) : (
            <button
              onClick={onAnnulla}
              className="text-xs bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Annulla pagamento
            </button>
          )}
        </div>
      </div>

      {pagato && (
        <div className="mt-3 pt-3 border-t border-emerald-100">
          <label className="block text-xs text-gray-500 mb-1">Data pagamento (modificabile)</label>
          <input
            type="date"
            value={data}
            onChange={e => onDataChange(e.target.value)}
            className="w-40 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-300 bg-white"
          />
        </div>
      )}
    </div>
  );
}
