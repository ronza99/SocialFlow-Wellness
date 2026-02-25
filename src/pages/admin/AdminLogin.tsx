import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Credenziali non valide. Riprova.');
      setLoading(false);
      return;
    }

    const role = data.user?.app_metadata?.role;
    if (role !== 'admin') {
      await supabase.auth.signOut();
      setError('Accesso negato. Solo gli amministratori possono accedere.');
      setLoading(false);
      return;
    }

    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-warm-sand flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-wellness-lg p-8">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Pannello Admin</h1>
          <p className="text-gray-500 text-center text-sm mb-8">Accedi per gestire i preventivi</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal text-gray-800 text-sm transition-all"
                placeholder="admin@esempio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-misty-teal/30 focus:border-misty-teal text-gray-800 text-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-misty-teal hover:bg-misty-teal-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
