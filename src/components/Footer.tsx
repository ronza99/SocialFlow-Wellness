import React from 'react';
import { ArrowRight, Heart, Sparkles, Star, Zap } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sage-green/10 organic-blob opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-misty-teal/10 organic-blob-2 opacity-20"></div>
      
      {/* Main CTA Section */}
      <div className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-sage-green mr-3 sm:mr-4" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-8 sm:mb-12 px-2">
                Configura il tuo sistema SocialFlow
              </h2>
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-200 mb-12 sm:mb-16 max-w-4xl mx-auto font-light px-4">
              Prenotazioni e vendite direttamente in chat
            </p>
          </div>

          <div className="space-y-8 animate-fade-in-up">
            <button
              onClick={scrollToPricing}
              className="group bg-gradient-to-r from-sage-green to-misty-teal hover:from-sage-green-dark hover:to-misty-teal-dark text-white text-lg sm:text-xl md:text-2xl font-semibold px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-wellness shadow-wellness-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto animate-pulse-subtle"
            >
              <span className="flex items-center justify-center">
                <Zap className="mr-3 sm:mr-4 w-6 h-6 sm:w-8 sm:h-8" />
                Calcola il Tuo Preventivo
                <ArrowRight className="ml-3 sm:ml-4 w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Demo info */}
          <div className="mt-16 p-10 glass-dark rounded-wellness max-w-3xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-sage-green mr-3" />
              <span className="text-2xl font-serif font-bold text-white">Vuoi vedere il sistema in azione?</span>
            </div>
            <p className="text-xl text-gray-200">
              Contattami per testare tutto con un centro fittizio funzionante. 
              Vedrai l'intero processo dalla chat al pagamento in tempo reale.
            </p>
          </div>

          {/* Enhanced Trust indicators */}
          <div className="mt-20 pt-16 border-t border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
              <div className="group hover-lift">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Setup in media 7–14 giorni</h3>
                <p className="text-gray-300 text-lg">dalla conferma accessi e materiali</p>
              </div>
              <div className="group hover-lift">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🛡️</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Garanzia di avvio</h3>
                <p className="text-gray-300 text-lg">se non funziona ciò che concordiamo, ti rimborsiamo il setup (condizioni chiare)</p>
              </div>
              <div className="group hover-lift">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📞</div>
                <h3 className="text-2xl font-bold text-white mb-3">Supporto diretto incluso</h3>
                <p className="text-gray-300 text-lg">avvio guidato + piccoli fix post-lancio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom section with Logo */}
      <div className="border-t border-gray-700 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-6 sm:mb-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-wellness p-4 mr-6">
                <Logo size="md" showText={false} />
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Heart className="w-6 h-6 text-terracotta mr-3" />
                  <p className="text-gray-300 text-lg">
                    Fatto con passione per il settore wellness
                  </p>
                </div>
                <p className="text-gray-400 text-sm">
                  © 2025 SocialFlow Wellness - Francesco Farì
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;