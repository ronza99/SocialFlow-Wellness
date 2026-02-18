import React from 'react';
import { ArrowRight, Heart, Play, CheckCircle, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToPricingSection } from '../utils/navigation';
import Logo from './Logo';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToPricing = () => {
    scrollToPricingSection(location.pathname, navigate);
  };

  const scrollToDemo = () => {
    if (location.pathname !== '/come-funziona') {
      navigate('/come-funziona');
      setTimeout(() => {
        const el = document.getElementById('video-demo');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    } else {
      const el = document.getElementById('video-demo');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-sage-green/10 organic-blob opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-misty-teal/10 organic-blob-2 opacity-20"></div>

      <div className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="mb-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black text-white leading-tight">
              Configura SocialFlow Wellness
            </h2>
          </div>

          <div className="mb-10 animate-fade-in">
            <p className="text-lg sm:text-xl text-gray-300 font-light max-w-2xl mx-auto">
              Prenotazioni e vendite direttamente in chat, con calendario e flusso operativo collegati.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 animate-fade-in-up">
            <button
              onClick={scrollToPricing}
              className="w-full sm:w-auto group bg-gradient-to-r from-sage-green to-misty-teal hover:from-sage-green-dark hover:to-misty-teal-dark text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-wellness shadow-wellness hover:shadow-wellness-xl transform hover:scale-[1.02] transition-all duration-200 flex flex-col items-center gap-0.5"
            >
              <span className="flex items-center gap-2">
                Calcola il preventivo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <span className="text-xs font-normal text-white/75">Ci metti 2 minuti.</span>
            </button>
            <button
              onClick={scrollToDemo}
              className="w-full sm:w-auto font-semibold text-base sm:text-lg px-8 py-4 rounded-wellness border border-white/30 text-white hover:bg-white/10 transition-all duration-200 flex flex-col items-center gap-0.5"
            >
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5 flex-shrink-0" />
                Richiedi una demo
              </span>
              <span className="text-xs font-normal text-white/60">Ti mostro il flusso su ambiente demo.</span>
            </button>
          </div>

          <div className="mt-12 p-8 rounded-wellness border border-white/15 bg-white/5 max-w-2xl mx-auto animate-fade-in-up text-left">
            <p className="text-base font-semibold text-white mb-2">Vuoi vedere il flusso completo prima di partire?</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Ti mostro una demo guidata su ambiente di prova: prenotazione in chat → calendario → notifiche interne → (se previsto) pagamento. Nessun accesso ai tuoi account in questa fase.
            </p>
          </div>

          <div className="mt-12 pt-10 border-t border-gray-700 animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 border border-white/10 rounded-wellness p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-sage-green flex-shrink-0" />
                  <h3 className="text-base font-bold text-white">Go-live stimato: 7–14 giorni lavorativi*</h3>
                </div>
                <p className="text-sm text-gray-400">Da quando abbiamo accessi e materiali completi.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-wellness p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-sage-green flex-shrink-0" />
                  <h3 className="text-base font-bold text-white">Avvio controllato</h3>
                </div>
                <p className="text-sm text-gray-400">Checklist + test del flusso (prenotazione, calendario, notifiche, tag/CRM) prima della messa online.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-wellness p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-misty-teal flex-shrink-0" />
                  <h3 className="text-base font-bold text-white">Supporto iniziale incluso</h3>
                </div>
                <p className="text-sm text-gray-400">Avvio guidato e piccoli aggiustamenti post-go-live, entro limiti definiti.</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              *Tempistiche indicative: possono variare in base a rapidità di consegna accessi/materiali e ai moduli attivati.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-6 sm:mb-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-wellness p-4 mr-6">
                <Logo size="md" showText={false} />
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Heart className="w-5 h-5 text-terracotta mr-3" />
                  <p className="text-gray-300 text-base">
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
