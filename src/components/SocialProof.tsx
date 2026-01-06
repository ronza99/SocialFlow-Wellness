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
      title: "Preferenza prenotazioni online",
      description: "I clienti wellness preferiscono prenotare online piuttosto che telefonare",
      color: "from-sage-green to-sage-green-dark"
    },
    {
      icon: Clock,
      title: "No-show nei sistemi tradizionali",
      description: "I centri senza conferma o pagamento anticipato hanno tassi di no-show significativi",
      color: "from-misty-teal to-misty-teal-dark"
    },
    {
      icon: DollarSign,
      title: "Crescita social commerce",
      description: "Gli acquisti diretti sui social media sono in forte crescita",
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

              <h4 className="font-serif font-bold text-gray-900 text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">{stat.title}</h4>

              <p className="text-gray-800 leading-relaxed text-base sm:text-lg font-medium">{stat.description}</p>
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

      </div>
    </section>
  );
};

export default SocialProof;