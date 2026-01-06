import React from 'react';
import { MessageSquare, Bot, Calendar, CreditCard, QrCode, CalendarCheck, Database } from 'lucide-react';

const HowItWorks = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: "Il cliente ti scrive nei messaggi",
      description: "Il cliente apre la chat e sceglie dal menu ciò che gli serve: informazioni, prenotazione o domande frequenti. Può arrivare da Instagram, Facebook, QR code o da una sponsorizzata.",
      color: "bg-sage-green"
    },
    {
      number: "2",
      icon: Bot,
      title: "L'assistente guida la richiesta",
      description: "Risponde alle domande più comuni e orienta il cliente verso la scelta giusta. Se il cliente lo desidera, può attivare promemoria e aggiornamenti anche su WhatsApp (opzionale).",
      color: "bg-misty-teal"
    },
    {
      number: "3",
      icon: Calendar,
      title: "Scelta dell'appuntamento",
      description: "Il cliente sceglie giorno e orario tra quelli disponibili. Il sistema mostra solo gli slot liberi e conferma la prenotazione in pochi passaggi.",
      color: "bg-mocha-mousse"
    },
    {
      number: "4",
      icon: CreditCard,
      title: "Pagamento (opzionale)",
      description: "Se attivi il pagamento online, il cliente può pagare subito in sicurezza. In alternativa può pagare in sede. (Opzionale anche per pacchetti e abbonamenti.)",
      color: "bg-sage-green-dark"
    },
    {
      number: "5",
      icon: QrCode,
      title: "Conferma e QR in chat",
      description: "Dopo la prenotazione, il cliente riceve un QR/codice in chat per riconoscimento e check-in in struttura. Se l'appuntamento viene spostato, il sistema gestisce l'aggiornamento.",
      color: "bg-misty-teal-dark"
    },
    {
      number: "6",
      icon: CalendarCheck,
      title: "Il calendario si aggiorna da solo",
      description: "L'appuntamento viene registrato automaticamente nel calendario del centro e dell'operatore assegnato. Se hai più operatori, l'assegnazione può essere distribuita in modo ordinato (es. round robin).",
      color: "bg-sage-green"
    },
    {
      number: "7",
      icon: Database,
      title: "Tutto tracciato e consultabile",
      description: "Dati cliente, prenotazioni e pagamenti vengono salvati e organizzati. Puoi consultare storico, liste e report per avere sempre una visione chiara.",
      color: "bg-misty-teal"
    }
  ];

  return (
    <section className="py-24 bg-warm-sand">
      <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 px-4">
            Come funziona
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light px-4 leading-relaxed mb-8">
            Un percorso semplice, con automazioni che gestiscono le parti ripetitive: dalla prima chat fino a promemoria e gestione clienti.
          </p>

          <div className="bg-gradient-to-r from-sage-green/10 to-misty-teal/10 rounded-wellness p-6 sm:p-8 max-w-4xl mx-auto border-l-4 border-sage-green mx-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-4">
              Per il centro: uso quotidiano
            </h3>
            <div className="space-y-3 text-left text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                <strong>Il cliente finale</strong> prenota (e paga se previsto) in autonomia in chat e può anche spostare/cancellare entro le regole impostate dal centro.
              </p>
              <p>
                <strong>Lo staff del centro</strong> usa soprattutto Calendario + Telegram, mentre gli altri strumenti lavorano in background.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-sage-green/30 to-misty-teal/30"></div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 mx-4 lg:mx-0 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 lg:max-w-md">
                  <div className={`wellness-card p-6 sm:p-8 md:p-10 hover:shadow-wellness-lg transition-all duration-300 border-l-4 ${
                    step.color.replace('bg-', 'border-')
                  }`}>
                    <div className="flex items-center mb-6 sm:mb-8">
                      <div className={`${step.color} w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl sm:text-2xl mr-4 sm:mr-6 flex-shrink-0`}>
                        {step.number}
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl">{step.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`${step.color} w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-wellness flex items-center justify-center shadow-wellness-lg hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info section senza CTA */}
        <div className="text-center mt-20">
          <div className="bg-white rounded-wellness p-6 sm:p-8 md:p-10 max-w-4xl mx-auto border border-sage-green/20 mx-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
              Vuoi vedere un centro in azione?
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Contattami e ti faccio provare il percorso come se fossi un cliente, su un ambiente demo. Ti mostro passo passo come funziona e cosa cambia nella gestione quotidiana del centro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;