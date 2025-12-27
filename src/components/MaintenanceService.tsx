import React, { useState } from 'react';
import { Shield, Phone, Star, Crown, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import ContactModal from './ContactModal';
import { PricingData } from '../App';

interface MaintenanceServiceProps {
  currentPricingData: PricingData;
}

const MaintenanceService: React.FC<MaintenanceServiceProps> = ({ currentPricingData }) => {
  const [showContactModal, setShowContactModal] = useState(false);

  const [selectedMaintenancePlan, setSelectedMaintenancePlan] = useState<string>('');

  const plans = [
    {
      name: "Manutenzione Tecnica",
      price: "€59",
      period: "/mese",
      description: "Supporto tecnico essenziale",
      features: [
        "Intervento su problemi tecnici (collegamenti, aggiornamenti necessari, modifiche richieste dalle piattaforme)",
        "Piccoli aggiustamenti al sistema esistente (messaggi/pulsanti/condizioni semplici)",
        "Verifica periodica che prenotazioni e messaggi stiano funzionando"
      ],
      note: "Se qualcosa non va, mi scrivi e lo metto a posto entro tempi concordati.",
      icon: Shield,
      color: "bg-blue-500",
      borderColor: "border-blue-200",
      popular: false
    },
    {
      name: "Crescita DM",
      price: "€129",
      period: "/mese",
      description: "Per chi vede le chat come un vero canale di vendita",
      features: [
        "Tutto ciò che c'è nel Piano Manutenzione tecnica",
        "Fino a 3 ore al mese (piccole nuove automazioni, promozioni mirate in chat, migliorare i punti di blocco, aggiornare logiche)",
        "1 call strategica ogni 2 mesi"
      ],
      note: "È il piano per chi vede le chat come un vero canale di vendita.",
      icon: Star,
      color: "bg-purple-500",
      borderColor: "border-purple-200",
      popular: true
    }
  ];

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (selectedPlan?: string) => {
    // Verifica che ci siano flussi principali selezionati
    if (!currentPricingData.selectedMainFlows || currentPricingData.selectedMainFlows.length === 0) {
      // Se non ci sono flussi selezionati, scrolla al pricing calculator
      scrollToPricing();
      return;
    }

    // Se viene passato un piano specifico, aggiorna i dati del pricing
    if (selectedPlan) {
      // Qui impostiamo il piano selezionato che verrà passato al modal
      setSelectedMaintenancePlan(selectedPlan);
    }
    setShowContactModal(true);
  };

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              🛡 Servizio di Manutenzione & Coaching
            </h2>
            
            {/* Spiegazione del perché */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 max-w-4xl mx-auto mb-8">
              <div className="flex items-start">
                <AlertCircle className="w-8 h-8 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    🤔 "Perché dovrei pagare un canone mensile?"
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-bold text-orange-600 mb-2 sm:mb-3 text-sm sm:text-base">🔧 Garanzia Tecnica:</h4>
                      <ul className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>• Bot sempre operativo H24</li>
                        <li>• Aggiornamenti automatici piattaforme</li>
                        <li>• Risoluzione problemi in tempo reale</li>
                        <li>• Backup e sicurezza dati</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-orange-600 mb-2 sm:mb-3 text-sm sm:text-base">📈 Strategia di Crescita:</h4>
                      <ul className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>• Ottimizzazione continua conversioni</li>
                        <li>• Nuove funzionalità e automazioni</li>
                        <li>• Analisi performance mensili</li>
                        <li>• Consulenza marketing personalizzata</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/70 rounded-lg">
                    <p className="text-gray-700 font-semibold text-sm sm:text-base">
                      💡 <strong>In pratica:</strong> Non paghi solo per "mantenere", ma per <strong>far crescere</strong> 
                      continuamente il tuo business. È un investimento che si ripaga con più clienti ogni mese.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Free first month */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6 max-w-2xl mx-auto mb-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">🎁 Regalo di Benvenuto</h3>
              <p className="text-xl">Il 1° mese di manutenzione è incluso gratuitamente per tutti i clienti!</p>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 ${plan.borderColor} ${
                  plan.popular ? 'transform scale-105 ring-4 ring-purple-200' : 'hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      PIÙ POPOLARE
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`${plan.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-xl text-gray-500">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.note && (
                  <div className="bg-warm-sand rounded-wellness p-4 mb-6 border border-sage-green/20">
                    <p className="text-sm text-gray-700 italic">{plan.note}</p>
                  </div>
                )}

                <button 
                  onClick={() => handleContactClick(plan.name.toLowerCase())}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 pulse-maintenance ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl pulse-contact-button'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 pulse-contact-button'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Scegli {plan.name}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Alternative option */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border-2 border-gray-200">
              <Phone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Preferisci il Supporto On-Demand?</h3>
              <p className="text-gray-600 mb-6">
                Senza abbonamento: <span className="font-bold text-2xl text-purple-600">€60/ora</span> per assistenza o consulenza spot
              </p>
              <button 
                onClick={() => handleContactClick('none')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-8 py-3 rounded-full transition-colors pulse-contact-button"
              >
                <span className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contattami per Supporto Spot
                </span>
              </button>
            </div>
          </div>

          {/* CTA ripetuta */}
          <div className="text-center mt-16">
            <button
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold px-10 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 pulse-contact-button animate-pulse-subtle"
            >
              <span className="flex items-center justify-center">
                <Shield className="w-6 h-6 mr-3" />
                🛡 Configura il Tuo Sistema Completo
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal con dati pricing correnti */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        pricingData={{
          ...currentPricingData,
          selectedMaintenancePlan: selectedMaintenancePlan
        }}
      />
    </>
  );
};

export default MaintenanceService;