import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  LogOut, Search, Filter, TrendingUp, Users, Euro, Clock,
  ChevronRight, RefreshCw, UserPlus, Download
} from 'lucide-react';
import { QuoteRequest, LeadStatus, STATUS_LABELS, STATUS_COLORS } from './types';
import Logo from '../../components/Logo';
import NewLeadModal from './NewLeadModal';
import ExportBackup from './ExportBackup';

const STATUS_OPTIONS: { value: LeadStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'new', label: 'Nuovi' },
  { value: 'contacted', label: 'Contattati' },
  { value: 'converted', label: 'Convertiti' },
  { value: 'declined', label: 'Declinati' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showNewLead, setShowNewLead] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const fetchLeads = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('data_creazione', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.stato === filter;
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      !search ||
      lead.nome.toLowerCase().includes(searchTerm) ||
      lead.cognome.toLowerCase().includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm) ||
      lead.nome_centro.toLowerCase().includes(searchTerm) ||
      (lead.citta || '').toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.stato === 'new').length,
    converted: leads.filter(l => l.stato === 'converted').length,
    totalRevenue: leads
      .filter(l => l.stato === 'converted')
      .reduce((sum, l) => sum + (l.costo_totale || 0), 0),
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-sand flex items-center justify-center">
        <div className="text-gray-500">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-sand">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-gray-400 text-sm font-medium hidden sm:block">/ Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Esci</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Preventivi</h1>
            <p className="text-gray-500 text-sm mt-1">Gestisci e monitora tutte le richieste</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              title="Backup & Esportazione"
            >
              <Download size={15} />
              <span className="hidden sm:block">Backup</span>
            </button>
            <button
              onClick={() => setShowNewLead(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-green text-white text-sm font-medium hover:bg-forest-green/90 transition-colors shadow-sm"
            >
              <UserPlus size={15} />
              <span className="hidden sm:block">Nuovo cliente</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users size={20} />} label="Totale lead" value={stats.total} color="bg-blue-50 text-blue-600" />
          <StatCard icon={<Clock size={20} />} label="Da contattare" value={stats.new} color="bg-amber-50 text-amber-600" />
          <StatCard icon={<TrendingUp size={20} />} label="Convertiti" value={stats.converted} color="bg-emerald-50 text-emerald-600" />
          <StatCard
            icon={<Euro size={20} />}
            label="Ricavi totali"
            value={`€${stats.totalRevenue.toLocaleString('it-IT')}`}
            color="bg-sage-green/10 text-forest-green"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-wellness overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca per nome, email, centro..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400 flex-shrink-0" />
              <div className="flex gap-1 flex-wrap">
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filter === opt.value
                        ? 'bg-misty-teal text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                onClick={fetchLeads}
                disabled={refreshing}
                className="ml-1 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Aggiorna"
              >
                <RefreshCw size={15} className={`text-gray-500 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nessun lead trovato</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredLeads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => navigate(`/admin/lead/${lead.id}`)}
                  className="w-full text-left px-4 sm:px-6 py-4 hover:bg-warm-sand/50 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 text-sm">
                          {lead.nome} {lead.cognome}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.stato]}`}>
                          {STATUS_LABELS[lead.stato]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="truncate">{lead.nome_centro}</span>
                        {lead.citta && <span className="hidden sm:block">· {lead.citta}</span>}
                        <span className="hidden sm:block">· {lead.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-forest-green">
                          €{(lead.costo_totale || 0).toLocaleString('it-IT')}
                        </div>
                        <div className="text-xs text-gray-400">{formatDate(lead.data_creazione)}</div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-misty-teal transition-colors" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {showNewLead && (
        <NewLeadModal
          onClose={() => setShowNewLead(false)}
          onCreated={(id) => {
            setShowNewLead(false);
            navigate(`/admin/lead/${id}`);
          }}
        />
      )}

      {showExport && (
        <ExportBackup onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}

function StatCard({
  icon, label, value, color
}: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-wellness p-4 sm:p-5">
      <div className={`inline-flex p-2.5 rounded-xl mb-3 ${color}`}>
        {icon}
      </div>
      <div className="text-xl sm:text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}
