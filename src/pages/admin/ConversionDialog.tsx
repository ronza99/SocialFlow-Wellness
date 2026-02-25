import React from 'react';
import { AlertTriangle, Lock, X } from 'lucide-react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConversionDialog({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
          <AlertTriangle size={22} className="text-amber-600" />
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-2">Convertire questo cliente?</h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Sei sicuro? Da questo momento i prezzi dei moduli attuali vengono{' '}
          <strong>bloccati</strong> e non cambieranno anche se aggiorni il listino.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 flex items-start gap-2">
          <Lock size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            I prezzi dei moduli selezionati oggi verranno salvati e resteranno invariati per questo cliente, anche in futuro.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
          >
            Si, converti cliente
          </button>
        </div>
      </div>
    </div>
  );
}
