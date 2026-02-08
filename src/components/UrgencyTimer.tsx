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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-semibold text-sm sm:text-base md:text-lg text-center">
              Scopri come automatizzare il tuo centro wellness
            </span>
          </div>

          <button
            onClick={scrollToPricing}
            className="bg-white text-sage-green-dark font-semibold px-6 py-2 rounded-wellness text-sm hover:bg-warm-sand transition-all duration-200 transform shadow-organic hover:scale-105 animate-pulse-subtle"
          >
            <span className="flex items-center whitespace-nowrap">
              Vedi il Listino
              <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrgencyTimer;