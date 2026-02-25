import React, { useState } from 'react';
import { Package, Plus, Trash2, Lock } from 'lucide-react';
import { ModuloAcquistato, MAIN_FLOWS_OPTIONS, EXTRA_FLOWS_OPTIONS } from './types';
import { supabase } from '../../lib/supabase';

interface Props {
  leadId: string;
  moduli: ModuloAcquistato[];
  isConverted: boolean;
  tipoCentro: string;
  prezziBloccati: Record<string, number> | null;
  flussiPrincipaliAttivi: string[];
  flussiExtraAttivi: string[];
  onModuliChange: (moduli: ModuloAcquistato[]) => void;
}

const ALL_MODULES = [
  ...MAIN_FLOWS_OPTIONS.map(f => ({ id: f.id, label: f.label, tipo: 'principale' as const })),
  ...EXTRA_FLOWS_OPTIONS.map(f => ({ id: f.id, label: f.label, tipo: 'extra' as const })),
];

function getPrezzoAttuale(modId: string, tipoCentro: string): number {
  const isTeam = tipoCentro === 'team' || tipoCentro.startsWith('team_custom_');
  const main = MAIN_FLOWS_OPTIONS.find(f => f.id === modId);
  if (main) return isTeam ? main.priceTeam : main.priceSingle;
  const extra = EXTRA_FLOWS_OPTIONS.find(f => f.id === modId);
  if (extra) return extra.price;
  return 0;
}

export default function ModuliAcquistati({
  leadId,
  moduli,
  isConverted,
  tipoCentro,
  prezziBloccati,
  flussiPrincipaliAttivi,
  flussiExtraAttivi,
  onModuliChange,
}: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedMod, setSelectedMod] = useState('');
  const [prezzoCustom, setPrezzoCustom] = useState('');
  const [loading, setLoading] = useState(false);

  const totale = moduli.reduce((sum, m) => sum + m.prezzo, 0);

  const configurazioneAttivaIds = new Set([...flussiPrincipaliAttivi, ...flussiExtraAttivi]);

  const mainFlowsDisponibili = MAIN_FLOWS_OPTIONS.filter(f => !configurazioneAttivaIds.has(f.id));
  const extraFlowsDisponibili = EXTRA_FLOWS_OPTIONS.filter(f => !configurazioneAttivaIds.has(f.id));

  const getPrezzoForAdd = (modId: string): number => {
    if (prezziBloccati && prezziBloccati[modId] !== undefined) {
      return prezziBloccati[modId];
    }
    return getPrezzoAttuale(modId, tipoCentro);
  };

  const handleSelectMod = (id: string) => {
    setSelectedMod(id);
    setPrezzoCustom(String(getPrezzoForAdd(id)));
  };

  const handleAdd = async () => {
    if (!selectedMod || !prezzoCustom) return;
    setLoading(true);
    const modLabel = ALL_MODULES.find(m => m.id === selectedMod)?.label || selectedMod;
    const { data, error } = await supabase
      .from('moduli_acquistati')
      .insert({ lead_id: leadId, nome: modLabel, prezzo: Number(prezzoCustom) })
      .select()
      .maybeSingle();

    if (!error && data) {
      onModuliChange([...moduli, data]);
      setShowAdd(false);
      setSelectedMod('');
      setPrezzoCustom('');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('moduli_acquistati').delete().eq('id', id);
    if (!error) {
      onModuliChange(moduli.filter(m => m.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-wellness p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-misty-teal" />
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Moduli acquistati</h2>
        </div>
        {isConverted && (
          <button
            onClick={() => setShowAdd(s => !s)}
            className="flex items-center gap-1.5 text-xs bg-misty-teal hover:bg-misty-teal-dark text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            <Plus size={13} />
            Aggiungi modulo
          </button>
        )}
      </div>

      {!isConverted && (
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 mb-4">
          <Lock size={13} className="text-gray-400" />
          <p className="text-xs text-gray-400">I moduli acquistati saranno disponibili dopo la conversione del cliente.</p>
        </div>
      )}

      {isConverted && showAdd && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
          <p className="text-xs font-semibold text-gray-600 mb-3">Aggiungi nuovo modulo</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedMod}
              onChange={e => handleSelectMod(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal"
            >
              <option value="">Seleziona modulo...</option>
              {mainFlowsDisponibili.length > 0 && (
                <optgroup label="Flussi principali">
                  {mainFlowsDisponibili.map(f => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </optgroup>
              )}
              {extraFlowsDisponibili.length > 0 && (
                <optgroup label="Flussi extra">
                  {extraFlowsDisponibili.map(f => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </optgroup>
              )}
            </select>
            <div className="relative w-32 flex-shrink-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
              <input
                type="number"
                value={prezzoCustom}
                onChange={e => setPrezzoCustom(e.target.value)}
                placeholder="Prezzo"
                className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal"
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={!selectedMod || !prezzoCustom || loading}
              className="px-4 py-2 rounded-xl bg-misty-teal hover:bg-misty-teal-dark text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              Salva
            </button>
            <button
              onClick={() => { setShowAdd(false); setSelectedMod(''); setPrezzoCustom(''); }}
              className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Annulla
            </button>
          </div>
          {selectedMod && (
            <p className="text-xs text-gray-400 mt-2">
              Il prezzo inserito sara' fissato e non cambiera' con il listino.
            </p>
          )}
        </div>
      )}

      {moduli.length === 0 && isConverted && !showAdd && (
        <p className="text-sm text-gray-400 text-center py-4">Nessun modulo aggiunto ancora.</p>
      )}

      {moduli.length > 0 && (
        <div className="space-y-2">
          {moduli.map(m => (
            <div key={m.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
              <div className="flex items-center gap-2 min-w-0">
                <Lock size={12} className="text-gray-300 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{m.nome}</span>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(m.data_acquisto).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-semibold text-gray-800">€{m.prezzo.toLocaleString('it-IT')}</span>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-1 rounded"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-sm font-semibold text-gray-600">Totale moduli</span>
            <span className="text-base font-bold text-gray-800">€{totale.toLocaleString('it-IT')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
