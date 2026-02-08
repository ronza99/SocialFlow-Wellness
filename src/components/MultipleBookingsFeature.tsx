import React from 'react';
import { Calendar, Users, Clock, CheckCircle, X, Zap, Target } from 'lucide-react';

const MultipleBookingsFeature = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const limitations = [
    {
      system: "Software Tradizionali",
      icon: X,
      color: "bg-red-500",
      restrictions: [
        "Una prenotazione attiva per volta",
        "Deve completare il trattamento prima di prenotare",
        "Blocco sistema se ha appuntamento pendente",
        "Clienti frustrati che non possono pianificare",
        "Perdita di vendite per limitazioni tecniche"
      ]
    },
    {
      system: "SocialFlow Wellness",
      icon: CheckCircle,
      color: "bg-green-500",
      restrictions: [
        "Prenotazioni illimitate contemporanee",
        "Può prenotare anche con trattamenti attivi",
        "Pianificazione libera per settimane/mesi",
        "Clienti soddisfatti che prenotano di più",
        "Massimizzazione ricavi senza limitazioni"
      ]
    }
  ];

  const realScenarios = [
    {
      scenario: "Cliente Abituale",
      description: "Marco ha un massaggio prenotato per giovedì",
      traditional: "❌ Non può prenotare il trattamento viso di venerdì fino a giovedì sera",
      socialflow: "✅ Prenota subito anche il trattamento viso, il pacchetto del mese prossimo e regali per la moglie",
      impact: "+300% valore ordine medio"
    },
    {
      scenario: "Pianificazione Familiare",
      description: "Sofia vuole organizzare trattamenti per tutta la famiglia",
      traditional: "❌ Deve prenotare uno alla volta, aspettando ogni completamento",
      socialflow: "✅ Prenota tutto in una sessione: lei, marito, figlia, anche per mesi diversi",
      impact: "Famiglia intera fidelizzata"
    },
    {
      scenario: "Pacchetti e Regali",
      description: "Cliente vuole comprare pacchetti e regali",
      traditional: "❌ Limitazioni impediscono acquisti multipli o prenotazioni regalo",
      socialflow: "✅ Compra pacchetti per sé, prenota regali per amiche, tutto insieme",
      impact: "+250% ricavi per cliente"
    },
    {
      scenario: "Stagionalità",
      description: "Cliente vuole prenotare per le vacanze estive",
      traditional: "❌ Deve aspettare di completare trattamenti attuali prima di prenotare estate",
      socialflow: "✅ Prenota subito tutti i trattamenti pre-vacanza anche se ha appuntamenti attivi",
      impact: "Pianificazione anticipata garantita"
    }
  ];

  const businessBenefits = [
    {
      icon: Target,
      title: "Massimizzazione Ricavi",
      description: "Clienti prenotano più trattamenti per sessione",
      stat: "+180% valore medio ordine"
    },
    {
      icon: Users,
      title: "Fidelizzazione Superiore",
      description: "Nessuna frustrazione tecnica",
      stat: "95% soddisfazione cliente"
    },
    {
      icon: Calendar,
      title: "Pianificazione Ottimale",
      description: "Agenda piena con prenotazioni anticipate",
      stat: "+40% occupazione calendario"
    },
    {
      icon: Zap,
      title: "Vendite Impulso",
      description: "Cliente prenota tutto quello che vuole subito",
      stat: "+220% conversioni multiple"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-warm-sand to-sage-green/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-high-contrast mb-4 sm:mb-6 md:mb-8 px-2">
            🚫 Zero Limitazioni alle Prenotazioni
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-medium-contrast leading-relaxed max-w-3xl mx-auto px-4">
            I tuoi clienti possono prenotare tutti i trattamenti che vogliono, anche se ne hanno già di attivi. 
            Nessun blocco, nessuna frustrazione.
          </p>
        </div>

        {/* Problema dei software tradizionali */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-wellness border-l-4 border-red-400 p-6 sm:p-8 mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="flex items-start">
            <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mr-3 sm:mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-high-contrast mb-3 sm:mb-4">
                🔒 Il Limite Più Frustrante dei Software Tradizionali
              </h3>
              <p className="text-base sm:text-lg text-readable mb-3 sm:mb-4">
                <strong>"Non puoi prenotare, hai già un appuntamento attivo"</strong> - Quante volte i tuoi clienti hanno sentito questa frase?
              </p>
              <div className="bg-white/70 rounded-wellness p-4 sm:p-6">
                <p className="text-readable text-sm sm:text-base">
                  <strong>Risultato:</strong> Clienti frustrati che rinunciano a prenotare, ricavi persi, 
                  esperienza negativa che li spinge verso la concorrenza. Una limitazione tecnica che costa migliaia di euro.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Confronto sistemi */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-high-contrast mb-8 sm:mb-12 text-center">
            ⚔️ Software Tradizionali vs SocialFlow Wellness
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {limitations.map((system, index) => (
              <div key={index} className={`wellness-card p-6 sm:p-8 ${index === 1 ? 'border-2 border-green-500' : 'border-2 border-red-200'}`}>
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`${system.color} w-10 h-10 sm:w-12 sm:h-12 rounded-wellness flex items-center justify-center mr-3 sm:mr-4`}>
                    <system.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="font-serif font-bold text-high-contrast text-lg sm:text-xl">{system.system}</h4>
                </div>
                
                <ul className="space-y-2 sm:space-y-3">
                  {system.restrictions.map((restriction, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`${index === 0 ? 'text-red-500' : 'text-green-500'} mr-3 mt-1 text-base sm:text-lg`}>
                        {index === 0 ? '✗' : '✓'}
                      </span>
                      <span className="text-readable text-sm sm:text-base">{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Scenari reali */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-high-contrast mb-8 sm:mb-12 text-center">
            🎭 Scenari Reali: La Differenza in Pratica
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {realScenarios.map((scenario, index) => (
              <div key={index} className="wellness-card p-6 sm:p-8">
                <h4 className="font-serif font-bold text-high-contrast text-base sm:text-lg mb-3 sm:mb-4">{scenario.scenario}</h4>
                
                <div className="bg-warm-sand rounded-wellness p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-readable font-medium text-sm sm:text-base">{scenario.description}</p>
                </div>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="bg-red-50 rounded-wellness p-3 sm:p-4 border border-red-200">
                    <p className="text-xs sm:text-sm text-readable">
                      <strong>Software Tradizionale:</strong> {scenario.traditional}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-wellness p-3 sm:p-4 border border-green-200">
                    <p className="text-xs sm:text-sm text-readable">
                      <strong>SocialFlow Wellness:</strong> {scenario.socialflow}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-3 sm:p-4 text-center">
                  <p className="font-bold text-sm sm:text-base">{scenario.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vantaggi business */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-high-contrast mb-8 sm:mb-12 text-center">
            💰 Impatto Diretto sui Tuoi Ricavi
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {businessBenefits.map((benefit, index) => (
              <div key={index} className="wellness-card p-6 sm:p-8 text-center hover:shadow-wellness-lg transition-all duration-200">
                <div className="bg-sage-green w-12 h-12 sm:w-16 sm:h-16 rounded-wellness flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-serif font-bold text-high-contrast text-base sm:text-lg mb-2 sm:mb-3">{benefit.title}</h4>
                <p className="text-readable mb-3 sm:mb-4 text-xs sm:text-sm">{benefit.description}</p>
                <div className="text-lg sm:text-xl font-bold text-sage-green-dark">{benefit.stat}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Esempio pratico */}
        <div className="mb-16 sm:mb-20">
          <div className="bg-soft-apricot rounded-wellness p-8 sm:p-12 border border-sage-green/20">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-high-contrast mb-6 sm:mb-8 text-center">
              📱 Esempio Pratico: Una Sessione di Prenotazione
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h4 className="font-serif font-bold text-high-contrast text-lg sm:text-xl mb-4 sm:mb-6">
                  🗓 Situazione: Cliente con Massaggio Giovedì
                </h4>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white rounded-wellness p-3 sm:p-4 border border-sage-green/20">
                    <p className="text-readable text-sm sm:text-base">
                      <strong>Lunedì:</strong> "Vorrei prenotare anche il trattamento viso di venerdì"
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-wellness p-3 sm:p-4 border border-sage-green/20">
                    <p className="text-readable text-sm sm:text-base">
                      <strong>Martedì:</strong> "E anche il pacchetto per il mese prossimo"
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-wellness p-3 sm:p-4 border border-sage-green/20">
                    <p className="text-readable text-sm sm:text-base">
                      <strong>Mercoledì:</strong> "Vorrei regalare un trattamento a mia sorella"
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-serif font-bold text-high-contrast text-lg sm:text-xl mb-4 sm:mb-6">
                  ✅ Risposta SocialFlow Wellness
                </h4>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-green-50 rounded-wellness p-3 sm:p-4 border border-green-200">
                    <p className="text-readable text-sm sm:text-base">
                      <strong>✓ Prenotato!</strong> Trattamento viso venerdì ore 15:00
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-wellness p-3 sm:p-4 border border-green-200">
                    <p className="text-readable text-sm sm:text-base">
                      <strong>✓ Confermato!</strong> Pacchetto 5 massaggi dal 15 marzo
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-wellness p-3 sm:p-4 border border-green-200">
                    <p className="text-readable text-sm sm:text-base">
                      <strong>✓ Regalo creato!</strong> Voucher inviato via email
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6 bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-4 sm:p-6 text-center">
                  <p className="text-base sm:text-lg font-bold">Risultato: 3 prenotazioni + 1 Gift Card pagata</p>
                  <p className="text-sage-green/80 text-sm sm:text-base">Libertà totale + incasso immediato per regalo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tecnologia dietro */}
        <div className="mb-16 sm:mb-20">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-wellness p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-8 text-center text-white">
              ⚙️ La Tecnologia Che Rende Possibile Tutto
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8">
              <div>
                <h4 className="font-serif font-bold text-gray-100 mb-3 sm:mb-4 text-base sm:text-lg">🔧 Architettura Flessibile:</h4>
                <ul className="text-gray-200 space-y-2 sm:space-y-3">
                  <li className="flex items-start text-sm sm:text-base"><span className="text-white mr-3 mt-1">•</span>Database progettato per prenotazioni multiple</li>
                  <li className="flex items-start text-sm sm:text-base"><span className="text-white mr-3 mt-1">•</span>Gestione stati indipendenti per ogni prenotazione</li>
                  <li className="flex items-start text-sm sm:text-base"><span className="text-white mr-3 mt-1">•</span>Calendario intelligente senza conflitti</li>
                  <li className="flex items-start text-sm sm:text-base"><span className="text-white mr-3 mt-1">•</span>Pagamenti separati per ogni servizio</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-md rounded-wellness p-4 sm:p-6">
              <p className="text-base sm:text-lg text-center">
                <strong>Il segreto:</strong> Mentre altri sistemi bloccano per "sicurezza", 
                noi abbiamo progettato la libertà totale senza compromessi sulla gestione.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-soft-apricot rounded-wellness p-8 sm:p-12 border border-sage-green/20 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-high-contrast mb-4 sm:mb-6">
              🎯 Libera il Potenziale dei Tuoi Clienti
            </h3>
            <p className="text-lg sm:text-xl text-readable mb-6 sm:mb-8 leading-relaxed">
              Smetti di perdere ricavi per limitazioni tecniche. I tuoi clienti vogliono prenotare di più, 
              dagli la libertà di farlo senza ostacoli.
            </p>
            <button
              onClick={scrollToPricing}
              className="wellness-button text-base sm:text-lg animate-pulse-subtle"
            >
              Configura il Sistema Senza Limitazioni
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultipleBookingsFeature;