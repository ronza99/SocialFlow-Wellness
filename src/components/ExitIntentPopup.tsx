import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToPricingSection } from '../utils/navigation';

const SESSION_KEY = 'exit_popup_shown';
const CTA_CLICKED_KEY = 'exit_popup_cta_clicked';
const MIN_TIME_MS = 25000;
const MIN_SCROLL_PERCENT = 40;

const ExitIntentPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const eligibleRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isMobile = () => window.innerWidth < 1024;
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    const ctaClicked = sessionStorage.getItem(CTA_CLICKED_KEY);
    const onPricingPage = location.pathname.includes('come-funziona') || location.hash === '#pricing';

    if (isMobile() || alreadyShown || ctaClicked || onPricingPage) return;

    let timeElapsed = false;
    let scrollReached = false;

    const checkEligible = () => {
      if (timeElapsed && scrollReached) {
        eligibleRef.current = true;
      }
    };

    const timer = setTimeout(() => {
      timeElapsed = true;
      checkEligible();
    }, MIN_TIME_MS);

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrolled >= MIN_SCROLL_PERCENT) {
        scrollReached = true;
        checkEligible();
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && eligibleRef.current && !sessionStorage.getItem(SESSION_KEY)) {
        setShowPopup(true);
        sessionStorage.setItem(SESSION_KEY, '1');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [location]);

  const handleClose = () => setShowPopup(false);

  const handleCTA = () => {
    sessionStorage.setItem(CTA_CLICKED_KEY, '1');
    setShowPopup(false);
    scrollToPricingSection(location.pathname, navigate);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-wellness shadow-2xl max-w-2xl w-full relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
          aria-label="Chiudi"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-sage-green to-misty-teal text-white px-8 py-7 rounded-t-wellness">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-1">
            Vuoi vedere prezzi e cosa include?
          </h2>
          <p className="text-white/85 text-base sm:text-lg font-light">
            Setup da <span className="font-semibold text-white">€440</span> &nbsp;&bull;&nbsp; varia in base a moduli e numero operatori
          </p>
        </div>

        {/* Comparison columns */}
        <div className="px-6 sm:px-8 pt-6 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h4 className="font-semibold text-gray-600 mb-3 text-sm uppercase tracking-wide">Gestione manuale (tipico)</h4>
              <ul className="space-y-2">
                {[
                  'Prenotazioni gestite tra chat, chiamate e agenda',
                  'Promemoria e conferme fatti a mano',
                  'Dati e pagamenti non centralizzati',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full border border-gray-300 bg-white"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#f0f7f4] rounded-xl p-5 border border-sage-green/25">
              <h4 className="font-semibold text-sage-green mb-3 text-sm uppercase tracking-wide">Con SocialFlow (configurabile)</h4>
              <ul className="space-y-2">
                {[
                  'Prenotazione guidata in chat',
                  'Promemoria e follow-up automatici (solo se attivati)',
                  'Pagamenti online opzionali (es. caparra/saldo dove utile)',
                  'Tracciamento base di prenotazioni e clienti',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="mt-0.5 w-4 h-4 flex-shrink-0 text-sage-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">
            Nel listino trovi cosa è incluso e gli eventuali costi dei software esterni.
          </p>
        </div>

        {/* CTA */}
        <div className="px-6 sm:px-8 pb-7">
          <button
            onClick={handleCTA}
            className="group w-full bg-gradient-to-r from-sage-green to-misty-teal hover:from-sage-green-dark hover:to-misty-teal-dark text-white font-semibold py-4 px-8 rounded-wellness shadow-wellness-lg transition-all duration-300 text-base sm:text-lg"
          >
            <span className="flex items-center justify-center">
              Apri il listino
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
