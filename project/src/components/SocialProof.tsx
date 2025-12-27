import React from 'react';
import { TrendingUp, Users, Clock, BarChart3, DollarSign, Target, Zap, CheckCircle } from 'lucide-react';

const SocialProof = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const industryStats = [
    {
      icon: TrendingUp,
      stat: "78%",
      title: "Preferenza Prenotazioni Online",
      description: "dei clienti wellness preferisce prenotare online piuttosto che telefonare",
      source: "Studio Comportamenti Consumatori 2024",
      color: "from-sage-green to-sage-green-dark"
    },
    {
      icon: Clock,
      stat: "25-30%",
      title: "No-Show Tradizionali",
      description: "tasso medio di no-show nei centri senza pagamento anticipato",
      source: "Analisi Settore Beauty & Wellness",
      color: "from-misty-teal to-misty-teal-dark"
    },
    {
      icon: DollarSign,
      stat: "+45%",
      title: "Social Commerce",
      description: "crescita degli acquisti diretti sui social media nel 2024",
      source: "Digital Commerce Report",
      color: "from-mocha-mousse to-mocha-mousse-dark"
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "Zero Abbandoni",
      description: "I clienti restano nel loro social preferito",
      stat: "70% in meno abbandoni vs app esterne",
      color: "bg-sage-green"
    },
    {
      icon: BarChart3,
      title: "Automazione H24",
      description: "Il sistema lavora anche quando dormi",
      stat: "24/7 disponibilità automatica",
      color: "bg-misty-teal"
    },
    {
      icon: Target,
      title: "Gift Card Opzionali",
      description: "QR code per chi vuole pagare subito",
      stat: "100% flessibilità cliente",
      color: "bg-mocha-mousse"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-cream-white to-warm-sand section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 animate-fade-in px-4">
            Dati di Settore che Confermano il Trend
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light animate-fade-in-up px-4 leading-relaxed">
            Il mercato wellness sta cambiando: i clienti vogliono semplicità, velocità e sicurezza
          </p>
        </div>

        {/* Enhanced Industry Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-20">
          {industryStats.map((stat, index) => (
            <div 
              key={index} 
              className="wellness-card p-6 sm:p-8 md:p-10 hover-lift group text-center animate-fade-in-up mx-4 md:mx-0"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-wellness flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-organic`}>
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
              </div>

              <div className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold gradient-text mb-4 sm:mb-6">{stat.stat}</div>
              
              <h4 className="font-serif font-bold text-gray-900 text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">{stat.title}</h4>
              
              <p className="text-gray-800 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg font-medium">{stat.description}</p>
              
              <div className="glass rounded-wellness p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 italic font-medium">Fonte: {stat.source}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Benefits Section */}
        <div className="glass rounded-wellness p-6 sm:p-8 md:p-12 mb-20 shadow-organic-lg animate-fade-in-up mx-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Come SocialFlow Risolve Questi Problemi
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

        {/* Enhanced ROI Snapshot */}
        <div className="wellness-card p-6 sm:p-8 md:p-12 max-w-5xl mx-auto mb-20 shadow-organic-lg animate-fade-in-up mx-4">
          <div className="text-center">
            <div className="bg-gradient-to-br from-sage-green to-misty-teal w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-organic">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">
              Esempio di rientro dei costi (stima)
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 font-medium">
              Calcolo indicativo basato su scontrino medio e costi software stimati (IVA esclusa).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="glass rounded-wellness p-6 sm:p-8 hover-lift">
                <div className="text-3xl sm:text-4xl font-serif font-bold gradient-text mb-3 sm:mb-4">12</div>
                <p className="text-gray-900 text-base sm:text-lg font-bold">prenotazioni extra al mese</p>
                <p className="text-gray-700 mt-2 font-medium text-sm sm:text-base">Esempio indicativo (non una media)</p>
              </div>
              <div className="glass rounded-wellness p-6 sm:p-8 hover-lift">
                <div className="text-3xl sm:text-4xl font-serif font-bold gradient-text mb-3 sm:mb-4">€720</div>
                <p className="text-gray-900 text-base sm:text-lg font-bold">ricavi aggiuntivi stimati</p>
                <p className="text-gray-700 mt-2 font-medium text-sm sm:text-base">Basato su €60 per trattamento</p>
              </div>
              <div className="glass rounded-wellness p-6 sm:p-8 hover-lift">
                <div className="text-3xl sm:text-4xl font-serif font-bold gradient-text mb-3 sm:mb-4">€57/mese</div>
                <p className="text-gray-900 text-base sm:text-lg font-bold">costi software minimi</p>
                <p className="text-gray-700 mt-2 font-medium text-sm sm:text-base">per far funzionare i flussi base (1 operatore)</p>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm italic">Se attivi anche WhatsApp per promemoria: circa €72/mese</p>
              </div>
            </div>
            <div className="glass rounded-wellness p-6 sm:p-8">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-sage-green mr-3" />
                <span className="text-lg sm:text-2xl font-serif font-bold text-gray-900">Esempio pratico</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                Esempio: con 12 trattamenti extra al mese puoi coprire facilmente i costi software. I numeri cambiano da centro a centro. (IVA esclusa)
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;