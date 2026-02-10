import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToPricingSection } from '../utils/navigation';

const UrgencyTimer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToPricing = () => {
    scrollToPricingSection(location.pathname, navigate);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-sage-green-dark via-misty-teal-dark to-sage-green-dark text-white shadow-wellness-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex flex-row items-center justify-between sm:justify-center space-x-2 sm:space-x-6">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 sm:flex-none">
            <div className="hidden sm:block bg-white/20 p-2 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xs sm:text-base md:text-lg">
              <span className="hidden sm:inline">Scopri come automatizzare il tuo centro wellness</span>
              <span className="sm:hidden">Automatizza il tuo centro</span>
            </span>
          </div>

          <button
            onClick={scrollToPricing}
            className="bg-white text-sage-green-dark font-semibold px-3 py-1.5 sm:px-6 sm:py-2 rounded-wellness text-xs sm:text-sm hover:bg-warm-sand transition-all duration-200 transform shadow-organic hover:scale-105 flex-shrink-0"
          >
            <span className="flex items-center whitespace-nowrap">
              <span className="hidden sm:inline">Vedi il Listino</span>
              <span className="sm:hidden">Listino</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrgencyTimer;