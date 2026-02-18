import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import PricingCalculator from '../components/PricingCalculator';
import { PricingData } from '../App';

interface HomeProps {
  currentPricingData: PricingData;
  setCurrentPricingData: (data: PricingData) => void;
}

export default function Home({ currentPricingData, setCurrentPricingData }: HomeProps) {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Hero />
      <div id="pricing">
        <PricingCalculator
          currentPricingData={currentPricingData}
          setCurrentPricingData={setCurrentPricingData}
        />
      </div>
    </>
  );
}
