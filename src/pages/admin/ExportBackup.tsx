import React, { useState } from 'react';
import { Download, FileJson, FileText, X, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { QuoteRequest } from './types';

interface ExportBackupProps {
  onClose: () => void;
}

export default function ExportBackup({ onClose }: ExportBackupProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllData = async () => {
    setLoading(true);
    setError('');

    const { data: leads, error: leadsError } = await supabase
      .from('quote_requests')
      .select('*')
      .order('data_creazione', { ascending: false });

    if (leadsError) {
      setError('Errore nel recupero dei dati: ' + leadsError.message);
      setLoading(false);
      return null;
    }

    const { data: moduli } = await supabase
      .from('moduli_acquistati')
      .select('*')
      .order('data_acquisto', { ascending: false });

    const { data: tranches } = await supabase
      .from('upsell_tranche')
      .select('*')
      .order('created_at', { ascending: false });

    setLoading(false);
    return { leads: leads || [], moduli: moduli || [], tranches: tranches || [] };
  };

  const downloadJSON = async () => {
    const data = await fetchAllData();
    if (!data) return;

    const backup = {
      exported_at: new Date().toISOString(),
      version: '1.0',
      tables: {
        quote_requests: data.leads,
        moduli_acquistati: data.moduli,
        upsell_tranche: data.tranches,
      },
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crm-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = async () => {
    const data = await fetchAllData();
    if (!data) return;

    const leads = data.leads as QuoteRequest[];
    if (leads.length === 0) {
      setError('Nessun dato da esportare.');
      return;
    }

    const escapeCSV = (val: unknown): string => {
      if (val === null || val === undefined) return '';
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headers = Object.keys(leads[0]) as (keyof QuoteRequest)[];
    const csvRows = [
      headers.join(','),
      ...leads.map(lead => headers.map(h => escapeCSV(lead[h])).join(',')),
    ];

    const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crm-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Backup & Esportazione</h2>
            <p className="text-sm text-gray-500 mt-0.5">Scarica una copia completa di tutti i dati CRM</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-5 flex gap-3">
          <Shield size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-700">
            Il backup include tutti i lead, i moduli acquistati e le tranche upsell con tutte le impostazioni e i dati di pagamento.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={downloadJSON}
            disabled={loading}
            className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-forest-green hover:bg-emerald-50/30 transition-all text-left group"
          >
            <div className="bg-forest-green/10 text-forest-green p-2.5 rounded-lg group-hover:bg-forest-green group-hover:text-white transition-all">
              <FileJson size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">Backup completo JSON</div>
              <div className="text-xs text-gray-400">Tutti i dati (lead, moduli, tranches) — ripristinabile</div>
            </div>
            <Download size={16} className="text-gray-300 group-hover:text-forest-green transition-colors" />
          </button>

          <button
            onClick={downloadCSV}
            disabled={loading}
            className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-misty-teal hover:bg-teal-50/30 transition-all text-left group"
          >
            <div className="bg-misty-teal/10 text-misty-teal p-2.5 rounded-lg group-hover:bg-misty-teal group-hover:text-white transition-all">
              <FileText size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">Esporta lead CSV</div>
              <div className="text-xs text-gray-400">Solo lead — apribile in Excel/Fogli Google</div>
            </div>
            <Download size={16} className="text-gray-300 group-hover:text-misty-teal transition-colors" />
          </button>
        </div>

        {loading && (
          <p className="text-center text-sm text-gray-400 mt-4 animate-pulse">Recupero dati in corso...</p>
        )}
      </div>
    </div>
  );
}
