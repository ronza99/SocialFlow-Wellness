import React from 'react';
import { MessageCircle, CalendarCheck, ClipboardList } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Il cliente scrive',
    text: 'Da un messaggio diretto, un commento o le storie: riceve risposte e viene guidato nella scelta.',
    color: 'bg-sage-green/10 text-sage-green',
    border: 'border-sage-green/30',
  },
  {
    icon: CalendarCheck,
    title: 'Sceglie e prenota',
    text: 'Seleziona trattamento, durata e orario. Può anche scegliere l\'operatore o il primo disponibile.',
    color: 'bg-misty-teal/10 text-misty-teal',
    border: 'border-misty-teal/30',
  },
  {
    icon: ClipboardList,
    title: 'Tu gestisci l\'agenda',
    text: 'La prenotazione arriva già organizzata. Intervieni solo per eccezioni o cambi.',
    color: 'bg-mocha-mousse/10 text-mocha-mousse',
    border: 'border-mocha-mousse/30',
  },
];

const HowItWorksHome = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-high-contrast mb-3">
            Come funziona (senza complicazioni)
          </h2>
          <p className="text-base sm:text-lg text-medium-contrast font-light max-w-2xl mx-auto">
            Per il cliente è tutto in chat. Per il centro è tutto ordinato.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <div className={`rounded-wellness border ${step.border} bg-white p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${step.color}`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Passo {index + 1}
                </div>
                <h3 className="text-lg font-serif font-bold text-high-contrast mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-medium-contrast leading-relaxed">{step.text}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden sm:flex items-center justify-center absolute"
                  style={{ left: `calc(${(index + 1) * 33.33}% - 12px)`, top: '50%', transform: 'translateY(-50%)' }}>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHome;
