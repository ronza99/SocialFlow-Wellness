import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FAQ from '../components/FAQ';
import SocialProof from '../components/SocialProof';
import Benefits from '../components/Benefits';
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
      <FAQ />
      <SocialProof />
      <Benefits />
      <div id="pricing">
        <PricingCalculator
          currentPricingData={currentPricingData}
          setCurrentPricingData={setCurrentPricingData}
        />
      </div>
    </>
  );
}
