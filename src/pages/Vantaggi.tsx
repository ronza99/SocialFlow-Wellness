import React from 'react';
import Benefits from '../components/Benefits';
import TransparentCosts from '../components/TransparentCosts';
import SMSvsEmailMarketing from '../components/SMSvsEmailMarketing';
import SocialProof from '../components/SocialProof';

export default function Vantaggi() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          I Vantaggi di SocialFlow Wellness
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
          Perché SocialFlow Wellness è la scelta migliore per automatizzare il tuo centro estetico.
          Risparmio di tempo, costi trasparenti, risultati garantiti.
        </p>
      </div>
      <Benefits />
      <TransparentCosts />
      <SMSvsEmailMarketing />
      <SocialProof />
    </div>
  );
}
