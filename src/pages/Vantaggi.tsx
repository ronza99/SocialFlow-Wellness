import React from 'react';
import { Sparkles } from 'lucide-react';
import Benefits from '../components/Benefits';
import TransparentCosts from '../components/TransparentCosts';
import SMSvsEmailMarketing from '../components/SMSvsEmailMarketing';
import SocialProof from '../components/SocialProof';

export default function Vantaggi() {
  return (
    <div>
      <div className="py-16 sm:py-24 bg-gradient-to-br from-warm-sand via-soft-apricot to-cream-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-sage-green" />
            <span className="text-sm font-semibold tracking-widest uppercase text-sage-green-dark">
              Perché SocialFlow Wellness
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-high-contrast mb-6 leading-tight animate-fade-in">
            I Vantaggi del{' '}
            <span className="gradient-text">Sistema</span>
          </h1>
          <p className="text-lg sm:text-xl text-readable max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up">
            Meno passaggi per il cliente, meno lavoro manuale per te.
            Costi trasparenti, autonomia reale, risultati concreti.
          </p>
        </div>
      </div>
      <Benefits />
      <SocialProof />
      <SMSvsEmailMarketing />
      <TransparentCosts />
    </div>
  );
}
