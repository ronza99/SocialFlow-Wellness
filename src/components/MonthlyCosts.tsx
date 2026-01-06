import React from 'react';
import { DollarSign, MessageCircle, Zap, Database, CreditCard, Phone, Brain, TrendingUp } from 'lucide-react';

const MonthlyCosts = () => {
  const essentialCosts = [
    {
      name: "ManyChat",
      cost: "€13.95/mese",
      description: "Assistente automatico che risponde ai clienti sempre",
      icon: MessageCircle,
      color: "bg-blue-500"
    },
    {
      name: "Make.com",
      cost: "€8.37/mese",
      description: "Collega automaticamente tutti i servizi tra loro",
      icon: Zap,
      color: "bg-purple-500"
    },
    {
      name: "HubSpot",
      cost: "€20/mese",
      description: "Gestione clienti, calendario e distribuzione appuntamenti",
      icon: Database,
      color: "bg-orange-500"
    },
    {
      name: "Stripe + HubSpot",
      cost: "2.25% + €0.25",
      description: "Commissioni sui pagamenti: 1.5% Stripe + 0.75% HubSpot",
      icon: CreditCard,
      color: "bg-green-500"
    }
  ];

  const optionalCosts = [
    {
      name: "Operatori HubSpot Extra",
      cost: "€20/mese cad.",
      description: "Per ogni operatore aggiuntivo oltre il primo",
      icon: Database,
      details: "Include dashboard personale, calendario sincronizzato, notifiche push"
    },
    {
      name: "WhatsApp Business",
      cost: "€0.07/messaggio",
      description: "Messaggi WhatsApp per follow-up, promemoria e riattivazioni",
      icon: Phone,
      details: "Follow-up automatici, promemoria giorno prima, riattivazione clienti inattivi con coupon"
    },
    {
      name: "FAQ AI Avanzate",
      cost: "€30/mese",
      description: "AI Step di ManyChat per risposte intelligenti",
      icon: Brain,
      details: "Comprensione linguaggio naturale, risposte contestuali, apprendimento continuo"
    }
  ];

  const centerExamples = [
    {
      name: "Centro Micro",
      description: "Studio privato, 1-2 operatori",
      essential: 42.32,
      optional: 30,
      features: ["Base HubSpot", "Promemoria WhatsApp"],
      color: "bg-blue-500"
    },
    {
      name: "Centro Medio",
      description: "Centro consolidato, 3-5 operatori",
      essential: 42.32,
      optional: 70,
      features: ["2 operatori extra", "Promemoria WhatsApp"],
      color: "bg-purple-500"
    },
    {
      name: "Centro Grande",
      description: "Catena/franchising, 6+ operatori",
      essential: 42.32,
      optional: 100,
      features: ["5 operatori extra", "Promemoria WhatsApp"],
      color: "bg-orange-500"
    }
  ];

  // Esempio pratico commissioni
  const stripeExample = {
    massaggio: { price: 60, commission: 1.60 },
    trattamento: { price: 120, commission: 2.95 },
    pacchetto: { price: 300, commission: 7.00 }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            🔁 Costi Mensili Trasparenti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Totale trasparenza sui costi ricorrenti - nessuna sorpresa, nessun costo nascosto
          </p>
        </div>

        {/* Essential costs */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ⚡ Costi Essenziali (Software Base)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialCosts.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-gray-100 hover:border-purple-300">
                <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                <div className="text-2xl font-bold text-purple-600 mb-3">{item.cost}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 max-w-md mx-auto">
              <h4 className="text-xl font-bold text-gray-900 mb-2">Costo Base Fisso</h4>
              <div className="text-3xl font-bold text-green-600">€42.32/mese</div>
              <p className="text-gray-600 text-sm mt-2">+ commissioni solo sui pagamenti effettivi</p>
            </div>
          </div>
        </div>

        {/* Stripe Commission Example */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            💳 Esempio Commissioni Reali
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Quanto "perdi" davvero con le commissioni?
              </h4>
              <p className="text-lg text-gray-600">
                Commissione totale: <span className="font-bold text-red-600">2.25% + €0.25</span> per transazione
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <h5 className="font-bold text-gray-900 mb-2">Massaggio Rilassante</h5>
                  <div className="text-3xl font-bold text-blue-600 mb-2">€60</div>
                  <div className="text-sm text-gray-600 mb-4">Prezzo al cliente</div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="text-red-600 font-semibold">Commissione: €{stripeExample.massaggio.commission}</div>
                    <div className="text-green-600 font-bold text-lg">Incassi: €{(stripeExample.massaggio.price - stripeExample.massaggio.commission).toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <div className="text-center">
                  <h5 className="font-bold text-gray-900 mb-2">Trattamento Viso</h5>
                  <div className="text-3xl font-bold text-purple-600 mb-2">€120</div>
                  <div className="text-sm text-gray-600 mb-4">Prezzo al cliente</div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="text-red-600 font-semibold">Commissione: €{stripeExample.trattamento.commission}</div>
                    <div className="text-green-600 font-bold text-lg">Incassi: €{(stripeExample.trattamento.price - stripeExample.trattamento.commission).toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <h5 className="font-bold text-gray-900 mb-2">Pacchetto 5 Sedute</h5>
                  <div className="text-3xl font-bold text-orange-600 mb-2">€300</div>
                  <div className="text-sm text-gray-600 mb-4">Prezzo al cliente</div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="text-red-600 font-semibold">Commissione: €{stripeExample.pacchetto.commission}</div>
                    <div className="text-green-600 font-bold text-lg">Incassi: €{(stripeExample.pacchetto.price - stripeExample.pacchetto.commission).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h5 className="text-xl font-bold text-gray-900 mb-3">💡 Il Vero Vantaggio</h5>
                <p className="text-gray-700">
                  Sì, paghi una commissione, ma <strong>elimini i no-show</strong> (che ti costano il 100% del servizio), 
                  <strong>automatizzi la gestione</strong> e <strong>aumenti le conversioni del 40-60%</strong>. 
                  Il ROI è sempre positivo!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional costs */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🎛 Funzionalità Opzionali (Se Attivate)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {optionalCosts.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-gray-200 hover:border-gray-300">
                <div className="bg-gray-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                <div className="text-xl font-bold text-gray-600 mb-3">{item.cost}</div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="bg-white/70 rounded-lg p-3">
                  <p className="text-xs text-gray-500">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center examples with costs */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            💼 Esempi Reali per Tipologia
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {centerExamples.map((center, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
                <div className={`${center.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">{center.name}</h4>
                <p className="text-gray-600 text-center mb-6">{center.description}</p>
                
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Costi Base:</span>
                      <span className="font-bold text-green-600">€{center.essential}/mese</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Funzioni Extra:</span>
                      <span className="font-bold text-blue-600">€{center.optional}/mese</span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {center.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Totale Mensile:</span>
                      <span className="text-xl font-bold text-purple-600">€{center.essential + center.optional}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important note */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            ⚡ Investimento Reale vs Benefici
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-bold text-purple-600 mb-3">💰 Costo Base Fisso</h5>
              <p className="text-xl text-gray-700 mb-2">
                <span className="font-bold text-purple-600">€42.32/mese</span> per il sistema completo
              </p>
              <p className="text-gray-600 text-sm">
                Funziona sempre, gestisce prenotazioni, pagamenti e clienti in automatico
              </p>
            </div>
            <div>
              <h5 className="font-bold text-green-600 mb-3">📈 Confronto Tradizionale</h5>
              <p className="text-xl text-gray-700 mb-2">
                Segretaria part-time: <span className="font-bold text-red-500">€800-1200/mese</span>
              </p>
              <p className="text-gray-600 text-sm">
                Lavora solo in orario, può commettere errori, non gestisce pagamenti
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyCosts;