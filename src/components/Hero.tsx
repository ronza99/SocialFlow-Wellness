import React from 'react';
import { ArrowRight, Clock, TrendingUp, Star, CheckCircle, MessageCircle, CreditCard, Share2, CalendarCheck, Gift, Play, CalendarDays, ListChecks } from 'lucide-react';
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
          <div className="mb-8 sm:mb-10 animate-fade-in-up px-4" style={{ animationDelay: '0.15s' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-medium-contrast leading-relaxed font-light max-w-3xl mx-auto">
              Da storie, post, commenti e messaggi: il cliente riceve risposta, sceglie il servizio e prenota in chat (e se vuoi paga).
            </p>
          </div>

          {/* Bullet */}
          <div className="mb-10 sm:mb-12 animate-fade-in-up max-w-xl mx-auto px-4" style={{ animationDelay: '0.25s' }}>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sage-green flex-shrink-0 mt-0.5" />
                <span className="text-base sm:text-lg text-high-contrast font-medium">Risposte immediate a prezzi, disponibilità e trattamenti</span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarCheck className="w-5 h-5 text-sage-green flex-shrink-0 mt-0.5" />
                <span className="text-base sm:text-lg text-high-contrast font-medium">Prenotazione guidata + conferma automatica</span>
              </li>
              <li className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-sage-green flex-shrink-0 mt-0.5" />
                <span className="text-base sm:text-lg text-high-contrast font-medium">
                  <span className="text-sage-green-dark">(Opzionale)</span> Pagamenti e prepagati: buoni regalo, pacchetti e abbonamenti
                </span>
              </li>
            </ul>
          </div>

          {/* CTA affiancati */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20 animate-fade-in-up px-4" style={{ animationDelay: '0.35s' }}>
            <button
              onClick={scrollToDemo}
              className="w-full sm:w-auto wellness-button text-base sm:text-lg group px-8 py-4 flex items-center justify-center gap-3 animate-pulse-subtle relative overflow-hidden"
            >
              <Play className="w-5 h-5 flex-shrink-0" />
              Guarda una demo in chat
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{animation: 'shimmer 3s ease-in-out infinite'}}></span>
            </button>
            <button
              onClick={scrollToPricing}
              className="w-full sm:w-auto border-2 border-sage-green text-sage-green-dark font-semibold text-base sm:text-lg px-8 py-4 rounded-wellness hover:bg-sage-green/10 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Calcola il preventivo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Card cosa puoi automatizzare */}
          <div className="glass rounded-wellness p-6 sm:p-8 md:p-10 max-w-3xl mx-auto mb-10 sm:mb-12 shadow-organic-lg animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-high-contrast mb-6 flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-sage-green" />
              Cosa puoi automatizzare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-sage-green/15 rounded-lg p-2">
                    <Share2 className="w-5 h-5 text-sage-green" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">Interazioni dai social</h3>
                </div>
                <p className="text-sm sm:text-base text-readable leading-relaxed">
                  Storie, post, reel, commenti e pubblicità possono avviare automaticamente il percorso in chat.
                </p>
              </div>
              <div className="text-left md:border-l md:border-r border-sage-green/20 md:px-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-misty-teal/15 rounded-lg p-2">
                    <MessageCircle className="w-5 h-5 text-misty-teal" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">Prenotazioni in chat</h3>
                </div>
                <p className="text-sm sm:text-base text-readable leading-relaxed">
                  Scelta servizio → orario → conferma immediata, senza rimbalzi tra app e siti.
                </p>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-mocha-mousse/15 rounded-lg p-2">
                    <CreditCard className="w-5 h-5 text-mocha-mousse" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">Pagamenti e prepagati <span className="text-gray-500 font-normal text-sm">(opzionale)</span></h3>
                </div>
                <p className="text-sm sm:text-base text-readable leading-relaxed">
                  Attiva buoni regalo, pacchetti e abbonamenti direttamente in chat. Se vuoi, puoi anche vendere prodotti. Anche su WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Mini-blocco Come funziona */}
          <div className="max-w-3xl mx-auto mb-16 sm:mb-20 animate-fade-in-up px-4" style={{ animationDelay: '0.55s' }}>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-high-contrast mb-6 text-center">
              Come funziona <span className="text-medium-contrast font-normal">(senza complicazioni)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-green/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-sage-green-dark font-black text-base">1</span>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <Share2 className="w-5 h-5 text-sage-green" />
                  </div>
                  <p className="text-sm sm:text-base text-readable leading-relaxed">Il cliente interagisce dai social — storie, post, commenti o messaggi</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-misty-teal/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-misty-teal font-black text-base">2</span>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <CalendarDays className="w-5 h-5 text-misty-teal" />
                  </div>
                  <p className="text-sm sm:text-base text-readable leading-relaxed">In chat riceve risposta, sceglie e prenota in pochi tocchi</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mocha-mousse/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-mocha-mousse font-black text-base">3</span>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <ListChecks className="w-5 h-5 text-mocha-mousse" />
                  </div>
                  <p className="text-sm sm:text-base text-readable leading-relaxed">Tu trovi tutto organizzato in agenda e gestisci solo le eccezioni</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="wellness-card p-8 sm:p-10 hover-lift group">
              <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-sage-green to-sage-green-dark w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <p className="text-gray-900 font-bold text-xl mb-2">Più richieste che diventano prenotazioni</p>
              <p className="text-gray-700 mt-2 font-medium">Meno perdite tra messaggi e risposte in ritardo.</p>
            </div>

            <div className="wellness-card p-8 sm:p-10 hover-lift group">
              <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-misty-teal to-misty-teal-dark w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <p className="text-gray-900 font-bold text-xl mb-2">Agenda più ordinata</p>
              <p className="text-gray-700 mt-2 font-medium">Gestione operatori e disponibilità più semplice.</p>
            </div>

            <div className="wellness-card p-8 sm:p-10 hover-lift group">
              <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-mocha-mousse to-mocha-mousse-dark w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <p className="text-gray-900 font-bold text-xl mb-2">Meno no-show <span className="text-gray-500 font-normal text-base">(opzionale)</span></p>
              <p className="text-gray-700 mt-2 font-medium">Promemoria e follow-up automatici quando servono.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-0 left-0 right-0 glass-dark backdrop-blur-lg border-t border-white/20 p-4 z-40 sm:hidden">
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
