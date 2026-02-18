import React from 'react';
import { ArrowRight, CheckCircle, Clock, Heart, HeadphonesIcon, Sparkles, Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToPricingSection } from '../utils/navigation';
import Logo from './Logo';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToPricing = () => {
    scrollToPricingSection(location.pathname, navigate);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sage-green/10 organic-blob opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-misty-teal/10 organic-blob-2 opacity-20"></div>

      {/* Main CTA Section */}
      <div className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-14 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-sage-green mr-3" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white px-2">
                Configura SocialFlow Wellness
              </h2>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light px-4">
              Prenotazioni e vendite direttamente in chat, con calendario e flusso operativo collegati.
            </p>
          </div>

          {/* Dual CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <button
                onClick={scrollToPricing}
                className="group bg-gradient-to-r from-sage-green to-misty-teal hover:from-sage-green-dark hover:to-misty-teal-dark text-white text-base sm:text-lg font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-wellness shadow-wellness-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center">
                  Calcola il preventivo
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              <span className="mt-2 text-sm text-gray-400">Ci metti 2 minuti.</span>
            </div>

          </div>

          {/* Demo info */}
          <div className="mt-16 p-8 sm:p-10 glass-dark rounded-wellness max-w-3xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-7 h-7 text-sage-green mr-3 flex-shrink-0" />
              <span className="text-xl sm:text-2xl font-serif font-bold text-white">Vuoi vedere il flusso completo prima di partire?</span>
            </div>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
              Ti mostro una demo guidata su ambiente di prova: prenotazione in chat &rarr; calendario &rarr; notifiche interne &rarr; (se previsto) pagamento. Nessun accesso ai tuoi account in questa fase.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mt-20 pt-16 border-t border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
              <div className="group hover-lift flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-sage-green/15 flex items-center justify-center mb-5 group-hover:bg-sage-green/25 transition-colors duration-300">
                  <Clock className="w-7 h-7 text-sage-green" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Go-live stimato: 7–14 giorni lavorativi*</h3>
                <p className="text-gray-300 text-base">Da quando abbiamo accessi e materiali completi.</p>
              </div>
              <div className="group hover-lift flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-sage-green/15 flex items-center justify-center mb-5 group-hover:bg-sage-green/25 transition-colors duration-300">
                  <CheckCircle className="w-7 h-7 text-sage-green" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Avvio controllato</h3>
                <p className="text-gray-300 text-base">Checklist + test del flusso (prenotazione, calendario, notifiche, tag/CRM) prima della messa online.</p>
              </div>
              <div className="group hover-lift flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-sage-green/15 flex items-center justify-center mb-5 group-hover:bg-sage-green/25 transition-colors duration-300">
                  <HeadphonesIcon className="w-7 h-7 text-sage-green" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Supporto iniziale incluso</h3>
                <p className="text-gray-300 text-base">Avvio guidato e piccoli aggiustamenti post-go-live, entro limiti definiti.</p>
              </div>
            </div>
            <p className="mt-10 text-sm text-gray-500 text-center max-w-2xl mx-auto">
              *Tempistiche indicative: possono variare in base a rapidità di consegna accessi/materiali e ai moduli attivati.
            </p>
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