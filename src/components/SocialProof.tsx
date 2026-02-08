import React from 'react';
import { TrendingUp, Users, Clock, BarChart3, DollarSign, Target, Zap, CheckCircle } from 'lucide-react';

const SocialProof = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const principles = [
    {
      icon: Users,
      title: "Integrazione Nativa",
      description: "Il sistema si integra direttamente nelle piattaforme social dove i tuoi clienti passano già il loro tempo, eliminando la necessità di app esterne",
      color: "from-sage-green to-sage-green-dark"
    },
    {
      icon: Zap,
      title: "Automazione Intelligente",
      description: "Ogni prenotazione viene gestita automaticamente: conferme, promemoria, modifiche e cancellazioni senza il tuo intervento manuale",
      color: "from-misty-teal to-misty-teal-dark"
    },
    {
      icon: Target,
      title: "Flessibilità Totale",
      description: "Gift card opzionali con QR code per chi desidera pagare subito, ma senza obblighi per chi preferisce pagare in loco",
      color: "from-mocha-mousse to-mocha-mousse-dark"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Riduzione No-Show",
      description: "Conferme automatiche e promemoria riducono drasticamente le assenze",
      stat: "Meno appuntamenti persi",
      color: "bg-sage-green"
    },
    {
      icon: Clock,
      title: "Risparmio Tempo",
      description: "Zero telefonate per prenotazioni, modifiche o conferme",
      stat: "Più tempo per i clienti",
      color: "bg-misty-teal"
    },
    {
      icon: TrendingUp,
      title: "Esperienza Cliente",
      description: "Processo semplice e veloce che i clienti apprezzeranno",
      stat: "Clienti più soddisfatti",
      color: "bg-mocha-mousse"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-cream-white to-warm-sand section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 animate-fade-in px-4">
            Perché Funziona
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light animate-fade-in-up px-4 leading-relaxed">
            SocialFlow è progettato su tre principi fondamentali che rendono le prenotazioni più semplici per te e i tuoi clienti
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-20">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="wellness-card p-6 sm:p-8 md:p-10 hover-lift group text-center animate-fade-in-up mx-4 md:mx-0"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`bg-gradient-to-br ${principle.color} w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-wellness flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-organic`}>
                <principle.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>

              <h4 className="font-serif font-bold text-gray-900 text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">{principle.title}</h4>

              <p className="text-gray-800 leading-relaxed text-base sm:text-lg font-medium">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Benefits Section */}
        <div className="glass rounded-wellness p-6 sm:p-8 md:p-12 mb-20 shadow-organic-lg animate-fade-in-up mx-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            I Risultati Concreti per il Tuo Centro
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="wellness-card p-6 sm:p-8 text-center hover-lift group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${benefit.color} w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-organic`}>
                  <benefit.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h4 className="font-serif font-bold text-gray-900 text-lg sm:text-xl mb-3 sm:mb-4">{benefit.title}</h4>
                <p className="text-gray-800 mb-4 sm:mb-6 leading-relaxed font-medium text-sm sm:text-base">{benefit.description}</p>
                <div className="text-sm sm:text-base font-bold gradient-text">{benefit.stat}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;