import React from 'react';
import FAQ from '../components/FAQ';

export default function FAQPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          Domande Frequenti
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
          Tutte le risposte alle tue domande su SocialFlow Wellness. Se non trovi quello che cerchi,
          contattaci direttamente tramite il chatbot o richiedi un preventivo.
        </p>
      </div>
      <FAQ />
    </div>
  );
}
