import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, RefreshCw, CreditCard, AlertTriangle, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export interface StripeSubscriptionData {
  subscription_id: string;
  status: string;
  current_period_end: number;
  amount: number | null;
  currency: string | null;
  interval: string | null;
  product_name: string | null;
  customer_id: string;
}

interface StripeCustomerOption {
  id: string;
  email: string;
  created: number;
}

interface Props {
  leadId: string;
  email: string;
  stripeCustomerId: string | null;
  stripeLastCheck: string | null;
  stripeLastCheckResult: string | null;
  stripeSubscriptionData: StripeSubscriptionData | null;
  onUpdate: (fields: {
    stripe_customer_id?: string;
    stripe_last_check?: string;
    stripe_last_check_result?: string;
    stripe_subscription_data?: StripeSubscriptionData | null;
  }) => void;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  active: { label: 'Attivo', color: 'text-emerald-700 bg-emerald-100', icon: <CheckCircle size={14} /> },
  trialing: { label: 'In prova', color: 'text-blue-700 bg-blue-100', icon: <Clock size={14} /> },
  past_due: { label: 'Pagamento scaduto', color: 'text-amber-700 bg-amber-100', icon: <AlertTriangle size={14} /> },
  canceled: { label: 'Cancellato', color: 'text-red-700 bg-red-100', icon: <XCircle size={14} /> },
  unpaid: { label: 'Non pagato', color: 'text-red-700 bg-red-100', icon: <XCircle size={14} /> },
  incomplete: { label: 'Incompleto', color: 'text-gray-600 bg-gray-100', icon: <AlertTriangle size={14} /> },
  incomplete_expired: { label: 'Scaduto', color: 'text-gray-500 bg-gray-100', icon: <XCircle size={14} /> },
  paused: { label: 'In pausa', color: 'text-gray-600 bg-gray-100', icon: <Clock size={14} /> },
  not_found: { label: 'Non trovato', color: 'text-gray-500 bg-gray-100', icon: <XCircle size={14} /> },
  multiple_found: { label: 'Multipli trovati', color: 'text-amber-700 bg-amber-100', icon: <AlertTriangle size={14} /> },
};

function formatEpoch(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatAmount(amount: number | null, currency: string | null, interval: string | null) {
  if (amount == null) return null;
  const formatted = (amount / 100).toLocaleString('it-IT', { style: 'currency', currency: currency?.toUpperCase() || 'EUR' });
  return interval ? `${formatted}/${interval === 'month' ? 'mese' : interval === 'year' ? 'anno' : interval}` : formatted;
}

export default function StripeSubscription({
  leadId, email, stripeCustomerId, stripeLastCheck, stripeLastCheckResult, stripeSubscriptionData, onUpdate
}: Props) {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [multipleCustomers, setMultipleCustomers] = useState<StripeCustomerOption[] | null>(null);
  const [editingCustomerId, setEditingCustomerId] = useState(false);
  const [customIdInput, setCustomIdInput] = useState(stripeCustomerId || '');
  const [savingCustomerId, setSavingCustomerId] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const runCheck = async (selectedCustomerId?: string) => {
    setChecking(true);
    setError(null);
    setMultipleCustomers(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const res = await fetch(`${supabaseUrl}/functions/v1/stripe-check-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || anonKey}`,
          'Apikey': anonKey,
        },
        body: JSON.stringify({
          lead_id: leadId,
          email,
          stripe_customer_id: stripeCustomerId,
          selected_customer_id: selectedCustomerId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore nella verifica Stripe');
        return;
      }

      if (data.result === 'multiple_found') {
        setMultipleCustomers(data.customers);
        return;
      }

      onUpdate({
        stripe_customer_id: data.customer_id || stripeCustomerId || undefined,
        stripe_last_check: new Date().toISOString(),
        stripe_last_check_result: data.result,
        stripe_subscription_data: data.subscription || null,
      });
    } catch (e) {
      setError('Errore di rete. Riprova.');
    } finally {
      setChecking(false);
    }
  };

  const handleSelectCustomer = (customerId: string) => {
    setMultipleCustomers(null);
    runCheck(customerId);
  };

  const handleSaveCustomerId = async () => {
    setSavingCustomerId(true);
    await supabase.from('quote_requests').update({ stripe_customer_id: customIdInput || null }).eq('id', leadId);
    onUpdate({ stripe_customer_id: customIdInput || undefined });
    setEditingCustomerId(false);
    setSavingCustomerId(false);
  };

  const statusConfig = stripeLastCheckResult ? (STATUS_CONFIG[stripeLastCheckResult] || STATUS_CONFIG['not_found']) : null;
  const sub = stripeSubscriptionData;

  return (
    <div className="bg-white rounded-2xl shadow-wellness p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-[#635BFF]" />
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Stripe – Abbonamento</h2>
        </div>
        <button
          onClick={() => runCheck()}
          disabled={checking}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl bg-[#635BFF]/10 hover:bg-[#635BFF]/20 text-[#635BFF] transition-colors disabled:opacity-60"
        >
          {checking ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
          {checking ? 'Verifica in corso...' : 'Verifica abbonamento'}
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
          <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {multipleCustomers && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm mb-2">
            <AlertTriangle size={14} />
            Trovati {multipleCustomers.length} profili Stripe con la stessa email
          </div>
          <p className="text-xs text-amber-600 mb-3">Seleziona il profilo corretto da associare a questo cliente:</p>
          <div className="space-y-2">
            {multipleCustomers.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectCustomer(c.id)}
                className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-colors"
              >
                <span className="text-xs font-mono text-gray-700">{c.id}</span>
                <span className="text-xs text-gray-400">Creato: {new Date(c.created * 1000).toLocaleDateString('it-IT')}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 w-28 flex-shrink-0">Stato abbonamento</span>
          {statusConfig ? (
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusConfig.color}`}>
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          ) : (
            <span className="text-xs text-gray-400 italic">Non verificato</span>
          )}
        </div>

        {sub && (
          <>
            {sub.product_name && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-28 flex-shrink-0">Piano</span>
                <span className="text-sm text-gray-700 font-medium">{sub.product_name}</span>
              </div>
            )}
            {sub.amount != null && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-28 flex-shrink-0">Importo</span>
                <span className="text-sm text-gray-700">{formatAmount(sub.amount, sub.currency, sub.interval)}</span>
              </div>
            )}
            {sub.current_period_end && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-28 flex-shrink-0">Prossimo rinnovo</span>
                <span className="text-sm text-gray-700">{formatEpoch(sub.current_period_end)}</span>
              </div>
            )}
            <button
              onClick={() => setShowDetails(v => !v)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors mt-1"
            >
              {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {showDetails ? 'Nascondi dettagli' : 'Mostra dettagli tecnici'}
            </button>
            {showDetails && (
              <div className="bg-gray-50 rounded-xl px-3 py-2 text-xs font-mono text-gray-500 space-y-1">
                <div>ID sub: {sub.subscription_id}</div>
                <div>Customer ID: {sub.customer_id}</div>
              </div>
            )}
          </>
        )}

        <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
          <span className="text-xs text-gray-400 w-28 flex-shrink-0">Ultimo controllo</span>
          {stripeLastCheck ? (
            <span className="text-xs text-gray-500">
              {new Date(stripeLastCheck).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
          ) : (
            <span className="text-xs text-gray-400 italic">Mai</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 w-28 flex-shrink-0">Stripe Customer ID</span>
          {editingCustomerId ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={customIdInput}
                onChange={e => setCustomIdInput(e.target.value)}
                placeholder="cus_..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-mono text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/30 focus:border-[#635BFF]"
              />
              <button
                onClick={handleSaveCustomerId}
                disabled={savingCustomerId}
                className="text-xs px-2.5 py-1.5 bg-[#635BFF]/10 hover:bg-[#635BFF]/20 text-[#635BFF] rounded-lg font-medium transition-colors disabled:opacity-60"
              >
                {savingCustomerId ? <Loader2 size={11} className="animate-spin" /> : 'Salva'}
              </button>
              <button
                onClick={() => { setEditingCustomerId(false); setCustomIdInput(stripeCustomerId || ''); }}
                className="text-xs px-2.5 py-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                Annulla
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono ${stripeCustomerId ? 'text-gray-600' : 'text-gray-400 italic'}`}>
                {stripeCustomerId || 'Non impostato'}
              </span>
              <button
                onClick={() => setEditingCustomerId(true)}
                className="text-xs text-[#635BFF] hover:underline"
              >
                {stripeCustomerId ? 'Modifica' : 'Imposta'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
