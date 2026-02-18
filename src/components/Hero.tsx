import React from 'react';
import { ArrowRight, CheckCircle, CalendarCheck, Gift, Play } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToPricingSection } from '../utils/navigation';
import Logo from './Logo';

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToPricing = () => {
    scrollToPricingSection(location.pathname, navigate);
  };

  const scrollToDemo = () => {
    if (location.pathname !== '/come-funziona') {
      navigate('/come-funziona');
      setTimeout(() => {
        const el = document.getElementById('video-demo');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    } else {
      const el = document.getElementById('video-demo');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-cream-white via-warm-sand to-soft-apricot">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage-green/10 organic-blob float opacity-60"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-misty-teal/10 organic-blob-2 float-delayed opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-mocha-mousse/8 organic-blob float opacity-50"></div>
        <div className="absolute inset-0 bg-organic-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto mobile-spacing py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 animate-fade-in">
            <div className="mb-6">
              <Logo size="xl" variant="transparent" />
            </div>
          </div>

          {/* Titolo */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-black text-high-contrast leading-tight px-4">
              DM intasati?<br />
              <span className="relative inline-block mt-1">
                <span className="gradient-text">Trasforma i social in un motore di prenotazioni automatico</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sage-green via-misty-teal to-mocha-mousse rounded-full opacity-60"></div>
              </span>
            </h1>
          </div>

          {/* Sottotitolo */}
          <div className="mb-5 sm:mb-6 animate-fade-in-up px-4" style={{ animationDelay: '0.15s' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-medium-contrast leading-relaxed font-light max-w-3xl mx-auto">
              Il cliente scrive su Instagram/Facebook, sceglie trattamento e orario in chat e riceve conferma. Tu ti limiti a gestire l'agenda.
            </p>
          </div>

          {/* Microcopy bridge */}
          <div className="mb-8 sm:mb-10 animate-fade-in-up px-4" style={{ animationDelay: '0.20s' }}>
            <p className="text-sm sm:text-base text-sage-green-dark font-semibold tracking-wide bg-sage-green/10 inline-block px-4 py-2 rounded-wellness border border-sage-green/30">
              Il cliente prenota in chat &nbsp;•&nbsp; Tu gestisci solo l'agenda.
            </p>
          </div>

          {/* Bullet */}
          <div className="mb-10 sm:mb-12 animate-fade-in-up max-w-xl mx-auto px-4" style={{ animationDelay: '0.25s' }}>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sage-green flex-shrink-0 mt-0.5" />
                <span className="text-base sm:text-lg text-high-contrast font-medium">Risposte immediate su prezzi, durata e disponibilità</span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarCheck className="w-5 h-5 text-sage-green flex-shrink-0 mt-0.5" />
                <span className="text-base sm:text-lg text-high-contrast font-medium">Prenotazione guidata + conferma automatica</span>
              </li>
              <li className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-sage-green flex-shrink-0 mt-0.5" />
                <span className="text-base sm:text-lg text-high-contrast font-medium">
                  <span className="text-sage-green-dark">Opzionale:</span> pagamenti e prepagati (buoni regalo, pacchetti, abbonamenti)
                </span>
              </li>
            </ul>
          </div>

          {/* CTA affiancati */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 animate-fade-in-up px-4" style={{ animationDelay: '0.35s' }}>
            <button
              onClick={scrollToPricing}
              className="w-full sm:w-auto wellness-button text-base sm:text-lg group px-8 py-4 flex items-center justify-center gap-3 animate-pulse-subtle relative overflow-hidden"
            >
              Richiedi preventivo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{animation: 'shimmer 3s ease-in-out infinite'}}></span>
            </button>
            <button
              onClick={scrollToDemo}
              className="w-full sm:w-auto bg-gray-900 text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-wellness hover:bg-gray-800 active:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg"
            >
              <Play className="w-5 h-5 flex-shrink-0" />
              Guarda una demo in chat
            </button>
          </div>

          {/* Micro-frase rassicurante */}
          <div className="mb-16 sm:mb-20 animate-fade-in-up px-4" style={{ animationDelay: '0.42s' }}>
            <p className="text-sm text-medium-contrast font-light">
              Nessun impegno: prima capiamo il tuo caso e poi ricevi un preventivo su misura.
            </p>
          </div>

        </div>
      </div>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-16 left-0 right-0 glass-dark backdrop-blur-lg border-t border-white/20 p-4 z-40 sm:hidden">
        <button
          onClick={scrollToPricing}
          className="w-full wellness-button text-base font-semibold animate-pulse-subtle"
        >
          Calcola Preventivo
        </button>
      </div>
    </section>
  );
};

export default Hero;
