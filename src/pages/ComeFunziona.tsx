import React from 'react';
import VideoDemo from '../components/VideoDemo';
import HowItWorks from '../components/HowItWorks';
import ExpandableFeatures from '../components/ExpandableFeatures';

export default function ComeFunziona() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          Come Funziona SocialFlow
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
          Scopri quanto è semplice automatizzare il tuo centro estetico con SocialFlow.
          Nessuna competenza tecnica richiesta, tutto pronto all'uso.
        </p>
      </div>
      <VideoDemo />
      <HowItWorks />
      <ExpandableFeatures />
    </div>
  );
}
