import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToPricingSection } from '../utils/navigation';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'Come prenotano i clienti?',
      answer: 'Prenotano scrivendo nei messaggi privati di Instagram/Facebook, scegliendo trattamento e orario e confermando in chat.'
    },
    {
      id: 2,
      question: 'WhatsApp si usa per prenotare?',
      answer: 'No: WhatsApp (se attivo) serve per promemoria, follow-up e coupon/promozioni, non per le prenotazioni.'
    },
    {
      id: 3,
      question: 'Dove vedo le prenotazioni?',
      answer: 'Le vedi nel Calendario Google sincronizzato del centro (e, se previsto, anche nei calendari degli operatori).'
    },
    {
      id: 4,
      question: 'Se non sono pratico con tecnologia e computer, riuscirò a usarlo?',
      answer: 'Sì: all\'inizio hai un mese di assistenza incluso, puoi fare domande quando serve e facciamo più chiamate insieme in cui ti mostro passo-passo come si usa, perché è mia premura rendere il centro autonomo e pratico nel tempo, visto che oggi tecnologia e social sono sempre più importanti.'
    },
    {
      id: 5,
      question: 'Il cliente può scegliere l\'operatore o viene assegnato in automatico?',
      answer: 'Puoi impostare l\'assegnazione automatica in base alle disponibilità oppure far scegliere al cliente il suo operatore preferito (se disponibile per quel trattamento).'
    },
    {
      id: 6,
      question: 'Possiamo scegliere come paga il cliente?',
      answer: 'Sì: puoi offrire pagamento in sede oppure pagamento online in pochi clic, o entrambe le opzioni a seconda del servizio.'
    },
    {
      id: 7,
      question: 'Se vendiamo pacchetti (es. 5 sedute), come si tiene il conto?',
      answer: 'Il sistema gestisce i pacchetti a "sedute" e tiene traccia di usate e rimanenti.'
    },
    {
      id: 8,
      question: 'E gli abbonamenti mensili come funzionano?',
      answer: 'Si impostano contenuto, prezzo e regole, e se si usa il pagamento online i rinnovi risultano più semplici da gestire.'
    },
    {
      id: 9,
      question: 'Come gestiamo orari, chiusure e pause tra appuntamenti?',
      answer: 'Si configurano giorni/orari, chiusure e il "tempo di pausa" tra appuntamenti, così in chat il cliente vede solo disponibilità reali.'
    },
    {
      id: 10,
      question: 'I promemoria partono da soli o devo ricordarmeli io?',
      answer: 'Una volta impostati, promemoria e follow-up possono partire automaticamente (su DM e/o WhatsApp, se attivo).'
    },
    {
      id: 11,
      question: 'Se un giorno non voglio più supporto, perdo tutto?',
      answer: 'No: file, calendari e impostazioni vengono messi negli account del centro, quindi la struttura resta tua e i dati dei clienti rimangono nella tua infrastruttura.'
    },
    {
      id: 12,
      question: 'Se un cliente fa domande (prezzi, orari, parcheggio, "che trattamento mi consigliate"), come funziona?',
      answer: 'Può ricevere risposte automatiche alle domande frequenti e poi essere indirizzato alla prenotazione, senza che tu debba riscrivere sempre le stesse cose.'
    },
    {
      id: 13,
      question: 'Se un cliente ha un caso particolare e vuole parlare con una persona, si può fare?',
      answer: 'Sì: in chat trova subito il numero/contatto del centro per parlare con una persona, e se vuoi la richiesta viene anche segnalata allo staff.'
    },
    {
      id: 14,
      question: 'Possiamo vendere gift card e coupon con un codice controllabile?',
      answer: 'Sì: gift card e coupon hanno un codice/QR e c\'è un registro per controllare utilizzi e validità.'
    },
    {
      id: 15,
      question: 'Possiamo vendere anche prodotti o servizi extra direttamente in chat?',
      answer: 'Sì: si possono aggiungere prodotti o extra acquistabili in chat, senza mandare il cliente su un sito esterno.'
    },
    {
      id: 16,
      question: 'Posso avere un riepilogo semplice di prenotazioni, incassi e andamento?',
      answer: 'Sì: vedi le trattative concluse (gift card, abbonamenti e acquisti dal catalogo) e, per le prenotazioni, hai grafici e tabelle in un foglio per capire quali trattamenti vanno di più e quali operatori ne fanno di più.'
    }
  ];

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-br from-warm-sand via-soft-apricot to-cream-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-sage-green mr-4" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Domande frequenti (FAQ)
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Risposte rapide per capire come funziona, senza tecnicismi.
          </p>
        </div>

        <div className="wellness-card overflow-hidden">
          <button
            onClick={toggleFAQ}
            className="w-full p-6 sm:p-8 flex items-center justify-between group hover:bg-sage-green/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 rounded-wellness"
            aria-expanded={isOpen}
            aria-controls="faq-content"
          >
            <div className="flex items-center gap-4">
              <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-sage-green flex-shrink-0" />
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-sage-green-dark transition-colors text-left">
                {isOpen ? 'Nascondi le FAQ' : 'Mostra tutte le FAQ'} ({faqItems.length} domande)
              </span>
            </div>
            <div className="flex-shrink-0">
              {isOpen ? (
                <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8 text-sage-green transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-sage-green group-hover:scale-110 transition-all duration-300" />
              )}
            </div>
          </button>

          <div
            id="faq-content"
            className={`transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
            role="region"
          >
            <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <div className="border-t border-sage-green/20 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
                {faqItems.map((item) => (
                  <div key={item.id} className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 flex items-start gap-3">
                      <span className="text-sage-green flex-shrink-0">Q:</span>
                      <span>{item.question}</span>
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed pl-6 sm:pl-8">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <div className="wellness-card p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-4">
              Altre domande?
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Se hai altre domande o vuoi capire meglio come funziona, contattami e ti mostro una demo personalizzata con un centro fittizio.
            </p>
            <button
              onClick={() => {
                scrollToPricingSection(location.pathname, navigate);
              }}
              className="wellness-button-secondary text-base sm:text-lg"
            >
              Richiedi Preventivo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
