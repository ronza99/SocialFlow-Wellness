import React, { useState } from 'react';
import { Calculator, Users, Building, Home, Shield, MessageSquare, Gift, Sparkles, CheckCircle, Star, Crown, Phone, Mail, Zap } from 'lucide-react';
import ContactModal from './ContactModal';
import Logo from './Logo';
import { PricingData } from '../App';

interface PricingCalculatorProps {
  currentPricingData: PricingData;
  setCurrentPricingData: (data: PricingData) => void;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  currentPricingData,
  setCurrentPricingData
}) => {
  const [selectedCenterType, setSelectedCenterType] = useState<'single' | 'team'>('single');
  const [selectedMainFlows, setSelectedMainFlows] = useState<string[]>([]);
  const [selectedExtraFlows, setSelectedExtraFlows] = useState<string[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [skipToClientInfo, setSkipToClientInfo] = useState(false);
  const [selectedMaintenancePlan, setSelectedMaintenancePlan] = useState<string>('');

  const mainFlows = {
    single: {
      bookings: { name: 'Prenotazioni in chat', price: 490 },
      subscriptions: { name: 'Abbonamenti ricorrenti', price: 440 },
      cosmetics: { name: 'Vendita cosmetici in chat', price: 440 }
    },
    team: {
      bookings: { name: 'Prenotazioni in chat', price: 540 },
      subscriptions: { name: 'Abbonamenti ricorrenti', price: 490 },
      cosmetics: { name: 'Vendita cosmetici in chat', price: 490 }
    }
  };

  const extraFlows = [
    {
      id: 'ai-assistant',
      name: 'Segretaria AI in chat',
      price: 260,
      description: 'Un\'assistente virtuale che risponde alle domande frequenti su:<br><br>• trattamenti, durata, prezzi e differenze<br>• pacchetti, card e abbonamenti<br>• dubbi pratici e regole del centro<br><br>Indirizza il cliente verso il flusso giusto.',
      highlight: 'Non crea o modifica appuntamenti: informa e guida.'
    },
    {
      id: 'gift-cards',
      name: 'Card & Gift Card digitali (con coupon)',
      price: 260,
      description: 'Modulo per vendere trattamenti prepagati (con o senza sconto), senza legarli a una data precisa.',
      features: [
        '<strong>Card trattamento</strong>: legata al tipo di trattamento (non al giorno)',
        '<strong>Gift Card</strong>: un cliente la acquista come regalo per una persona cara; chi la riceve scrive in chat e prenota mostrando codice/QR',
        '<strong>Coupon</strong>: sconto fisso in € collegato a card/gift'
      ],
      advantages: [
        '<strong>libertà di spostare</strong> senza storni immediati',
        'se annulla, il trattamento <strong>resta prepagato</strong> e lo usa più avanti',
        'utile per <strong>promozioni in periodi calmi</strong> senza caos'
      ],
      note: 'Con WhatsApp attivo, i coupon aiutano anche a <strong>riattivare clienti inattivi</strong>.',
      closure: 'Ogni card/gift/coupon ha un <strong>codice o QR</strong> e un <strong>registro per controllare utilizzi e validità</strong>.'
    },
    {
      id: 'packages',
      name: 'Pacchetti di sedute',
      price: 220,
      description: 'Gestione pacchetti personalizzabili (es. 5 / 10 sedute) in un periodo definito. Il sistema tiene il conto delle sedute usate e di quelle rimanenti, così sai sempre a che punto è il cliente.',
      highlight: 'Serve per dare continuità al percorso e semplificare il pagamento anticipato.'
    },
    {
      id: 'whatsapp',
      name: 'Promemoria e follow-up su WhatsApp',
      price: 220,
      description: 'Setup dei messaggi automatici su WhatsApp (solo per clienti che danno consenso), legati ai tuoi trattamenti.',
      features: [
        'Promemoria appuntamento il giorno prima (riduce dimenticanze e buchi)',
        'Richiamo soft clienti fermi da tempo (senza essere invadenti)',
        'Follow-up percorso: messaggi dedicati se il cliente si è fermato'
      ],
      note: 'I messaggi vengono impostati in modo conforme alle regole di WhatsApp. Quando necessario, si usano modelli approvati per evitare blocchi o limitazioni dell\'account.'
    }
  ];

  const maintenancePlans = [
    {
      id: 'technical',
      name: 'Piano Manutenzione tecnica',
      price: 59,
      features: [
        '<strong>Interventi su problemi tecnici</strong> (collegamenti, aggiornamenti necessari, modifiche richieste dalle piattaforme)',
        '<strong>Piccoli aggiustamenti al sistema esistente</strong> (messaggi, pulsanti, condizioni semplici)',
        '<strong>Verifica periodica</strong> che prenotazioni e messaggi stiano funzionando correttamente'
      ],
      note: 'Se emerge un problema, mi scrivi e concordiamo tempi e intervento.',
      icon: Shield,
      color: 'bg-blue-500'
    },
    {
      id: 'growth',
      name: 'Piano Crescita DM',
      price: 129,
      description: 'Include tutto ciò che c\'è nel Piano Manutenzione tecnica, in più:',
      features: [
        '<strong>Fino a 3 ore/mese</strong> per miglioramenti (piccole automazioni, ottimizzazioni dei flussi, promo in chat, aggiornamenti logiche)',
        '<strong>1 call strategica</strong> ogni 2 mesi'
      ],
      highlight: 'Per chi vuole ottimizzare la chat come canale di prenotazione e riattivazione clienti.',
      icon: Star,
      color: 'bg-purple-500',
      popular: true
    }
  ];

  const calculateMainFlowsTotal = () => {
    const flows = mainFlows[selectedCenterType];
    let total = 0;
    
    selectedMainFlows.forEach(flowId => {
      if (flowId === 'bookings') total += flows.bookings.price;
      if (flowId === 'subscriptions') total += flows.subscriptions.price;
      if (flowId === 'cosmetics') total += flows.cosmetics.price;
    });

    // Sconto se tutti e 3 i flussi sono selezionati
    if (selectedMainFlows.length === 3) {
      return selectedCenterType === 'single' ? 1200 : 1350;
    }

    return total;
  };

  const calculateExtraFlowsTotal = () => {
    return selectedExtraFlows.reduce((total, flowId) => {
      const flow = extraFlows.find(f => f.id === flowId);
      return total + (flow ? flow.price : 0);
    }, 0);
  };

  const calculateGrandTotal = () => {
    return calculateMainFlowsTotal() + calculateExtraFlowsTotal();
  };

  const handleMainFlowToggle = (flowId: string) => {
    const newFlows = selectedMainFlows.includes(flowId)
      ? selectedMainFlows.filter(id => id !== flowId)
      : [...selectedMainFlows, flowId];

    setSelectedMainFlows(newFlows);

    // Calcola il nuovo totale con i flussi aggiornati
    const flows = mainFlows[selectedCenterType];
    let mainTotal = 0;

    newFlows.forEach(fId => {
      if (fId === 'bookings') mainTotal += flows.bookings.price;
      if (fId === 'subscriptions') mainTotal += flows.subscriptions.price;
      if (fId === 'cosmetics') mainTotal += flows.cosmetics.price;
    });

    // Sconto se tutti e 3 i flussi sono selezionati
    if (newFlows.length === 3) {
      mainTotal = selectedCenterType === 'single' ? 1200 : 1350;
    }

    const extraTotal = selectedExtraFlows.reduce((total, fId) => {
      const flow = extraFlows.find(f => f.id === fId);
      return total + (flow ? flow.price : 0);
    }, 0);

    const grandTotal = mainTotal + extraTotal;

    // Aggiorna anche lo stato globale con il totale calcolato
    setCurrentPricingData(prev => ({
      ...prev,
      selectedMainFlows: newFlows,
      total: grandTotal
    }));

    // Nascondi il messaggio di errore quando l'utente seleziona un flusso
    if (showError) {
      setShowError(false);
    }
  };

  const handleExtraFlowToggle = (flowId: string) => {
    const newFlows = selectedExtraFlows.includes(flowId)
      ? selectedExtraFlows.filter(id => id !== flowId)
      : [...selectedExtraFlows, flowId];

    setSelectedExtraFlows(newFlows);

    // Calcola il nuovo totale con i flussi extra aggiornati
    const flows = mainFlows[selectedCenterType];
    let mainTotal = 0;

    selectedMainFlows.forEach(fId => {
      if (fId === 'bookings') mainTotal += flows.bookings.price;
      if (fId === 'subscriptions') mainTotal += flows.subscriptions.price;
      if (fId === 'cosmetics') mainTotal += flows.cosmetics.price;
    });

    // Sconto se tutti e 3 i flussi principali sono selezionati
    if (selectedMainFlows.length === 3) {
      mainTotal = selectedCenterType === 'single' ? 1200 : 1350;
    }

    const extraTotal = newFlows.reduce((total, fId) => {
      const flow = extraFlows.find(f => f.id === fId);
      return total + (flow ? flow.price : 0);
    }, 0);

    const grandTotal = mainTotal + extraTotal;

    // Aggiorna anche lo stato globale con il totale calcolato
    setCurrentPricingData(prev => ({
      ...prev,
      selectedExtraFlows: newFlows,
      total: grandTotal
    }));
  };

  const handleCenterTypeChange = (type: 'single' | 'team') => {
    setSelectedCenterType(type);

    // Calcola il nuovo totale con il tipo di centro aggiornato
    const flows = mainFlows[type];
    let mainTotal = 0;

    selectedMainFlows.forEach(fId => {
      if (fId === 'bookings') mainTotal += flows.bookings.price;
      if (fId === 'subscriptions') mainTotal += flows.subscriptions.price;
      if (fId === 'cosmetics') mainTotal += flows.cosmetics.price;
    });

    // Sconto se tutti e 3 i flussi sono selezionati
    if (selectedMainFlows.length === 3) {
      mainTotal = type === 'single' ? 1200 : 1350;
    }

    const extraTotal = selectedExtraFlows.reduce((total, fId) => {
      const flow = extraFlows.find(f => f.id === fId);
      return total + (flow ? flow.price : 0);
    }, 0);

    const grandTotal = mainTotal + extraTotal;

    // Aggiorna anche lo stato globale con il totale calcolato
    setCurrentPricingData(prev => ({
      ...prev,
      centerType: type,
      total: grandTotal
    }));
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMaintenanceClick = (planName?: string) => {
    // Verifica che ci siano flussi principali selezionati
    if (!currentPricingData.selectedMainFlows || currentPricingData.selectedMainFlows.length === 0) {
      // Se non ci sono flussi selezionati, scrolla al pricing calculator
      scrollToPricing();
      return;
    }

    // Se viene passato un piano specifico, aggiorna i dati del pricing
    if (planName) {
      setSelectedMaintenancePlan(planName);
    }
    setShowContactModal(true);
  };

  const handleContactClick = () => {
    // Verifica che almeno un flusso principale sia selezionato
    if (selectedMainFlows.length === 0) {
      setShowError(true);
      // Scroll al passo 2 (flussi principali)
      const step2Element = document.getElementById('step-2');
      if (step2Element) {
        step2Element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Nascondi il messaggio di errore dopo 5 secondi
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    // Aggiorna i dati del pricing con la selezione corrente
    const newPricingData: PricingData = {
      treatments: 5,
      products: 5,
      extraOperators: 0,
      smsFollowUp: false,
      detailedFaq: 0,
      multilingualEnglish: false,
      total: calculateGrandTotal(),
      selectedMainFlows: selectedMainFlows,
      selectedExtraFlows: selectedExtraFlows,
      centerType: selectedCenterType
    };
    setCurrentPricingData(newPricingData);
    setShowContactModal(true);
  };

  const progressSteps = [
    { number: 1, title: 'Tipo di centro', completed: selectedCenterType !== null },
    { number: 2, title: 'Flussi principali', completed: selectedMainFlows.length > 0 },
    { number: 3, title: 'Flussi extra', completed: true },
    { number: 4, title: 'Riepilogo', completed: calculateGrandTotal() > 0 }
  ];

  return (
    <>
      <section id="pricing-calculator" className="py-24 bg-warm-sand relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-gray-900 mb-6">
              Componi il tuo sistema
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto font-light mb-8">
              Segui i 4 passaggi per costruire il sistema perfetto per il tuo centro
            </p>

            {/* Progress Indicator */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex justify-between items-center">
                {progressSteps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${
                        step.completed
                          ? 'bg-sage-green text-white shadow-organic'
                          : 'bg-white text-gray-400 border-2 border-gray-300'
                      }`}>
                        {step.completed ? <CheckCircle className="w-6 h-6" /> : step.number}
                      </div>
                      <p className={`text-xs sm:text-sm font-medium text-center ${
                        step.completed ? 'text-sage-green-dark' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < progressSteps.length - 1 && (
                      <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                        step.completed ? 'bg-sage-green' : 'bg-gray-300'
                      }`} style={{ maxWidth: '100px' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Introduzione */}
            <div className="bg-soft-apricot rounded-wellness p-6 sm:p-8 max-w-4xl mx-auto border border-sage-green/20">
              <div className="space-y-3 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>Progetto un sistema che lavora dentro le chat che usi già (Instagram, Facebook, WhatsApp).</p>
                <p className="font-bold text-sage-green-dark">Paghi una sola volta il setup iniziale, poi il sistema resta tuo.</p>
              </div>
            </div>
          </div>

          {/* PASSO 1 - Che tipo di centro sei */}
          <div className="mb-20 scroll-mt-24" id="step-1">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-sage-green text-white w-16 h-16 rounded-wellness flex items-center justify-center font-bold text-2xl mr-4 shadow-organic">
                1
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-900">
                Seleziona il tipo di centro
              </h3>
            </div>
            <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
              I prezzi cambiano in base al numero di operatori. Scegli la configurazione che ti rappresenta.
            </p>
            
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-wellness p-3 shadow-wellness inline-flex">
                <button
                  onClick={() => handleCenterTypeChange('single')}
                  className={`px-8 py-4 rounded-wellness font-semibold text-lg transition-all flex items-center ${
                    selectedCenterType === 'single'
                      ? 'bg-sage-green text-white shadow-wellness'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-5 h-5 mr-3" />
                  Studio singolo (1 operatore)
                </button>
                <button
                  onClick={() => handleCenterTypeChange('team')}
                  className={`px-8 py-4 rounded-wellness font-semibold text-lg transition-all flex items-center ml-2 ${
                    selectedCenterType === 'team'
                      ? 'bg-sage-green text-white shadow-wellness'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Piccolo team (2–4 operatori)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
              <div
                onClick={() => handleCenterTypeChange('single')}
                className={`wellness-card p-6 transition-all border-2 cursor-pointer hover:scale-105 ${
                  selectedCenterType === 'single' ? 'border-sage-green bg-sage-green/5' : 'border-gray-200'
                }`}>
                <div className="flex items-center mb-3">
                  <Home className="w-8 h-8 text-sage-green mr-3" />
                  <h4 className="text-lg font-serif font-bold text-gray-900">Studio singolo</h4>
                </div>
                <p className="text-gray-700">Lavori da solo, gestisci in prima persona i trattamenti.</p>
              </div>

              <div
                onClick={() => handleCenterTypeChange('team')}
                className={`wellness-card p-6 transition-all border-2 cursor-pointer hover:scale-105 ${
                  selectedCenterType === 'team' ? 'border-sage-green bg-sage-green/5' : 'border-gray-200'
                }`}>
                <div className="flex items-center mb-3">
                  <Users className="w-8 h-8 text-misty-teal mr-3" />
                  <h4 className="text-lg font-serif font-bold text-gray-900">Piccolo team</h4>
                </div>
                <p className="text-gray-700">Avete più agende, turni diversi e più flusso di clienti.</p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setCurrentPricingData({
                    ...currentPricingData,
                    isCustomQuote: true,
                    centerType: undefined,
                    total: 0,
                    selectedMainFlows: [],
                    selectedExtraFlows: []
                  });
                  setSkipToClientInfo(true);
                  setShowContactModal(true);
                }}
                className="bg-gradient-to-r from-mocha-mousse to-mocha-mousse-dark rounded-wellness p-8 max-w-3xl w-full text-center border-2 border-mocha-mousse-dark hover:scale-105 transition-all shadow-wellness hover:shadow-2xl cursor-pointer"
              >
                <div className="flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-white mr-3" />
                  <h5 className="font-serif font-bold text-white text-xl">Centro strutturato (5+ operatori)?</h5>
                </div>
                <p className="text-white text-lg mb-4">
                  Per centri più grandi preparo sempre un progetto su misura.
                </p>
                <div className="bg-white rounded-wellness px-6 py-3 inline-flex items-center font-bold text-mocha-mousse-dark text-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Contattami per un preventivo personalizzato
                </div>
              </button>
            </div>
          </div>

          {/* PASSO 2 - Flussi principali */}
          <div className="mb-20 scroll-mt-24" id="step-2">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-sage-green text-white w-16 h-16 rounded-wellness flex items-center justify-center font-bold text-2xl mr-4 shadow-organic">
                2
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-900">
                Scegli i flussi principali
              </h3>
            </div>
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <div className="bg-blue-50 border-2 border-blue-400 rounded-wellness p-4 mb-6">
                <p className="text-lg font-bold text-blue-900">
                  ℹ️ Stai creando un preventivo, nessun pagamento adesso
                </p>
                <p className="text-sm text-blue-800 mt-2">
                  Il pagamento avviene solo dopo una call conoscitiva in cui parliamo del tuo progetto. Prima ricevi solo un preventivo personalizzato senza impegno.
                </p>
              </div>

              <p className="text-xl text-gray-700 mb-4">
                Seleziona le funzionalità base (Core) del sistema. Puoi attivarne 1, 2 o tutte e 3.
              </p>

              {showError && (
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-wellness p-6 mb-6 border-l-4 border-red-600 animate-fade-in shadow-organic-lg">
                  <p className="text-lg font-bold flex items-center justify-center">
                    <span className="text-2xl mr-3">⚠️</span>
                    Devi selezionare almeno un flusso principale per proseguire!
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-r from-sage-green/10 to-misty-teal/10 rounded-wellness p-6 border-l-4 border-sage-green">
                <p className="text-lg text-gray-800 font-medium">
                  Attivando tutti e 3 i flussi Core ottieni uno sconto automatico sul totale.
                </p>
              </div>
            </div>

            {/* Flussi principali */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Prenotazioni */}
              <div className={`wellness-card p-8 cursor-pointer transition-all border-2 ${
                selectedMainFlows.includes('bookings') ? 'border-sage-green bg-sage-green/5' : 'border-gray-200'
              }`} onClick={() => handleMainFlowToggle('bookings')}>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-serif font-bold text-gray-900">Prenotazioni trattamenti in chat</h4>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedMainFlows.includes('bookings') ? 'border-sage-green bg-sage-green' : 'border-gray-300'
                  }`}>
                    {selectedMainFlows.includes('bookings') && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-sage-green mb-6">
                  {mainFlows[selectedCenterType].bookings.price} €
                </div>
                <div className="space-y-3 text-gray-700">
                  <p className="font-medium">Il cliente ti scrive su Instagram o Facebook e:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• sceglie il trattamento</li>
                    <li>• vede solo giorni e orari disponibili</li>
                    <li>• riceve conferma in pochi passaggi</li>
                  </ul>
                  <p className="text-sm mt-4">
                    Hai un registro ordinato di tutte le prenotazioni, senza incastri manuali tra messaggi e telefonate.
                  </p>
                </div>
              </div>

              {/* Abbonamenti */}
              <div className={`wellness-card p-8 cursor-pointer transition-all border-2 ${
                selectedMainFlows.includes('subscriptions') ? 'border-sage-green bg-sage-green/5' : 'border-gray-200'
              }`} onClick={() => handleMainFlowToggle('subscriptions')}>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-serif font-bold text-gray-900">Abbonamenti ricorrenti</h4>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedMainFlows.includes('subscriptions') ? 'border-sage-green bg-sage-green' : 'border-gray-300'
                  }`}>
                    {selectedMainFlows.includes('subscriptions') && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-sage-green mb-6">
                  {mainFlows[selectedCenterType].subscriptions.price} €
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>Gestione di abbonamenti ricorrenti (mensili o periodici):</p>
                  <ul className="space-y-2 ml-4">
                    <li>• pagamento automatico e rinnovi</li>
                    <li>• stato abbonamento (attivo / scaduto)</li>
                    <li>• anagrafica e tracciamento nel sistema</li>
                  </ul>
                  <p className="text-sm mt-4">
                    Serve per costruire entrate ricorrenti più stabili, non solo vendite una tantum.
                  </p>
                </div>
              </div>

              {/* Cosmetici */}
              <div className={`wellness-card p-8 cursor-pointer transition-all border-2 ${
                selectedMainFlows.includes('cosmetics') ? 'border-sage-green bg-sage-green/5' : 'border-gray-200'
              }`} onClick={() => handleMainFlowToggle('cosmetics')}>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-serif font-bold text-gray-900">Vendita cosmetici in chat</h4>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedMainFlows.includes('cosmetics') ? 'border-sage-green bg-sage-green' : 'border-gray-300'
                  }`}>
                    {selectedMainFlows.includes('cosmetics') && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-sage-green mb-6">
                  {mainFlows[selectedCenterType].cosmetics.price} €
                </div>
                <div className="space-y-3 text-gray-700">
                  <p className="font-medium">I tuoi clienti, restando in chat:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• vedono una selezione di prodotti (creme, oli, ecc.)</li>
                    <li>• possono chiedere consigli</li>
                    <li>• acquistano direttamente in chat con pagamento online</li>
                    <li>• scelgono ritiro in sede o consegna</li>
                  </ul>
                  <p className="text-sm mt-4">
                    Non è un e-commerce complesso: è vendita guidata durante la conversazione.
                  </p>
                </div>
              </div>
            </div>

            {/* Sconto tutti e 3 */}
            {selectedMainFlows.length === 3 && (
              <div className="bg-gradient-to-r from-sage-green to-misty-teal text-white rounded-wellness p-8 text-center mb-8">
                <h4 className="text-2xl font-serif font-bold mb-4">🎉 Sconto Completo Attivo!</h4>
                <p className="text-xl">
                  Se attivi tutti e 3 i flussi principali, il setup completo è scontato a{' '}
                  <span className="font-bold text-3xl">
                    {selectedCenterType === 'single' ? '1.200' : '1.350'} €
                  </span>
                  {' '}(invece di {selectedCenterType === 'single' ? '1.370' : '1.520'} € sommandoli uno a uno).
                </p>
              </div>
            )}

            <div className="text-center">
              <p className="text-lg text-gray-700 font-medium mb-6">
                Puoi partire da 1 flusso e aggiungere gli altri in seguito.
              </p>
              <div className="bg-green-50 border border-green-400 rounded-wellness p-4 max-w-2xl mx-auto">
                <p className="text-sm font-semibold text-green-900">
                  ✓ Nessun pagamento ora • Prima parliamo, poi decidi
                </p>
                <p className="text-xs text-green-800 mt-1">
                  Ricevi un preventivo e fissiamo una call per conoscerci. Pagherai solo se decidi di procedere dopo la call.
                </p>
              </div>
            </div>
          </div>

          {/* PASSO 3 - Flussi extra */}
          <div className="mb-20 scroll-mt-24" id="step-3">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-misty-teal text-white w-16 h-16 rounded-wellness flex items-center justify-center font-bold text-2xl mr-4 shadow-organic">
                3
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-900">
                Aggiungi funzionalità extra (opzionale)
              </h3>
            </div>
            <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
              Potenzia il tuo sistema con moduli avanzati. Puoi saltare questo passo o aggiungerne quanti vuoi.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {extraFlows.map((flow) => (
                <div key={flow.id} className={`wellness-card p-8 cursor-pointer transition-all border-2 ${
                  selectedExtraFlows.includes(flow.id) ? 'border-sage-green bg-sage-green/5' : 'border-gray-200'
                }`} onClick={() => handleExtraFlowToggle(flow.id)}>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-serif font-bold text-gray-900">{flow.name}</h4>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedExtraFlows.includes(flow.id) ? 'border-sage-green bg-sage-green' : 'border-gray-300'
                    }`}>
                      {selectedExtraFlows.includes(flow.id) && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  
                  <div className="text-3xl font-serif font-bold text-sage-green mb-6">
                    {flow.price} €
                  </div>

                  <div className="space-y-4 text-gray-700">
                    <p dangerouslySetInnerHTML={{ __html: flow.description }} />

                    {flow.features && (
                      <div>
                        {flow.id === 'gift-cards' && <p className="font-medium mb-2">Nel dettaglio:</p>}
                        {flow.id === 'whatsapp' && <p className="font-medium mb-2">Nel dettaglio:</p>}
                        <ul className="space-y-2 ml-4">
                          {flow.features.map((feature, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: '• ' + feature }} />
                          ))}
                        </ul>
                      </div>
                    )}

                    {flow.advantages && (
                      <div>
                        <p className="font-medium mb-2">Vantaggi:</p>
                        <ul className="space-y-2 ml-4">
                          {flow.advantages.map((advantage, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: '• ' + advantage }} />
                          ))}
                        </ul>
                      </div>
                    )}

                    {flow.note && (
                      <div className="bg-warm-sand rounded-wellness p-4 border border-sage-green/20">
                        <p className="font-medium text-sm" dangerouslySetInnerHTML={{ __html: flow.note }} />
                      </div>
                    )}

                    {flow.highlight && (
                      <div className="bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-4 text-center">
                        <p className="font-bold">{flow.highlight}</p>
                      </div>
                    )}

                    {flow.closure && (
                      <p className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: flow.closure }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PASSO 4 - Riepilogo e Totale */}
          <div className="mb-20 scroll-mt-24" id="step-4">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-mocha-mousse text-white w-16 h-16 rounded-wellness flex items-center justify-center font-bold text-2xl mr-4 shadow-organic">
                4
              </div>
              <h3 className="text-3xl font-serif font-bold text-gray-900">
                Riepilogo e preventivo
              </h3>
            </div>

            {calculateGrandTotal() === 0 ? (
              <div className="wellness-card p-12 text-center">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h4 className="text-2xl font-serif font-bold text-gray-700 mb-4">
                  Seleziona almeno un flusso principale
                </h4>
                <p className="text-lg text-gray-600">
                  Torna al Passo 2 e scegli le funzionalità che vuoi attivare per vedere il preventivo
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-sage-green to-sage-green-dark rounded-wellness p-10 text-white text-center relative overflow-hidden shadow-organic-lg">
                <div className="absolute top-4 right-4 opacity-20">
                  <Logo size="lg" showText={false} />
                </div>

                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Il tuo investimento</h3>
                <div className="text-7xl font-serif font-bold mb-4 relative z-10">€{calculateGrandTotal()}</div>
                <p className="text-white/90 mb-8 text-xl relative z-10 font-medium">Pagamento unico • Sistema personalizzato</p>
              
              {selectedMainFlows.length > 0 && (
                <div className="bg-white/10 backdrop-blur-md rounded-wellness p-6 mb-6 relative z-10">
                  <h4 className="text-xl font-bold mb-4">Flussi selezionati:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <h5 className="font-semibold mb-2">Flussi principali:</h5>
                      {selectedMainFlows.length === 0 && <p className="text-sm">Nessuno selezionato</p>}
                      {selectedMainFlows.includes('bookings') && <p className="text-sm">• Prenotazioni in chat</p>}
                      {selectedMainFlows.includes('subscriptions') && <p className="text-sm">• Abbonamenti ricorrenti</p>}
                      {selectedMainFlows.includes('cosmetics') && <p className="text-sm">• Vendita cosmetici</p>}
                      {selectedMainFlows.length === 3 && (
                        <p className="text-sm font-bold text-yellow-200 mt-2">Sconto applicato!</p>
                      )}
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Flussi extra:</h5>
                      {selectedExtraFlows.length === 0 && <p className="text-sm">Nessuno selezionato</p>}
                      {selectedExtraFlows.map(flowId => {
                        const flow = extraFlows.find(f => f.id === flowId);
                        return flow && <p key={flowId} className="text-sm">• {flow.name}</p>;
                      })}
                    </div>
                  </div>
                </div>
              )}

                <button
                  onClick={handleContactClick}
                  className="bg-white text-sage-green-dark font-bold px-12 py-6 rounded-wellness hover:bg-mocha-mousse hover:text-white transition-all duration-300 shadow-organic text-xl hover:scale-110 hover:shadow-2xl transform relative z-10 hover:-translate-y-2 hover:ring-4 hover:ring-white/50"
                >
                  <span className="flex items-center justify-center">
                    <Phone className="w-6 h-6 mr-3" />
                    Invia preventivo e richiedi demo
                  </span>
                </button>

                <div className="bg-white/10 backdrop-blur-sm rounded-wellness p-4 mt-6 relative z-10 border border-white/30">
                  <p className="text-base text-white font-bold mb-2">
                    ✓ Nessun impegno • Nessun pagamento immediato
                  </p>
                  <p className="text-sm text-white/90">
                    Primo passo: ricevi il preventivo personalizzato<br/>
                    Secondo passo: call conoscitiva per parlare del tuo progetto<br/>
                    Terzo passo: se ti convince, procediamo
                  </p>
                </div>

                <p className="text-xs text-white/70 mt-4 relative z-10">
                  Ti risponderò entro 24 ore • Zero pressione commerciale
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="my-20 border-t-2 border-gray-200"></div>

          {/* Informazioni aggiuntive */}
          <div className="mb-20">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
              Cosa succede dopo il setup?
            </h3>
            <p className="text-xl text-gray-700 text-center mb-12 max-w-4xl mx-auto">
              Dopo la messa online ti accompagno nella fase di avvio: c'è un periodo iniziale incluso, poi puoi scegliere se avere assistenza continuativa o solo quando serve.
            </p>

            {/* Primo mese incluso */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-wellness p-8 mb-12 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <h4 className="text-2xl font-serif font-bold mb-4">Primo mese di avvio – incluso</h4>
              <p className="text-lg mb-6">
                Per ogni progetto è incluso un mese di assistenza tecnica dopo la messa online, per stabilizzare il sistema nell'uso reale.
              </p>
              <div className="bg-white/10 rounded-wellness p-6">
                <p className="font-medium mb-4">In questo periodo:</p>
                <ul className="space-y-2 text-left max-w-2xl mx-auto">
                  <li>• Correzione di eventuali errori tecnici emersi nell'uso quotidiano</li>
                  <li>• Piccoli aggiustamenti necessari (testi, percorsi, pulsanti e dettagli operativi)</li>
                </ul>
                <p className="text-sm mt-4 italic">
                  Le nuove funzionalità si valutano dopo la stabilizzazione: qui ci concentriamo su affidabilità e pulizia del flusso.
                </p>
              </div>
            </div>

            {/* Piani di manutenzione */}
            <div className="mb-12">
              <h4 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
                Dopo il primo mese: abbonamento o interventi a ore
              </h4>
              <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
                Dopo il primo mese puoi scegliere: un piano di manutenzione, un piano di crescita, oppure interventi a chiamata quando serve.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {maintenancePlans.map((plan) => (
                  <div key={plan.id} className={`wellness-card p-8 relative ${plan.popular ? 'border-2 border-purple-500' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                          CONSIGLIATO
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className={`${plan.color} w-16 h-16 rounded-wellness flex items-center justify-center mx-auto mb-4`}>
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="text-xl font-serif font-bold text-gray-900 mb-2">{plan.name}</h5>
                      <div className="text-3xl font-serif font-bold text-sage-green">€{plan.price}/mese</div>
                    </div>

                    {plan.description && (
                      <p className="text-gray-700 mb-4">{plan.description}</p>
                    )}

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: feature }} />
                        </div>
                      ))}
                    </div>

                    {plan.note && (
                      <p className="text-sm text-gray-600 italic">{plan.note}</p>
                    )}

                    {plan.highlight && (
                      <div className="bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-4 mt-4 text-center">
                        <p className="font-bold text-sm">{plan.highlight}</p>
                      </div>
                    )}

                    <button
                      onClick={() => handleMaintenanceClick(plan.name.toLowerCase())}
                      className={`w-full mt-6 py-4 px-6 rounded-wellness font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-wellness hover:shadow-2xl pulse-maintenance'
                          : 'bg-gradient-to-r from-sage-green to-misty-teal hover:from-sage-green-dark hover:to-misty-teal-dark text-white shadow-lg hover:shadow-xl animate-pulse-subtle'
                      }`}
                    >
                      <span className="flex items-center justify-center relative z-10">
                        <Zap className="w-5 h-5 mr-2" />
                        Scegli {plan.name}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{animation: 'shimmer 3s ease-in-out infinite'}}></span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Interventi singoli */}
              <div className="wellness-card p-8 text-center">
                <Phone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h5 className="text-xl font-serif font-bold text-gray-900 mb-4">
                  Interventi singoli senza abbonamento – 60 €/ora
                </h5>
                <p className="text-gray-700 mb-4">
                  <strong>Regola:</strong> minimo fatturabile 1 ora, poi a scatti di 30 minuti.<br />
                  Adatto sia per supporto tecnico, sia per piccole modifiche/ottimizzazioni su richiesta.
                </p>
                <div className="bg-warm-sand rounded-wellness p-4 border border-sage-green/20 mb-6">
                  <p className="text-sm font-medium text-gray-800">
                    Se dopo il primo mese non attivi alcun abbonamento, il sistema continua a funzionare normalmente: potrai contattarmi quando ne avrai bisogno.
                  </p>
                </div>
                <button
                  onClick={() => handleMaintenanceClick('none')}
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white font-bold px-8 py-4 rounded-wellness transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl animate-pulse-subtle relative overflow-hidden"
                >
                  <span className="flex items-center justify-center relative z-10">
                    <Phone className="w-5 h-5 mr-2" />
                    Contattami per Supporto Spot
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{animation: 'shimmer 3s ease-in-out infinite'}}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Nota finale */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-wellness p-8 border-l-4 border-sage-green max-w-4xl mx-auto">
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Come funziona il pagamento
              </h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                Il setup si paga una sola volta. I servizi esterni (software di chat, pagamenti, calendario/CRM e hosting se previsto) vengono attivati a nome del centro e pagati direttamente ai rispettivi fornitori.
              </p>
              <p className="text-gray-700 font-medium">
                Nessun vincolo proprietario: hai sempre accesso agli account e i dati restano esportabili. Se un domani vuoi cambiare fornitore o gestione, puoi farlo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setSkipToClientInfo(false);
          setSelectedMaintenancePlan('');
        }}
        pricingData={{
          ...currentPricingData,
          selectedMaintenancePlan: selectedMaintenancePlan
        }}
        skipToClientInfo={skipToClientInfo}
      />
    </>
  );
};

export default PricingCalculator;