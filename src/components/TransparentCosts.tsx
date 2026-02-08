import React from 'react';
import { DollarSign, Shield, Info, CheckCircle } from 'lucide-react';

const TransparentCosts = () => {
  const openQuoteModal = () => {
    window.dispatchEvent(new Event('openQuoteModal'));
  };

  const externalServices = [
    {
      name: "ManyChat",
      cost: "€13.95/mese",
      description: "Assistente automatico per Instagram e Facebook",
      note: "Intestato a te, paghi direttamente a ManyChat"
    },
    {
      name: "Make.com",
      cost: "€8.37/mese",
      description: "Collega automaticamente i vari servizi tra loro",
      note: "Intestato a te, paghi direttamente a Make"
    },
    {
      name: "HubSpot",
      cost: "€20/mese",
      description: "Gestione clienti e calendario appuntamenti",
      note: "Intestato a te, paghi direttamente a HubSpot"
    },
    {
      name: "Stripe",
      cost: "1.5% + €0.25",
      description: "Solo sui pagamenti effettivi ricevuti",
      note: "Commissioni bancarie standard, nessun ricarico"
    },
    {
      name: "WhatsApp",
      cost: "€0.07/messaggio",
      description: "Promemoria automatici (opzionale)",
      note: "Solo se attivi i messaggi su WhatsApp"
    }
  ];

  return (
    <section className="py-24 bg-warm-sand">
      <div id="transparent-costs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 sm:mb-8 px-2">
            Costi dei Servizi Esterni
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-light px-4">
            Totale trasparenza sui servizi esterni - nessuna sorpresa, nessun ricarico nascosto
          </p>
        </div>

        {/* Spiegazione principale */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="wellness-card p-12">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-sage-green mx-auto mb-6" />
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                Il Sistema Resta Tuo
              </h3>
              <div className="bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-8 mb-8">
                <p className="text-xl font-bold mb-4">Paghi una sola volta il setup iniziale, poi il sistema resta tuo.</p>
                <p className="text-lg">I servizi esterni sono intestati a te e li paghi direttamente ai fornitori, al loro costo reale.</p>
              </div>
            </div>

            <div className="bg-soft-apricot rounded-wellness border border-mocha-mousse/20 p-8 mb-8">
              <div className="flex items-start">
                <Info className="w-8 h-8 text-mocha-mousse mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-mocha-mousse mb-4 text-xl">
                    Importante: Nessun Ricarico
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Questi sono canoni di piattaforme terze (ManyChat, HubSpot, ecc.), non miei markup. 
                    Paghi direttamente ai fornitori al loro costo reale, senza ricarichi nascosti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Costo minimo mensile */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="wellness-card p-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Costo minimo mensile (flussi base)
            </h3>

            <div className="bg-warm-sand rounded-wellness p-8 mb-6">
              <p className="text-lg text-gray-700 mb-6 text-center">
                Per far funzionare i flussi base, il costo minimo degli strumenti è indicativamente:
              </p>

              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-wellness p-4 border border-sage-green/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">1 operatore:</span>
                    <span className="text-xl font-serif font-bold text-sage-green">da 57 €/mese</span>
                  </div>
                </div>

                <div className="bg-white rounded-wellness p-4 border border-sage-green/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">2–4 operatori:</span>
                    <span className="text-xl font-serif font-bold text-sage-green">da 77 a 157 €/mese</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-6 text-center italic">
                (IVA esclusa. I moduli opzionali possono aggiungere costi variabili.)
              </p>
            </div>

            <div className="bg-soft-apricot rounded-wellness border border-mocha-mousse/20 p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Commissioni pagamenti (Stripe):</h4>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Solo sui pagamenti effettivi ricevuti:</span>
                <span className="text-lg font-semibold text-mocha-mousse">1.5% + €0.25</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 italic">
                Commissioni bancarie standard, nessun ricarico
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={openQuoteModal}
            className="wellness-button text-xl px-12 py-6 animate-pulse-subtle"
          >
            Scopri il Listino Completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransparentCosts;