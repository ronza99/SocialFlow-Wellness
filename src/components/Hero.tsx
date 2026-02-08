import React from 'react';
import { ArrowRight, Clock, TrendingUp, Star, Sparkles } from 'lucide-react';
import Logo from './Logo';

const Hero = () => {
  const openQuoteModal = () => {
    window.dispatchEvent(new Event('openQuoteModal'));
  };

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Enhanced background with organic patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-white via-warm-sand to-soft-apricot">
        {/* Organic floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage-green/10 organic-blob float opacity-60"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-misty-teal/10 organic-blob-2 float-delayed opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-mocha-mousse/8 organic-blob float opacity-50"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-organic-pattern opacity-30"></div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto mobile-spacing py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Logo integrato perfettamente */}
          <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 animate-fade-in">
            <div className="mb-6">
              <Logo size="xl" variant="transparent" />
            </div>
          </div>

          {/* Enhanced main heading with better typography */}
          <div className="mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-black text-high-contrast mb-6 sm:mb-8 leading-tight px-4">
              Più prenotazioni,<br />
              <span className="relative">
                <span className="gradient-text">meno buchi in agenda</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sage-green via-misty-teal to-mocha-mousse rounded-full opacity-60"></div>
              </span>
            </h2>
          </div>

          {/* Enhanced subtitle with better spacing */}
          <div className="mb-12 sm:mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-medium-contrast leading-relaxed font-light max-w-5xl mx-auto mb-6 sm:mb-8 px-4">
              Un sistema che trasforma Instagram e Facebook in una macchina di prenotazioni nei messaggi privati.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-high-contrast font-medium max-w-5xl mx-auto leading-relaxed px-4">
              I clienti prenotano (e se vuoi pagano) in pochi tocchi, senza rimbalzi tra siti e app che fanno scappare il cliente.
            </p>
          </div>

          {/* Enhanced demo info with glassmorphism */}
          <div className="glass rounded-wellness p-6 sm:p-8 md:p-10 max-w-3xl mx-auto mb-12 sm:mb-16 shadow-organic-lg animate-fade-in-up mx-4" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-sage-green mr-3" />
              <span className="text-xl sm:text-2xl font-serif font-bold text-high-contrast">Sistema nei messaggi privati</span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-readable leading-relaxed mb-4 sm:mb-6">
              I clienti ti scrivono nei messaggi privati di Instagram e Facebook, scelgono trattamento e orario, prenotano e ricevono conferma. Se vuoi, possono anche pagare online in anticipo oppure pagare in sede.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-readable leading-relaxed">
              Se ti serve, puoi aggiungere anche buoni regalo e trattamenti prepagati direttamente in chat.
            </p>
          </div>

          {/* Enhanced pricing teaser with fixed number clipping */}
          <div className="wellness-card p-6 sm:p-8 md:p-12 max-w-lg mx-auto mb-12 sm:mb-16 hover-lift animate-fade-in-up mx-4" style={{ animationDelay: '0.6s' }}>
            <div className="text-high-contrast">
              <div className="text-xl sm:text-2xl md:text-3xl text-high-contrast mb-4 sm:mb-6 font-bold">Prezzi personalizzabili</div>
              <div className="text-base sm:text-lg text-readable font-medium mb-3">Scegli i flussi che servono al tuo centro</div>
              <div className="text-sm sm:text-base text-sage-green-dark font-semibold">🎁 1 mese di manutenzione incluso dopo l'attivazione</div>
            </div>
          </div>

          {/* Enhanced CTA with better animation */}
          <div className="space-y-6 mb-16 sm:mb-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={openQuoteModal}
              className="wellness-button text-xl sm:text-2xl group w-full sm:w-auto px-12 py-6 animate-pulse-subtle relative overflow-hidden"
            >
              <span className="flex items-center justify-center relative z-10">
                Calcola il tuo preventivo personalizzato
                <ArrowRight className="ml-4 w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{animation: 'shimmer 3s ease-in-out infinite'}}></span>
            </button>
          </div>

          {/* Enhanced social proof stats with better visual design */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="wellness-card p-8 sm:p-10 hover-lift group">
              <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-sage-green to-sage-green-dark w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <p className="text-gray-900 font-bold text-xl mb-2">Più prenotazioni dai DM</p>
              <p className="text-gray-700 mt-2 font-medium">vs sistemi tradizionali</p>
            </div>

            <div className="wellness-card p-8 sm:p-10 hover-lift group">
              <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-misty-teal to-misty-teal-dark w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <p className="text-gray-900 font-bold text-xl mb-2">Libertà di prenotazione</p>
              <p className="text-gray-700 mt-2 font-medium">senza obbligo di pagamento</p>
            </div>

            <div className="wellness-card p-8 sm:p-10 hover-lift group">
              <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-mocha-mousse to-mocha-mousse-dark w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <p className="text-gray-900 font-bold text-xl mb-2">Risposte automatiche H24</p>
              <p className="text-gray-700 mt-2 font-medium">(opzionale)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced sticky CTA mobile */}
      <div className="fixed bottom-0 left-0 right-0 glass-dark backdrop-blur-lg border-t border-white/20 p-4 z-50 sm:hidden">
        <button
          onClick={openQuoteModal}
          className="w-full wellness-button text-base font-semibold animate-pulse-subtle"
        >
          Calcola Preventivo
        </button>
      </div>
    </section>
  );
};

export default Hero;