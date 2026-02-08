import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrgencyTimer from './components/UrgencyTimer';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ExitIntentPopup from './components/ExitIntentPopup';
import InteractiveChatbot from './components/InteractiveChatbot';
import Home from './pages/Home';
import ComeFunziona from './pages/ComeFunziona';
import Vantaggi from './pages/Vantaggi';
import FAQPage from './pages/FAQPage';
import ChiSono from './pages/ChiSono';

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
    <Router>
      <div className="min-h-screen bg-white">
        <UrgencyTimer />
        <Navigation />
        <div className="pt-36">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  currentPricingData={currentPricingData}
                  setCurrentPricingData={setCurrentPricingData}
                />
              }
            />
            <Route path="/come-funziona" element={<ComeFunziona />} />
            <Route path="/vantaggi" element={<Vantaggi />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/chi-sono" element={<ChiSono />} />
          </Routes>
          <Footer />
        </div>
        <ExitIntentPopup />
        <InteractiveChatbot />
      </div>
    </Router>
  );
}

export default App;