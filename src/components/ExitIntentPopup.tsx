import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

const ExitIntentPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Attiva solo se il mouse esce dalla parte superiore della finestra
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    // Aggiungi listener per il movimento del mouse
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const scrollToPricing = () => {
    setShowPopup(false);
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!showPopup) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-wellness shadow-2xl max-w-xs sm:max-w-lg md:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in">
          {/* Close button */}
          <button
            onClick={handleClosePopup}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-1 sm:p-2 transition-colors z-10"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-sage-green to-misty-teal text-white p-4 sm:p-6 md:p-8 rounded-t-wellness">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-3 sm:mb-4 px-2">
                Prima di andare via: vuoi vedere il listino?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 px-2">
                Setup da <span className="font-bold text-white">€440</span> (in base ai moduli scelti)
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-wellness p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-700 mb-3">Senza automazione:</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• no-show e buchi in agenda</li>
                    <li>• tempo perso tra chat e telefonate</li>
                    <li>• clienti che rimandano perché il percorso è macchinoso</li>
                  </ul>
                </div>

                <div className="bg-soft-apricot rounded-wellness p-6 border border-sage-green/20">
                  <h4 className="font-bold text-sage-green mb-3">Con SocialFlow:</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• prenotazione guidata in chat</li>
                    <li>• promemoria e follow-up automatici (se attivati)</li>
                    <li>• pagamenti online opzionali per ridurre i no-show</li>
                    <li>• tutto tracciato (prenotazioni, clienti, pagamenti)</li>
                  </ul>
                </div>
              </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={scrollToPricing}
                className="w-full bg-gradient-to-r from-sage-green to-misty-teal hover:from-sage-green-dark hover:to-misty-teal-dark text-white font-bold py-4 px-8 rounded-wellness shadow-wellness-lg transition-all duration-300 text-lg group"
              >
                Vedi il listino
                <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExitIntentPopup;