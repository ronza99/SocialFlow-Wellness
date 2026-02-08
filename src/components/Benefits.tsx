import React from 'react';
import { Instagram, Bot, CreditCard, Palette, Calculator, Shield, Users, Zap, Target, Gift, TrendingUp, Calendar, Sparkles, Brain, MessageSquare } from 'lucide-react';

const Benefits = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: Instagram,
      title: "Tutto nei social - Meno abbandoni",
      description: "Il cliente resta su Instagram e Facebook: chiede informazioni, prenota e, se vuoi, paga online in pochi tocchi. Niente app da scaricare e niente passaggi su siti esterni.",
      color: "from-sage-green to-sage-green-dark"
    },
    {
      icon: Target,
      title: "Acquisizione attiva vs gestione passiva",
      description: "Se fai sponsorizzate su Facebook/Instagram, puoi far arrivare le persone direttamente in chat. Da lì il percorso è semplice: informazioni chiare, scelta del servizio e prenotazione, senza telefonate.",
      color: "from-misty-teal to-misty-teal-dark"
    },
    {
      icon: Calendar,
      title: "Gestione calendario flessibile",
      description: "Puoi rendere non prenotabili alcuni giorni e orari (per tutto il centro o per singoli operatori). In quei momenti il sistema non propone disponibilità ai clienti.",
      color: "from-mocha-mousse to-mocha-mousse-dark"
    },
    {
      icon: Bot,
      title: "Automazione H24 intelligente",
      description: "Opzionale: una segreteria in chat che risponde alle domande più comuni (prezzi, durata, differenze tra trattamenti) e indirizza il cliente verso la scelta giusta. Non crea né modifica appuntamenti: informa e guida.",
      color: "from-sage-green to-sage-green-dark"
    },
    {
      icon: MessageSquare,
      title: "Riattivazione clienti automatica",
      description: "Opzionale su WhatsApp: promemoria appuntamento e messaggi di richiamo per chi non viene da un po', solo con consenso e testi chiari. Utile anche per chi ha iniziato un percorso e si è fermato.",
      color: "from-misty-teal to-misty-teal-dark"
    },
    {
      icon: CreditCard,
      title: "Gift Card con QR Code",
      description: "Opzionale: card e gift card digitali con codice/QR e registro utilizzi. La card è legata al trattamento, non a una data: chi la riceve ti scrive in chat e prenota quando preferisce.",
      color: "from-misty-teal to-misty-teal-dark"
    },
    {
      icon: Gift,
      title: "Coupon che spingono all'acquisto",
      description: "Coupon collegati alle card: sconto fisso in euro, personalizzabile. Perfetti per promozioni semplici (periodi più calmi, feste) senza confusione e senza gestione manuale.",
      color: "from-mocha-mousse to-mocha-mousse-dark"
    },
    {
      icon: Zap,
      title: "Sempre modificabile e aggiornabile",
      description: "Non è un sistema rigido: testi, prezzi, servizi e promozioni si possono aggiornare facilmente, mantenendo il percorso in chat chiaro per i clienti.",
      color: "from-sage-green to-sage-green-dark"
    },
    {
      icon: Palette,
      title: "Personalizzazione completa",
      description: "Vetrina digitale costruita su foto, testi e offerte del tuo centro. Ogni messaggio riflette il tuo brand e la tua personalità.",
      color: "from-misty-teal to-misty-teal-dark"
    },
    {
      icon: Shield,
      title: "Conformità GDPR integrata",
      description: "Gestione consensi e privacy: il cliente può scegliere se ricevere comunicazioni. I messaggi automatici (quando attivi WhatsApp) vengono impostati con testi chiari e nel rispetto delle regole della piattaforma.",
      color: "from-purple-600 to-purple-800"
    },
    {
      icon: Calculator,
      title: "Preventivo dinamico integrato",
      description: "In chat il cliente risponde a poche domande e riceve subito una stima chiara (servizio, durata, prezzo). Nessun modulo esterno da compilare, tutto dentro la conversazione.",
      color: "from-mocha-mousse to-mocha-mousse-dark"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-warm-sand via-soft-apricot to-cream-white section-divider">
      <div id="benefits" className="max-w-7xl mx-auto mobile-spacing">
        <div className="text-center mb-16 sm:mb-20">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-12 h-12 text-sage-green mr-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-high-contrast animate-fade-in px-2">
              Perché il tuo centro ha bisogno di{' '}
              <span className="gradient-text">SocialFlow Wellness</span>
            </h2>
          </div>
          
          {/* Enhanced Key statistics */}
          <div className="glass rounded-wellness p-8 sm:p-12 max-w-5xl mx-auto mb-12 sm:mb-16 shadow-organic-lg animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold gradient-text mb-3 sm:mb-4 md:mb-6">✓</div>
                <p className="text-sm sm:text-base md:text-lg text-readable leading-relaxed">Uscire dal social per prenotare può far perdere clienti perché richiede troppi passaggi</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold gradient-text mb-3 sm:mb-4 md:mb-6">40-60%</div>
                <p className="text-sm sm:text-base md:text-lg text-readable leading-relaxed">crescita delle conversioni con il funnel interno ai social</p>
              </div>
            </div>
          </div>

          {/* Enhanced Comparison */}
          <div className="wellness-card p-8 sm:p-12 max-w-6xl mx-auto mb-12 sm:mb-16 shadow-organic-lg animate-fade-in-up">
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-high-contrast mb-8 sm:mb-12">
              SocialFlow vs Software Tradizionali
            </h3>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="glass rounded-wellness p-8 sm:p-10 border-2 border-red-200 hover-lift">
                <h4 className="font-serif font-bold text-terracotta mb-8 flex items-center text-xl sm:text-2xl">
                  <Users className="w-8 h-8 mr-4" />
                  Software Tradizionali
                </h4>
                <ul className="text-readable space-y-4 sm:space-y-5 text-left">
                  <li className="flex items-start text-base sm:text-lg"><span className="text-terracotta mr-4 mt-1 text-xl flex-shrink-0">✗</span>Solo gestione passiva delle prenotazioni</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-terracotta mr-4 mt-1 text-xl flex-shrink-0">✗</span>App esterne: più passi = più abbandoni</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-terracotta mr-4 mt-1 text-xl flex-shrink-0">✗</span>Registrazioni obbligatorie = abbandoni</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-terracotta mr-4 mt-1 text-xl flex-shrink-0">✗</span>Limitazioni prenotazioni multiple</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-terracotta mr-4 mt-1 text-xl flex-shrink-0">✗</span>Poca acquisizione: non si collegano alle sponsorizzazioni</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-terracotta mr-4 mt-1 text-xl flex-shrink-0">✗</span>Sistemi rigidi e difficili da modificare</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-terracotta mr-4 mt-1 text-xl flex-shrink-0">✗</span>No-show frequenti senza pagamento anticipato</li>
                </ul>
              </div>
              <div className="glass rounded-wellness p-8 sm:p-10 border-2 border-sage-green hover-lift">
                <h4 className="font-serif font-bold text-sage-green-dark mb-8 flex items-center text-xl sm:text-2xl">
                  <Zap className="w-8 h-8 mr-4" />
                  SocialFlow Wellness
                </h4>
                <ul className="text-readable space-y-4 sm:space-y-5 text-left">
                  <li className="flex items-start text-base sm:text-lg"><span className="text-sage-green-dark mr-4 mt-1 text-xl flex-shrink-0">✓</span>Acquisizione + gestione in un unico sistema</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-sage-green-dark mr-4 mt-1 text-xl flex-shrink-0">✓</span>Tutto nei social che i clienti già usano</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-sage-green-dark mr-4 mt-1 text-xl flex-shrink-0">✓</span>Niente registrazioni = meno abbandoni</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-sage-green-dark mr-4 mt-1 text-xl flex-shrink-0">✓</span>Prenotazioni senza limiti inutili</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-sage-green-dark mr-4 mt-1 text-xl flex-shrink-0">✓</span>Ads Facebook/Instagram → Chat diretta = Vendita</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-sage-green-dark mr-4 mt-1 text-xl flex-shrink-0">✓</span>Modificabile velocemente in base alle esigenze del centro</li>
                  <li className="flex items-start text-base sm:text-lg"><span className="text-sage-green-dark mr-4 mt-1 text-xl flex-shrink-0">✓</span>Buoni regalo e trattamenti prepagati (se ti servono)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enhanced Fear addressing */}
          <div className="glass rounded-wellness p-8 sm:p-12 max-w-5xl mx-auto mb-12 sm:mb-16 shadow-organic animate-fade-in-up">
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-high-contrast mb-6 sm:mb-8">
              "La tecnologia mi spaventa"
            </h3>
            <p className="text-xl sm:text-2xl text-readable leading-relaxed">
              SocialFlow Wellness è il compromesso perfetto: il cliente si sente coccolato nella tua pagina; 
              tu non devi imparare un gestionale complicato. Tutto avviene dove già lavori ogni giorno.
            </p>
          </div>

          {/* Supporto tecnologico e formazione */}
          <div className="wellness-card p-8 sm:p-12 max-w-6xl mx-auto mb-12 sm:mb-16 shadow-organic-lg animate-fade-in-up">
            <div className="text-center mb-8 sm:mb-10">
              <div className="bg-gradient-to-br from-sage-green to-misty-teal w-20 h-20 sm:w-24 sm:h-24 rounded-wellness flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-organic">
                <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-high-contrast mb-6 sm:mb-8">
                Non Solo Strumenti: Ti Rendiamo Autonomo
              </h3>
              <p className="text-xl sm:text-2xl text-readable leading-relaxed mb-8 sm:mb-10">
                Non ti consegniamo un sistema e basta. Nel primo mese ti seguiamo nell'avvio e sistemiamo i dettagli emersi nell'uso reale.
                Poi puoi scegliere: assistenza mensile oppure ci contatti solo quando serve.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              <div className="glass rounded-wellness p-6 sm:p-8 hover-lift">
                <h4 className="font-serif font-bold text-sage-green-dark mb-4 sm:mb-6 flex items-center text-lg sm:text-xl">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  ✅ Il Nostro Approccio Unico
                </h4>
                <ul className="text-readable space-y-3 sm:space-y-4">
                  <li className="flex items-start">
                    <span className="text-sage-green-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Formazione personalizzata</strong> per ogni livello</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-green-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Accompagnamento graduale</strong> verso l'autonomia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-green-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Spiegazioni semplici</strong> senza tecnicismi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-green-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>1 mese di avvio incluso</strong> (correzioni e piccoli aggiustamenti)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-green-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Poi assistenza a scelta:</strong> mensile o a chiamata</span>
                  </li>
                </ul>
              </div>

              <div className="glass rounded-wellness p-6 sm:p-8 hover-lift">
                <h4 className="font-serif font-bold text-misty-teal-dark mb-4 sm:mb-6 flex items-center text-lg sm:text-xl">
                  <Target className="w-6 h-6 mr-3" />
                  🎯 Obiettivo: Autonomia Completa
                </h4>
                <ul className="text-readable space-y-3 sm:space-y-4">
                  <li className="flex items-start">
                    <span className="text-misty-teal-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Da "non capisco niente"</strong> a "gestisco tutto da solo"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-misty-teal-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Sicurezza nell'uso quotidiano</strong> del sistema</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-misty-teal-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Capacità di modificare</strong> prezzi e servizi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-misty-teal-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Capire i numeri</strong> e i risultati</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-misty-teal-dark mr-3 mt-1 text-xl">✓</span>
                    <span><strong>Team più competente</strong> e moderno</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-6 sm:p-8">
              <div className="text-center">
                <h5 className="font-serif font-bold text-white mb-3 sm:mb-4 text-lg sm:text-xl">
                  💡 La Nostra Promessa
                </h5>
                <p className="text-base sm:text-lg leading-relaxed">
                  Ti accompagniamo passo dopo passo nell'avvio. Dopo il primo mese puoi scegliere se avere un supporto mensile oppure chiamarci quando serve. La tecnologia deve semplificarti il lavoro, non complicarlo.
                </p>
              </div>
            </div>

            {/* Piani di assistenza disponibili */}
            <div className="mt-8 sm:mt-10 bg-soft-apricot rounded-wellness p-6 sm:p-8 border border-sage-green/20">
              <div className="text-center">
                <h5 className="font-serif font-bold text-gray-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                  🛡️ Piani di Assistenza Disponibili
                </h5>
                <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                  Non ti senti ancora sicuro? Offriamo servizi dopo la consegna finale 
                  per accompagnarti fino alla completa autonomia.
                </p>
                <button 
                  onClick={() => {
                    // Scroll direttamente alla sezione MaintenanceService
                    const maintenanceSection = document.querySelector('h2');
                    const allH2 = document.querySelectorAll('h2');
                    let targetSection = null;
                    
                    // Cerca il titolo che contiene "Servizio di Manutenzione"
                    allH2.forEach(h2 => {
                      if (h2.textContent && h2.textContent.includes('Servizio di Manutenzione')) {
                        targetSection = h2.closest('section');
                      }
                    });
                    
                    if (targetSection) {
                      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      // Fallback: cerca per classe o ID se disponibile
                      const fallbackSection = document.querySelector('[class*="maintenance"]') || 
                                            document.querySelector('section:has(h2:contains("🛡"))');
                      if (fallbackSection) {
                        fallbackSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  className="wellness-button-secondary text-base sm:text-lg"
                >
                  Scopri i Nostri Piani di Assistenza
                </button>
              </div>
            </div>
          </div>
          {/* Enhanced Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="wellness-card p-8 sm:p-10 hover-lift animate-fade-in-up">
                <div className={`bg-gradient-to-br ${benefit.color} w-16 h-16 sm:w-20 sm:h-20 rounded-wellness flex items-center justify-center mb-6 sm:mb-8 shadow-organic`}>
                  <benefit.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-high-contrast mb-4 sm:mb-6 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-readable leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Gift Card System */}
          <div className="glass rounded-wellness p-8 sm:p-12 max-w-5xl mx-auto shadow-organic-lg animate-fade-in-up">
            <div className="text-center">
              <div className="bg-gradient-to-br from-mocha-mousse to-mocha-mousse-dark w-20 h-20 sm:w-24 sm:h-24 rounded-wellness flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-organic">
                <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-high-contrast mb-6 sm:mb-8">
                Sistema Gift Card + Coupon Strategico
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 text-left">
                <div className="wellness-card p-6 sm:p-8 hover-lift">
                  <h4 className="font-serif font-bold text-mocha-mousse-dark mb-4 sm:mb-6 text-lg sm:text-xl">🎁 Gift Card con QR:</h4>
                  <ul className="text-readable space-y-3 sm:space-y-4">
                    <li className="flex items-start"><span className="text-sage-green-dark mr-3 mt-1">•</span>Il cliente acquista una card per sé o una gift card da regalare</li>
                    <li className="flex items-start"><span className="text-sage-green-dark mr-3 mt-1">•</span>Riceve in chat un codice/QR</li>
                    <li className="flex items-start"><span className="text-sage-green-dark mr-3 mt-1">•</span>La card è legata al trattamento (non a una data): può prenotare quando vuole</li>
                    <li className="flex items-start"><span className="text-sage-green-dark mr-3 mt-1">•</span>In sede si verifica in un attimo e si aggiorna il registro utilizzi</li>
                  </ul>
                </div>
                <div className="wellness-card p-6 sm:p-8 hover-lift">
                  <h4 className="font-serif font-bold text-mocha-mousse-dark mb-4 sm:mb-6 text-lg sm:text-xl">🎯 Coupon Strategici:</h4>
                  <ul className="text-readable space-y-3 sm:space-y-4">
                    <li className="flex items-start"><span className="text-sage-green-dark mr-3 mt-1">•</span>Sbloccano card scontate con sconto fisso in euro</li>
                    <li className="flex items-start"><span className="text-sage-green-dark mr-3 mt-1">•</span>Perfetti per periodi più calmi e festività</li>
                    <li className="flex items-start"><span className="text-sage-green-dark mr-3 mt-1">•</span>Utili anche per richiamare clienti che non vengono da un po' (se attivi WhatsApp)</li>
                    <li className="flex items-start"><span className="text-sage-green-dark mr-3 mt-1">•</span>Promozioni semplici, senza gestione manuale</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 sm:mt-20">
          <button
            onClick={scrollToPricing}
            className="wellness-button-secondary text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 animate-pulse-subtle"
          >
            Scopri i Prezzi Trasparenti
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;