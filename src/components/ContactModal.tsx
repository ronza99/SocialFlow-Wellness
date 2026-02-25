import React, { useState, useEffect } from 'react';
import { X, Phone, CheckCircle, ArrowRight, ArrowLeft, User, MapPin, Building2, Calendar, Loader2, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import faviconImg from '../assets/favicon.png';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingData: {
    total: number;
    selectedMaintenancePlan?: string;
    selectedMainFlows?: string[];
    selectedExtraFlows?: string[];
    centerType?: 'single' | 'team';
    isCustomQuote?: boolean;
  };
  skipToClientInfo?: boolean;
}

interface ClientData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  businessName: string;
  city: string;
  businessType: string;
  currentClients: string;
  mainChallenges: string[];
  preferredContact: string;
  timeframe: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, pricingData, skipToClientInfo = false }) => {
  const [currentStep, setCurrentStep] = useState(skipToClientInfo ? 2 : 2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedMaintenancePlan, setSelectedMaintenancePlan] = useState<string>(pricingData.selectedMaintenancePlan || '');

  useEffect(() => {
    if (pricingData.selectedMaintenancePlan) {
      setSelectedMaintenancePlan(pricingData.selectedMaintenancePlan);
    }
  }, [pricingData.selectedMaintenancePlan]);

  const flowNames = {
    bookings: 'Prenotazioni in chat',
    subscriptions: 'Abbonamenti ricorrenti',
    cosmetics: 'Vendita cosmetici in chat',
    'ai-assistant': 'Segretaria AI in chat',
    'gift-cards': 'Card & Gift Card digitali (con coupon)',
    packages: 'Pacchetti di sedute',
    whatsapp: 'Promemoria e follow-up su WhatsApp'
  };

  const flowPrices: Record<string, { single: number; team: number } | number> = {
    bookings: { single: 490, team: 540 },
    subscriptions: { single: 440, team: 490 },
    cosmetics: { single: 440, team: 490 },
    'ai-assistant': 260,
    'gift-cards': 260,
    packages: 220,
    whatsapp: 220
  };

  const maintenancePlans = {
    'piano manutenzione tecnica': { name: 'Piano Manutenzione tecnica', price: 59, description: 'Interventi tecnici e piccoli aggiustamenti' },
    'piano crescita dm': { name: 'Piano Crescita DM', price: 129, description: 'Include manutenzione tecnica + fino a 3 ore/mese per miglioramenti e 1 chiamata strategica ogni 2 mesi' },
    'none': { name: 'Ora non mi serve nessun piano', price: 0, description: 'Richiederò interventi solo quando necessario (60 €/ora)' }
  };

  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
    businessType: '',
    currentClients: '',
    mainChallenges: [],
    preferredContact: 'email',
    timeframe: ''
  });

  const businessTypes = [
    'Centro Massaggi',
    'Centro Estetico',
    'SPA & Wellness',
    'Fisioterapia',
    'Centro Olistico',
    'Parrucchiere/Barbiere',
    'Centro Fitness',
    'Studio Privato',
    'Altro'
  ];

  const challengeOptions = [
    'Troppi no-show',
    'Difficoltà a gestire prenotazioni',
    'Pochi nuovi clienti',
    'Gestione pagamenti complicata',
    'Troppo tempo al telefono',
    'Clienti che non tornano',
    'Concorrenza agguerrita',
    'Difficoltà con i social media',
    'Clienti internazionali/turisti'
  ];

  const timeframes = [
    'Il prima possibile',
    'Entro 1 mese',
    'Entro 3 mesi',
    'Entro 6 mesi',
    'Sto solo valutando'
  ];

  const handleChallengeToggle = (challenge: string) => {
    setClientData(prev => ({
      ...prev,
      mainChallenges: prev.mainChallenges.includes(challenge)
        ? prev.mainChallenges.filter(c => c !== challenge)
        : [...prev.mainChallenges, challenge]
    }));
  };

  const isStep2Valid = () => {
    return clientData.name.trim() !== '' &&
           clientData.surname.trim() !== '' &&
           clientData.email.trim() !== '' &&
           clientData.email.includes('@') &&
           clientData.phone.trim() !== '' &&
           clientData.businessName.trim() !== '';
  };

  const validateClientData = () => {
    if (!clientData.name.trim()) {
      return 'Il nome è obbligatorio';
    }
    if (!clientData.surname.trim()) {
      return 'Il cognome è obbligatorio';
    }
    if (!clientData.email.trim()) {
      return 'L\'email è obbligatoria';
    }
    if (!clientData.email.includes('@')) {
      return 'Inserisci un\'email valida (deve contenere @)';
    }
    if (!clientData.phone.trim()) {
      return 'Il numero di telefono è obbligatorio';
    }
    if (!clientData.businessName.trim()) {
      return 'Il nome del centro è obbligatorio';
    }
    return null;
  };

  const calculateMainFlowsCost = () => {
    if (!pricingData.selectedMainFlows || pricingData.selectedMainFlows.length === 0) return 0;

    if (pricingData.selectedMainFlows.length === 3) {
      return pricingData.centerType === 'single' ? 1200 : 1350;
    }

    let total = 0;
    pricingData.selectedMainFlows.forEach(flowId => {
      const price = flowPrices[flowId];
      if (typeof price === 'object') {
        total += pricingData.centerType === 'single' ? price.single : price.team;
      }
    });
    return total;
  };

  const calculateExtraFlowsCost = () => {
    if (!pricingData.selectedExtraFlows || pricingData.selectedExtraFlows.length === 0) return 0;

    let total = 0;
    pricingData.selectedExtraFlows.forEach(flowId => {
      const price = flowPrices[flowId];
      if (typeof price === 'number') {
        total += price;
      }
    });
    return total;
  };

  const handleSubmitQuote = async () => {
    const validationError = validateClientData();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const duaOreIndietro = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

      const { data: preventiviRecenti, error: checkError } = await supabase
        .from('quote_requests')
        .select('id, data_creazione')
        .eq('email', clientData.email)
        .gte('data_creazione', duaOreIndietro)
        .order('data_creazione', { ascending: false })
        .limit(1);

      if (checkError) throw checkError;

      if (preventiviRecenti && preventiviRecenti.length > 0) {
        setSubmitError('Hai già inviato una richiesta di preventivo nelle ultime 2 ore. Controlla la tua email o riprova più tardi.');
        setIsSubmitting(false);
        return;
      }

      const mainFlowsWithNames = (pricingData.selectedMainFlows || []).map(flowId => ({
        id: flowId,
        name: flowNames[flowId as keyof typeof flowNames]
      }));

      const extraFlowsWithNames = (pricingData.selectedExtraFlows || []).map(flowId => ({
        id: flowId,
        name: flowNames[flowId as keyof typeof flowNames]
      }));

      const finalMaintenancePlan = selectedMaintenancePlan || pricingData.selectedMaintenancePlan || '';
      const selectedPlan = finalMaintenancePlan
        ? maintenancePlans[finalMaintenancePlan.toLowerCase() as keyof typeof maintenancePlans]
        : null;

      const mainFlowsCost = calculateMainFlowsCost();
      const extraFlowsCost = calculateExtraFlowsCost();
      const totalSetupCost = pricingData.isCustomQuote ? 1 : (mainFlowsCost + extraFlowsCost);

      const allFlows = [
        ...mainFlowsWithNames.map(f => f.name),
        ...extraFlowsWithNames.map(f => f.name)
      ].join('  |  ');

      const documentoCompleto = pricingData.isCustomQuote
        ? `${clientData.name} ${clientData.surname} - ${clientData.businessName}
${clientData.email} - ${clientData.phone}

PREVENTIVO SU MISURA
Centro strutturato (5+ operatori)`
        : `${clientData.name} ${clientData.surname} - ${clientData.businessName}
${clientData.email} - ${clientData.phone}

FLUSSI SELEZIONATI:
${allFlows}

${selectedPlan ? `PIANO MANUTENZIONE: ${selectedPlan.name}

` : ''}PREZZO TOTALE SETUP: €${totalSetupCost}`;

      const { error } = await supabase.from('quote_requests').insert({
        nome: clientData.name,
        cognome: clientData.surname,
        email: clientData.email,
        telefono: clientData.phone,
        nome_centro: clientData.businessName,
        citta: clientData.city,
        tipo_attivita: clientData.businessType,
        clienti_attuali: clientData.currentClients,
        sfide_principali: clientData.mainChallenges.join('  |  '),
        contatto_preferito: clientData.preferredContact,
        tempistiche: clientData.timeframe,
        tipo_centro: pricingData.centerType || null,
        flussi_principali: mainFlowsWithNames,
        flussi_extra: extraFlowsWithNames,
        piano_manutenzione: selectedPlan?.name || 'Da definire',
        core_flows: mainFlowsWithNames.map(f => f.name).join('  |  '),
        extra_flows: extraFlowsWithNames.map(f => f.name).join('  |  '),
        maintenance_service: !!selectedPlan && selectedPlan.name !== 'Interventi singoli senza abbonamento',
        costo_totale: totalSetupCost,
        stato: 'new',
        note: documentoCompleto
      });

      if (error) throw error;

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        await fetch(`${supabaseUrl}/functions/v1/send-quote-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: clientData.name,
            cognome: clientData.surname,
            email: clientData.email,
            telefono: clientData.phone,
            nome_centro: clientData.businessName,
            citta: clientData.city,
            tipo_attivita: clientData.businessType,
            clienti_attuali: clientData.currentClients,
            sfide_principali: clientData.mainChallenges.join('  |  '),
            contatto_preferito: clientData.preferredContact,
            tempistiche: clientData.timeframe,
            tipo_centro: pricingData.centerType || null,
            core_flows: mainFlowsWithNames.map(f => f.name).join('  |  '),
            extra_flows: extraFlowsWithNames.map(f => f.name).join('  |  '),
            piano_manutenzione: selectedPlan?.name || 'Da definire',
            costo_totale: totalSetupCost,
            is_custom_quote: pricingData.isCustomQuote || false,
          }),
        });
      } catch (_emailError) {
      }

      setCurrentStep(3);
    } catch (error: any) {
      console.error('Error submitting quote:', error);

      let errorMessage = 'Si è verificato un errore. Riprova o contattaci direttamente.';

      if (error?.message?.includes('email')) {
        errorMessage = 'Email non valida. Assicurati che contenga il simbolo @';
      } else if (error?.message?.includes('telefono') || error?.message?.includes('phone')) {
        errorMessage = 'Numero di telefono non valido';
      } else if (error?.message?.includes('nome') || error?.message?.includes('name')) {
        errorMessage = 'Nome o cognome non valido';
      } else if (error?.message?.includes('costo') || error?.message?.includes('cost')) {
        errorMessage = 'Errore nel calcolo del preventivo. Riprova';
      }

      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-wellness shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative">
        <div className="bg-gradient-to-r from-sage-green-dark to-misty-teal-dark p-6 text-white rounded-t-wellness sticky top-0 z-10 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg p-2 shadow-md flex-shrink-0">
                <img
                  src={faviconImg}
                  alt="SocialFlow Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <h2 className="text-2xl font-serif font-bold">
                {currentStep === 2 ? '👤 I Tuoi Dati' : '✅ Richiesta Inviata'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all hover:scale-110 flex-shrink-0"
              aria-label="Chiudi"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {currentStep === 2 && (
            <div>
              <div className="md:hidden mb-6 animate-fade-in">
                <div className="bg-gradient-to-br from-sage-green/20 to-misty-teal/20 rounded-wellness p-5 text-center border-2 border-sage-green shadow-lg animate-breathe">
                  <div className="flex items-center justify-center gap-3">
                    <div className="bg-white rounded-full p-2 shadow-md animate-pulse">
                      <ChevronDown className="w-6 h-6 text-sage-green" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-gray-900 font-bold text-lg mb-1">
                        Scorri in basso per inserire i tuoi dati
                      </p>
                      <p className="text-gray-700 text-sm">
                        Compila il form e ricevi il preventivo
                      </p>
                    </div>
                    <div className="animate-bounce">
                      <ChevronDown className="w-8 h-8 text-sage-green" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-sage-green/10 rounded-lg p-2 mr-3">
                    <CheckCircle className="w-7 h-7 text-sage-green" />
                  </span>
                  Riepilogo configurazione
                </h3>
                {pricingData.isCustomQuote ? (
                  <div className="bg-gradient-to-br from-mocha-mousse to-mocha-mousse-dark rounded-wellness p-8 mb-6 text-white text-center shadow-lg border-2 border-mocha-mousse-dark/20">
                    <Building2 className="w-16 h-16 mx-auto mb-4 opacity-90" />
                    <h4 className="text-2xl font-bold mb-3">Preventivo su Misura</h4>
                    <p className="text-lg leading-relaxed">
                      Hai scelto un preventivo personalizzato per centro strutturato (5+ operatori).
                    </p>
                    <p className="text-base mt-3 opacity-90">
                      Ti invierò una proposta dedicata in base alle tue esigenze specifiche.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-warm-sand to-soft-apricot rounded-wellness p-8 mb-6 shadow-lg border border-sage-green/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white rounded-wellness p-5 shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center text-lg">
                          <Building2 className="w-5 h-5 mr-2 text-sage-green" />
                          Tipo Centro
                        </h4>
                        <p className="text-gray-700 text-lg">
                          {pricingData.centerType === 'single' ? '🏠 Studio Singolo (1 operatore)' : '👥 Piccolo team (2-4 operatori)'}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-sage-green to-sage-green-dark rounded-wellness p-5 shadow-md text-white">
                        <h4 className="font-bold mb-3 flex items-center text-lg">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Investimento Setup
                        </h4>
                        <p className="text-4xl font-bold">€{pricingData.total}</p>
                        <p className="text-sm mt-2 opacity-90">Pagamento unico</p>
                      </div>
                    </div>
                    {pricingData.selectedMainFlows && pricingData.selectedMainFlows.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                          <span className="bg-sage-green/20 rounded-lg p-1.5 mr-2">
                            <CheckCircle className="w-5 h-5 text-sage-green" />
                          </span>
                          Flussi Principali
                        </h4>
                        <div className="bg-white rounded-wellness p-4 shadow-sm">
                          <ul className="space-y-3">
                            {pricingData.selectedMainFlows.map(flowId => (
                              <li key={flowId} className="text-gray-700 flex items-start group">
                                <CheckCircle className="w-5 h-5 text-sage-green mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="text-base">{flowNames[flowId as keyof typeof flowNames]}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {pricingData.selectedExtraFlows && pricingData.selectedExtraFlows.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                          <span className="bg-misty-teal/20 rounded-lg p-1.5 mr-2">
                            <CheckCircle className="w-5 h-5 text-misty-teal" />
                          </span>
                          Flussi Extra
                        </h4>
                        <div className="bg-white rounded-wellness p-4 shadow-sm">
                          <ul className="space-y-3">
                            {pricingData.selectedExtraFlows.map(flowId => (
                              <li key={flowId} className="text-gray-700 flex items-start group">
                                <CheckCircle className="w-5 h-5 text-misty-teal mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="text-base">{flowNames[flowId as keyof typeof flowNames]}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {(pricingData.selectedMaintenancePlan || selectedMaintenancePlan) && (
                      <div className="mt-6 pt-6 border-t-2 border-white/50">
                        <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                          <span className="bg-purple-500/20 rounded-lg p-1.5 mr-2">
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          </span>
                          Piano di Manutenzione
                        </h4>
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-wellness p-5 border-2 border-purple-200/50 shadow-sm">
                          <p className="text-gray-900 font-bold text-lg flex items-center mb-2">
                            <CheckCircle className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" />
                            {maintenancePlans[(selectedMaintenancePlan || pricingData.selectedMaintenancePlan || '').toLowerCase() as keyof typeof maintenancePlans]?.name || selectedMaintenancePlan || pricingData.selectedMaintenancePlan}
                          </p>
                          <p className="text-gray-700 text-base ml-7 leading-relaxed">
                            {maintenancePlans[(selectedMaintenancePlan || pricingData.selectedMaintenancePlan || '').toLowerCase() as keyof typeof maintenancePlans]?.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="border-t-2 border-gray-200 pt-8 mt-8">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-misty-teal/10 rounded-lg p-2 mr-3">
                    <User className="w-7 h-7 text-misty-teal" />
                  </span>
                  Inserisci i tuoi dati
                </h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={clientData.name}
                        onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-wellness border border-gray-300 focus:ring-2 focus:ring-sage-green focus:border-transparent"
                        placeholder="Mario"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cognome *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={clientData.surname}
                        onChange={(e) => setClientData({ ...clientData, surname: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-wellness border border-gray-300 focus:ring-2 focus:ring-sage-green focus:border-transparent"
                        placeholder="Rossi"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={clientData.email}
                      onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-wellness border focus:ring-2 focus:ring-sage-green focus:border-transparent ${
                        clientData.email && !clientData.email.includes('@')
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="mario@esempio.it"
                    />
                    {clientData.email && !clientData.email.includes('@') && (
                      <p className="text-red-600 text-xs mt-1">L'email deve contenere il simbolo @</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefono *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={clientData.phone}
                        onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-wellness border border-gray-300 focus:ring-2 focus:ring-sage-green focus:border-transparent"
                        placeholder="+39 123 456 7890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Centro *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={clientData.businessName}
                        onChange={(e) => setClientData({ ...clientData, businessName: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-wellness border border-gray-300 focus:ring-2 focus:ring-sage-green focus:border-transparent"
                        placeholder="Centro Benessere Armonia"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Città
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={clientData.city}
                        onChange={(e) => setClientData({ ...clientData, city: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-wellness border border-gray-300 focus:ring-2 focus:ring-sage-green focus:border-transparent"
                        placeholder="Milano"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo di Attività
                    </label>
                    <select
                      value={clientData.businessType}
                      onChange={(e) => setClientData({ ...clientData, businessType: e.target.value })}
                      className="w-full px-4 py-3 rounded-wellness border border-gray-300 focus:ring-2 focus:ring-sage-green focus:border-transparent"
                    >
                      <option value="">Seleziona...</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clienti Attuali al Mese
                    </label>
                    <select
                      value={clientData.currentClients}
                      onChange={(e) => setClientData({ ...clientData, currentClients: e.target.value })}
                      className="w-full px-4 py-3 rounded-wellness border border-gray-300 focus:ring-2 focus:ring-sage-green focus:border-transparent"
                    >
                      <option value="">Seleziona...</option>
                      <option value="0-50">0-50</option>
                      <option value="50-100">50-100</option>
                      <option value="100-200">100-200</option>
                      <option value="200+">200+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quando Vorresti Iniziare
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={clientData.timeframe}
                        onChange={(e) => setClientData({ ...clientData, timeframe: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-wellness border border-gray-300 focus:ring-2 focus:ring-sage-green focus:border-transparent appearance-none"
                      >
                        <option value="">Seleziona...</option>
                        {timeframes.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quali sono le tue principali sfide? (opzionale)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challengeOptions.map(challenge => (
                      <button
                        key={challenge}
                        type="button"
                        onClick={() => handleChallengeToggle(challenge)}
                        className={`px-4 py-3 rounded-wellness border-2 text-left transition-all ${
                          clientData.mainChallenges.includes(challenge)
                            ? 'border-sage-green bg-sage-green/5 text-sage-green-dark font-medium'
                            : 'border-gray-300 text-gray-700 hover:border-sage-green/50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            clientData.mainChallenges.includes(challenge)
                              ? 'border-sage-green bg-sage-green'
                              : 'border-gray-400'
                          }`}>
                            {clientData.mainChallenges.includes(challenge) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          {challenge}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Come Preferisci Essere Contattato?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['email', 'phone', 'whatsapp'].map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setClientData({ ...clientData, preferredContact: method })}
                        className={`px-6 py-3 rounded-wellness font-medium transition-all ${
                          clientData.preferredContact === method
                            ? 'bg-sage-green text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {method === 'email' ? 'Email' : method === 'phone' ? 'Telefono' : 'WhatsApp'}
                      </button>
                    ))}
                  </div>
                </div>

                {!pricingData.isCustomQuote && (
                  <div className="border-t-2 border-gray-200 pt-6 mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Piano di Manutenzione (opzionale)
                    </label>
                    <p className="text-sm text-gray-600 mb-4">
                      Dopo il primo mese di assistenza inclusa, puoi scegliere un piano di manutenzione o richiedere interventi spot quando necessario.
                    </p>
                    <div className="space-y-4">
                      {Object.entries(maintenancePlans).map(([key, plan]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedMaintenancePlan(selectedMaintenancePlan === key ? '' : key)}
                          className={`w-full px-6 py-4 rounded-wellness border-2 text-left transition-all ${
                            selectedMaintenancePlan === key
                              ? 'border-sage-green bg-sage-green/5'
                              : 'border-gray-300 hover:border-sage-green/50'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`w-6 h-6 rounded border-2 mr-4 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              selectedMaintenancePlan === key
                                ? 'border-sage-green bg-sage-green'
                                : 'border-gray-400'
                            }`}>
                              {selectedMaintenancePlan === key && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-gray-900">{plan.name}</h4>
                                {plan.price > 0 && (
                                  <span className="text-sage-green font-bold">€{plan.price}/mese</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{plan.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {submitError && (
                <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 text-red-800 px-6 py-4 rounded-wellness flex items-start shadow-lg animate-fade-in">
                  <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold text-lg">⚠️ Errore durante l'invio</p>
                    <p className="mt-2 text-base">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-8 pt-6 border-t-2 border-gray-200">
                <button
                  onClick={handleSubmitQuote}
                  disabled={!isStep2Valid() || isSubmitting}
                  className={`px-10 py-5 rounded-wellness font-bold text-xl transition-all flex items-center shadow-lg ${
                    !isStep2Valid() || isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-sage-green via-misty-teal to-sage-green-dark text-white hover:shadow-2xl hover:scale-105 animate-pulse-subtle'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <Phone className="w-6 h-6 mr-3" />
                      Invia Richiesta Preventivo
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Richiesta Inviata con Successo!
              </h3>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Grazie per l'interesse! Riceverai la mia risposta {
                  clientData.preferredContact === 'email'
                    ? 'via email'
                    : clientData.preferredContact === 'whatsapp'
                    ? 'su WhatsApp'
                    : 'via telefono'
                } entro 24 ore.
              </p>
              <div className="bg-warm-sand rounded-wellness p-6 max-w-2xl mx-auto mb-8">
                <h4 className="font-bold text-gray-900 mb-3">Prossimi passi:</h4>
                <ol className="text-left space-y-2 text-gray-700">
                  <li>1. {
                    clientData.preferredContact === 'email'
                      ? 'Riceverai un\'email con la mia proposta dettagliata'
                      : clientData.preferredContact === 'whatsapp'
                      ? 'Ti contatterò su WhatsApp con la mia proposta dettagliata'
                      : 'Ti chiamerò per discutere la mia proposta dettagliata'
                  }</li>
                  <li>2. Fisseremo una chiamata conoscitiva per parlare del tuo progetto</li>
                  <li>3. Se ti convince, procederemo con il setup</li>
                </ol>
              </div>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-sage-green to-misty-teal text-white font-bold px-8 py-4 rounded-wellness hover:from-sage-green-dark hover:to-misty-teal-dark transition-all shadow-wellness"
              >
                Chiudi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
