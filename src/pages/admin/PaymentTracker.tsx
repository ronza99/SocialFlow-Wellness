import React from 'react';
import { CreditCard, Calendar, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { QuoteRequest } from './types';

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
  hasUpsell?: boolean;
  upsellTotale: string;
  onUpsellTotaleChange: (v: string) => void;
  upsellTotaleManuale: boolean;
  onUpsellTotaleManualeChange: (v: boolean) => void;
  upsellGoLiveDate: string;
  onUpsellGoLiveDateChange: (v: string) => void;
  upsellPagamentoStato: 'non_pagato' | 'pagato';
  upsellPagamentoData: string;
  onUpsellPagamentoStatoChange: (stato: 'non_pagato' | 'pagato', data: string) => void;
  upsellPagamentoDataChange: (v: string) => void;
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
  hasUpsell,
  upsellTotale,
  onUpsellTotaleChange,
  upsellTotaleManuale,
  onUpsellTotaleManualeChange,
  upsellGoLiveDate,
  onUpsellGoLiveDateChange,
  upsellPagamentoStato,
  upsellPagamentoData,
  onUpsellPagamentoStatoChange,
  upsellPagamentoDataChange,
}: Props) {
  const totale = parseFloat(setupTotale) || 0;
  const imp40 = Math.round(totale * 0.4);
  const imp60 = Math.round(totale * 0.6);
  const scadenza60 = goLiveDate ? addDays(goLiveDate, 30) : '';

  const upsellTot = parseFloat(upsellTotale) || 0;

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

      {isConverted && hasUpsell && (
        <div className="bg-white rounded-2xl shadow-wellness p-6 border-2 border-amber-100">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Pagamento Upsell</h2>
            <span className="ml-auto text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
              Prezzi aggiornati al listino attuale
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-gray-500">Totale upsell (€)</label>
                <button
                  onClick={() => onUpsellTotaleManualeChange(!upsellTotaleManuale)}
                  className={`text-xs px-2 py-0.5 rounded-lg transition-all border ${
                    upsellTotaleManuale
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {upsellTotaleManuale ? 'Manuale' : 'Auto'}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                <input
                  type="number"
                  value={upsellTotale}
                  onChange={e => { onUpsellTotaleChange(e.target.value); onUpsellTotaleManualeChange(true); }}
                  placeholder="0"
                  className="w-full pl-7 pr-4 py-2 rounded-xl border border-amber-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 bg-white transition-all"
                />
              </div>
              {!upsellTotaleManuale && (
                <p className="text-xs text-gray-400 mt-1">Calcolato dai flussi upsell attivi</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Data Go-live upsell</label>
              <div className="relative">
                <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={upsellGoLiveDate}
                  onChange={e => onUpsellGoLiveDateChange(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 bg-white transition-all"
                />
              </div>
            </div>
          </div>

          <div className={`rounded-xl border-2 p-4 transition-all ${upsellPagamentoStato === 'pagato' ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                {upsellPagamentoStato === 'pagato' ? (
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                ) : (
                  <Clock size={16} className="text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-700">Pagamento upsell</p>
                  <p className="text-lg font-bold text-gray-800">
                    {upsellTot > 0 ? `€${upsellTot.toLocaleString('it-IT')}` : '—'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 min-w-[140px]">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${upsellPagamentoStato === 'pagato' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {upsellPagamentoStato === 'pagato' ? 'Pagato' : 'Non pagato'}
                </span>
                {upsellPagamentoStato !== 'pagato' ? (
                  <button
                    onClick={() => onUpsellPagamentoStatoChange('pagato', today())}
                    className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Segna come pagato
                  </button>
                ) : (
                  <button
                    onClick={() => onUpsellPagamentoStatoChange('non_pagato', '')}
                    className="text-xs bg-white hover:bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Annulla pagamento
                  </button>
                )}
              </div>
            </div>
            {upsellPagamentoStato === 'pagato' && (
              <div className="mt-3 pt-3 border-t border-emerald-100">
                <label className="block text-xs text-gray-500 mb-1">Data pagamento (modificabile)</label>
                <input
                  type="date"
                  value={upsellPagamentoData}
                  onChange={e => upsellPagamentoDataChange(e.target.value)}
                  className="w-40 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-300 bg-white"
                />
              </div>
            )}
          </div>
        </div>
      )}
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
