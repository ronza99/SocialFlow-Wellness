import React, { useState } from 'react';
import UrgencyTimer from './components/UrgencyTimer';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import SocialProof from './components/SocialProof';
import VideoDemo from './components/VideoDemo';
import Benefits from './components/Benefits';
import ExpandableFeatures from './components/ExpandableFeatures';
import HowItWorks from './components/HowItWorks';
import PricingCalculator from './components/PricingCalculator';
import TransparentCosts from './components/TransparentCosts';
import SMSvsEmailMarketing from './components/SMSvsEmailMarketing';
import About from './components/About';
import Footer from './components/Footer';
import ExitIntentPopup from './components/ExitIntentPopup';
import InteractiveChatbot from './components/InteractiveChatbot';

// Interfaccia per i dati del pricing
export interface PricingData {
  treatments: number; // Mantenuto per compatibilità
  products: number; // Mantenuto per compatibilità
  extraOperators: number; // Mantenuto per compatibilità
  smsFollowUp: boolean; // Mantenuto per compatibilità
  detailedFaq: number; // Mantenuto per compatibilità
  multilingualEnglish?: boolean; // Mantenuto per compatibilità
  total: number;
  selectedMainFlows?: string[]; // Nuovi flussi principali
  selectedExtraFlows?: string[]; // Nuovi flussi extra
  centerType?: 'single' | 'team'; // Tipo di centro
  selectedMaintenancePlan?: string; // Piano di manutenzione selezionato
  isCustomQuote?: boolean; // Flag per preventivo su misura (5+ operatori)
}

function App() {
  // Stato globale per i dati del pricing calculator
  const [currentPricingData, setCurrentPricingData] = useState<PricingData>({
    treatments: 5, // Mantenuto per compatibilità
    products: 5, // Mantenuto per compatibilità
    extraOperators: 0,
    smsFollowUp: false,
    detailedFaq: 0,
    multilingualEnglish: false,
    total: 440, // Prezzo base aggiornato
    selectedMainFlows: [],
    selectedExtraFlows: [],
    centerType: 'single'
  });

  return (
    <div className="min-h-screen bg-white">
      <UrgencyTimer />
      <div className="pt-16"> {/* Spazio per il timer fisso */}
        <Hero />
        <FAQ />
        <SocialProof />
        <VideoDemo />
        <Benefits />
        <ExpandableFeatures />
        <HowItWorks />
        <TransparentCosts />
        <SMSvsEmailMarketing />
        <PricingCalculator
          currentPricingData={currentPricingData}
          setCurrentPricingData={setCurrentPricingData}
        />
        <About />
        <Footer />
      </div>
      <ExitIntentPopup />
      <InteractiveChatbot />
    </div>
  );
}

export default App;