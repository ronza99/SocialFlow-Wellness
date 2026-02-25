import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bot, CreditCard, ShoppingCart, Zap, Gift, Phone, CheckCircle, Calendar, Package, Star, Repeat } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToPricingSection } from '../utils/navigation';

interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  summary: string;
  color: string;
  isExtra?: boolean;
  details: {
    howItWorks: string[];
    benefits: string[];
    example?: string;
  };
}

const coreFeatures: Feature[] = [
  {
    id: 'bookings',
    icon: Calendar,
    title: 'Prenotazioni in chat',
    summary: 'I clienti prenotano direttamente su Instagram o Facebook, scegliendo trattamento, operatore e orario senza uscire dall\'app.',
    color: 'bg-sage-green',
    details: {
      howItWorks: [
        'Il cliente scrive nei messaggi e sceglie il trattamento',
        'Il sistema mostra solo le fasce orarie libere del calendario in tempo reale',
        'Conferma in pochi tocchi, senza registrazioni o link esterni',
      ],
      benefits: [
        'Zero frizioni: nessun form, nessun sito da aprire',
        'Niente doppie prenotazioni o conflitti di orario',
        'Registro organizzato di tutte le prenotazioni senza intervento manuale',
      ],
      example: 'Il cliente scrive "Prenota" → sceglie trattamento e orario → conferma. Tutto in chat, in meno di 2 minuti.'
    }
  },
  {
    id: 'subscriptions',
    icon: Repeat,
    title: 'Abbonamenti ricorrenti',
    summary: 'Piani mensili con pagamento automatico, rinnovi e tracciamento dello stato attivo o scaduto per ogni cliente.',
    color: 'bg-misty-teal',
    details: {
      howItWorks: [
        'Il cliente attiva l\'abbonamento con pagamento ricorrente direttamente in chat',
        'Il sistema aggiorna automaticamente lo stato attivo/scaduto',
        'Il cliente riceve un codice QR personale da mostrare per accedere in struttura',
      ],
      benefits: [
        'Entrate mensili stabili, rinnovi automatici senza intervento',
        'Sempre chiaro chi ha l\'abbonamento attivo e chi no',
        'Accesso in reception piu\' rapido: basta mostrare il codice QR personale',
      ],
      example: 'Il cliente mostra il codice QR → la lettura conferma subito se l\'abbonamento e\' attivo o scaduto, senza cercarlo manualmente.'
    }
  },
  {
    id: 'cosmetics',
    icon: ShoppingCart,
    title: 'Vendita cosmetici in chat',
    summary: 'Vendi creme, olii e prodotti direttamente in chat: il cliente sfoglia, aggiunge al carrello e paga senza aprire nessun sito.',
    color: 'bg-mocha-mousse',
    details: {
      howItWorks: [
        'Il cliente sfoglia i prodotti in chat con foto e descrizione',
        'Aggiunge al carrello e paga senza uscire dall\'app',
        'Lo stock si aggiorna automaticamente dopo ogni ordine',
      ],
      benefits: [
        'Vendite extra senza gestire un negozio online separato',
        'Esperienza d\'acquisto guidata durante la conversazione',
        'Ordini e stock sempre tracciati, zero inserimento manuale',
      ],
      example: 'Il cliente aggiunge 2 prodotti, paga in chat → l\'ordine viene registrato e lo stock scalato in automatico.'
    }
  },
];

const extraModules: Feature[] = [
  {
    id: 'ai-assistant',
    icon: Bot,
    title: 'Segretaria AI in chat',
    summary: 'Un assistente virtuale che risponde alle domande frequenti su trattamenti, prezzi e regole del centro, anche fuori orario.',
    color: 'bg-sage-green-dark',
    isExtra: true,
    details: {
      howItWorks: [
        'Il cliente scrive una domanda e riceve risposta immediata',
        'L\'AI conosce i tuoi trattamenti, durate, prezzi e policy',
        'Guida il cliente verso il flusso giusto (prenotazione, abbonamento, ecc.)',
      ],
      benefits: [
        'Risposte immediate 24/7, anche nel weekend e fuori orario',
        'Meno messaggi ripetitivi da gestire manualmente',
        'Non crea o modifica appuntamenti: informa e guida soltanto',
      ],
      example: '"Che differenza c\'e\' tra il pacchetto 5 e 10 sedute?" → risposta dettagliata + invito a prenotare, in pochi secondi.'
    }
  },
  {
    id: 'gift-cards',
    icon: Gift,
    title: 'Buoni trattamento e buoni regalo digitali (con codici sconto)',
    summary: 'Vendi trattamenti prepagati e buoni regalo con codice QR. Aggiungi codici sconto per promozioni o per richiamare clienti fermi.',
    color: 'bg-misty-teal',
    isExtra: true,
    details: {
      howItWorks: [
        'Il cliente acquista un buono trattamento o un buono regalo direttamente in chat',
        'Riceve un codice personale o un codice QR da mostrare in struttura',
        'I codici sconto vengono applicati automaticamente al momento del pagamento',
      ],
      benefits: [
        'Se un appuntamento salta, il trattamento resta prepagato e si usa piu\' avanti',
        'Buoni regalo pronti da condividere, senza logistica fisica',
        'Codici sconto utili per richiamare clienti inattivi senza essere invasivi',
      ],
      example: 'Il cliente riceve un codice sconto in chat, vede lo sconto applicato in tempo reale e acquista il buono regalo con codice QR.'
    }
  },
  {
    id: 'packages',
    icon: Package,
    title: 'Pacchetti di sedute',
    summary: 'Gestione pacchetti personalizzabili (es. 5 o 10 sedute): il sistema tiene il conto di quelle usate e di quelle rimanenti.',
    color: 'bg-mocha-mousse',
    isExtra: true,
    details: {
      howItWorks: [
        'Il cliente acquista il pacchetto e prenota la prima seduta',
        'Il sistema traccia sedute usate e rimanenti nel profilo del cliente',
        'Ogni seduta completata aggiorna automaticamente il contatore',
      ],
      benefits: [
        'Sai sempre a che punto e\' il cliente nel suo percorso',
        'Semplifica il pagamento anticipato senza confusione',
        'Da\' continuita\' al trattamento e riduce i clienti che si fermano a meta\'',
      ],
      example: 'Cliente con pacchetto da 10 sedute: dopo la 3a, il sistema mostra automaticamente "7 sedute rimanenti".'
    }
  },
  {
    id: 'whatsapp',
    icon: Phone,
    title: 'Promemoria e messaggi di richiamo su WhatsApp',
    summary: 'Messaggi automatici su WhatsApp per ricordare gli appuntamenti e ricontattare i clienti fermi, solo con il loro consenso.',
    color: 'bg-misty-teal-dark',
    isExtra: true,
    details: {
      howItWorks: [
        'Promemoria automatico il giorno prima dell\'appuntamento',
        'Il sistema rileva i clienti inattivi e invia un richiamo soft',
        'I messaggi partono solo se il cliente ha dato il consenso',
      ],
      benefits: [
        'Meno assenze ingiustificate grazie ai promemoria programmati',
        'Clienti fermi riattivati senza lavoro manuale',
        'Comunicazioni sempre nel rispetto delle preferenze del cliente',
      ],
      example: 'Cliente fermo da 6 settimane → messaggio automatico con richiamo soft. Solo se ha acconsentito, mai spam.'
    }
  },
];

const ExpandableFeatures = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleFeature = (featureId: string) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  const renderFeatureCard = (feature: Feature) => (
    <div
      key={feature.id}
      className={`overflow-hidden rounded-2xl border transition-all ${
        feature.isExtra
          ? 'border-amber-200 bg-amber-50/20'
          : 'wellness-card border-transparent'
      }`}
      data-feature-id={feature.id}
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-4 flex-1">
            <div className={`${feature.color} w-12 h-12 sm:w-14 sm:h-14 rounded-wellness flex items-center justify-center flex-shrink-0`}>
              <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-gray-900">{feature.title}</h3>
                {feature.isExtra && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200 whitespace-nowrap">
                    <Star className="w-3 h-3" />
                    Modulo Extra
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.summary}</p>
            </div>
          </div>
          <button
            onClick={() => toggleFeature(feature.id)}
            className="flex items-center space-x-2 bg-warm-sand hover:bg-sage-green/10 px-5 py-2.5 rounded-wellness transition-colors flex-shrink-0 w-full sm:w-auto justify-center"
            data-feature-button={feature.id}
          >
            <span className="text-sm font-medium text-gray-700">
              {expandedFeature === feature.id ? 'Chiudi' : 'Scopri di piu\''}
            </span>
            {expandedFeature === feature.id ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {expandedFeature === feature.id && (
        <div className="border-t border-sage-green/20 px-6 pb-6 sm:px-8 sm:pb-8 pt-6 bg-warm-sand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm uppercase tracking-wide">
                <Zap className="w-4 h-4 mr-2 text-sage-green flex-shrink-0" />
                Come funziona
              </h4>
              <ul className="space-y-3">
                {feature.details.howItWorks.map((step, index) => (
                  <li key={index} className="text-sm sm:text-base text-gray-700 flex items-start leading-relaxed">
                    <span className="bg-sage-green/20 text-sage-green rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm uppercase tracking-wide">
                <CheckCircle className="w-4 h-4 mr-2 text-misty-teal flex-shrink-0" />
                Cosa cambia per te
              </h4>
              <ul className="space-y-3">
                {feature.details.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm sm:text-base text-gray-700 flex items-start leading-relaxed">
                    <span className="text-misty-teal mr-3 mt-0.5 flex-shrink-0">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {feature.details.example && (
            <div className="mt-5 bg-white/60 rounded-xl px-4 py-3 border border-sage-green/15">
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-700">Esempio pratico: </span>
                {feature.details.example}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div id="expandable-features" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" data-expandable-features>
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 px-4">
            Funzionalita\' Dettagliate
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-light px-4">
            Espandi ogni voce per capire come funziona e cosa cambia concretamente per il tuo centro
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px bg-gray-200 flex-1" />
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-sage-green" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Moduli Principali</span>
            </div>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <p className="text-xs text-gray-400 text-center mb-6">I tre moduli base del sistema, attivabili singolarmente o in combinazione</p>
        </div>

        <div className="space-y-4 mb-12">
          {coreFeatures.map((feature) => renderFeatureCard(feature))}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px bg-amber-200 flex-1" />
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Moduli Extra</span>
            </div>
            <div className="h-px bg-amber-200 flex-1" />
          </div>
          <p className="text-xs text-amber-600/60 text-center mb-6">Moduli aggiuntivi che potenziano il sistema base</p>
        </div>

        <div className="space-y-4">
          {extraModules.map((feature) => renderFeatureCard(feature))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-soft-apricot rounded-wellness p-6 sm:p-8 max-w-3xl mx-auto border border-sage-green/20">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3">
              Tutto collegato in un percorso unico
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              I moduli lavorano insieme: messaggi, calendario, pagamenti e storico clienti in un unico sistema. Se vuoi, ti mostro una prova completa su un centro campione.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandableFeatures;
