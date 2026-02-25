import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Instagram, Bot, CreditCard, ShoppingCart, MessageSquare, Users, Zap, Gift, Phone, CheckCircle, RotateCcw, CalendarX, Shield, Package, Repeat, Star } from 'lucide-react';
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
    id: 'social-booking',
    icon: Instagram,
    title: 'Prenotazioni Dirette sui Social',
    summary: 'I clienti prenotano in chat su Instagram e Facebook, scegliendo operatore e orario, senza uscire dall\'app.',
    color: 'bg-sage-green',
    details: {
      howItWorks: [
        'Il cliente scrive nei messaggi e sceglie servizio, operatore e orario',
        'Il sistema mostra solo gli slot liberi del calendario in tempo reale',
        'Conferma in pochi tocchi, senza registrazioni o link esterni',
      ],
      benefits: [
        'Zero frizioni: nessun form, nessun sito da aprire',
        'Il cliente prenota con l\'operatore che preferisce',
        'Niente doppie prenotazioni o conflitti di orario',
      ],
      example: 'Il cliente scrive "Prenota" → sceglie servizio e operatore → seleziona l\'orario → conferma. Tutto in chat.'
    }
  },
  {
    id: 'calendar-management',
    icon: CalendarX,
    title: 'Gestione Calendario Avanzata',
    summary: 'Blocca giorni e orari per tutto il centro o per singolo operatore direttamente da Google Calendar.',
    color: 'bg-misty-teal',
    details: {
      howItWorks: [
        'Blocchi giorni o fasce orarie su Google Calendar come al solito',
        'Le disponibilità nel bot si aggiornano automaticamente',
        'Puoi bloccare il centro intero o un singolo operatore',
      ],
      benefits: [
        'Usi uno strumento che già conosci: Google Calendar',
        'Nessun intervento manuale sul bot',
        'I clienti vedono solo gli slot davvero disponibili',
      ],
      example: 'Blocchi "Sabato pomeriggio" su Calendar → sparisce subito dal bot, senza toccare nient\'altro.'
    }
  },
  {
    id: 'crm-integration',
    icon: Users,
    title: 'CRM, Calendario e Gestione Operatori',
    summary: 'Ogni prenotazione finisce in HubSpot con cliente, servizio e pagamento collegati. Report automatici su Google Sheets.',
    color: 'bg-sage-green',
    details: {
      howItWorks: [
        'Ogni prenotazione crea o aggiorna il contatto nel CRM',
        'Puoi scegliere: il cliente seleziona l\'operatore, oppure il sistema li assegna a rotazione',
        'Report e tabelle su Google Sheets si aggiornano da soli',
      ],
      benefits: [
        'Storico completo di ogni cliente in un posto solo',
        'Distribuzione equa del lavoro tra operatori',
        'Dati sempre aggiornati, zero inserimento manuale',
      ],
      example: 'Con 3 operatori: 1° appuntamento a Marco, 2° a Laura, 3° a Sofia. Il sistema bilancia automaticamente.'
    }
  },
  {
    id: 'sms-followup',
    icon: Phone,
    title: 'Follow-up e Promemoria Automatici',
    summary: 'Promemoria prima dell\'appuntamento e messaggi di riattivazione per i clienti fermi, tutto automatico.',
    color: 'bg-misty-teal',
    details: {
      howItWorks: [
        'Promemoria automatico inviato prima dell\'appuntamento',
        'Il sistema rileva i clienti inattivi e invia un messaggio di riattivazione',
        'Le promozioni partono solo se il cliente ha dato il consenso',
      ],
      benefits: [
        'Meno no-show grazie ai promemoria programmati',
        'Clienti dormienti riattivati senza lavoro manuale',
        'Comunicazioni sempre rispettose delle preferenze',
      ],
      example: 'Cliente fermo da 6 settimane → il sistema gli invia un coupon dedicato. Solo se ha acconsentito.'
    }
  },
  {
    id: 'gdpr-compliance',
    icon: Shield,
    title: 'Conformità GDPR e Privacy',
    summary: 'Gestione consensi integrata nel bot: il cliente sceglie cosa ricevere e su quale canale, con tracciamento automatico.',
    color: 'bg-misty-teal-dark',
    details: {
      howItWorks: [
        'Il bot raccoglie il consenso prima di qualsiasi invio promozionale',
        'Consensi separati per dati personali e marketing',
        'Il cliente può modificare o revocare in qualsiasi momento',
      ],
      benefits: [
        'Conformità senza burocrazia: tutto integrato nel flusso',
        'Il cliente controlla cosa riceve e su quale canale',
        'Storico consensi sempre disponibile in caso di verifica',
      ],
      example: 'Il cliente rifiuta le promozioni → il sistema blocca automaticamente tutti gli invii non autorizzati.'
    }
  },
];

const extraModules: Feature[] = [
  {
    id: 'ecommerce-social',
    icon: ShoppingCart,
    title: 'Negozio nei Messaggi',
    summary: 'Vendi cosmetici, integratori e accessori direttamente in chat, con carrello e pagamento integrati.',
    color: 'bg-mocha-mousse',
    isExtra: true,
    details: {
      howItWorks: [
        'Il cliente sfoglia i prodotti in chat con foto e descrizione',
        'Aggiunge al carrello (disponibile 15 minuti) e paga senza uscire dall\'app',
        'Lo stock si aggiorna automaticamente dopo ogni ordine',
      ],
      benefits: [
        'Vendite extra senza gestire un sito e-commerce',
        'Esperienza d\'acquisto fluida e guidata',
        'Ordini e stock sempre tracciati',
      ],
      example: 'Il cliente aggiunge 2 prodotti, paga in chat → l\'ordine viene registrato e lo stock scalato in automatico.'
    }
  },
  {
    id: 'ai-assistant',
    icon: Bot,
    title: 'Assistente AI H24',
    summary: 'Risponde alle domande più comuni e guida il cliente verso il servizio giusto, anche fuori orario.',
    color: 'bg-sage-green-dark',
    isExtra: true,
    details: {
      howItWorks: [
        'Il cliente scrive una domanda e riceve risposta immediata',
        'L\'AI conosce i tuoi trattamenti, prezzi e policy',
        'Se serve, indirizza verso la prenotazione o il pagamento',
      ],
      benefits: [
        'Risposte immediate 24/7, anche nel weekend',
        'Meno messaggi ripetitivi da gestire manualmente',
        'Tono coerente con quello del tuo centro',
      ],
      example: '"Che massaggio consigliate per la cervicale?" → risposta guidata + invito a prenotare, in pochi secondi.'
    }
  },
  {
    id: 'payment-system',
    icon: CreditCard,
    title: 'Pagamenti Flessibili e Gift Card con QR',
    summary: 'Il cliente sceglie: paga in sede o paga online e riceve un QR da mostrare all\'arrivo.',
    color: 'bg-misty-teal-dark',
    isExtra: true,
    details: {
      howItWorks: [
        'Per ogni trattamento: il cliente sceglie "Paga in sede" o "Paga ora"',
        'Se paga online, riceve un QR univoco direttamente in chat',
        'All\'arrivo l\'operatore scansiona il QR: valido, anti-duplicazione',
      ],
      benefits: [
        'Nessuna frizione: ognuno paga come preferisce',
        'Gift Card pronte da regalare con QR personale',
        'Check-in più rapido e ordinato in reception',
      ],
      example: 'Il cliente paga online → riceve il QR in chat → lo mostra all\'arrivo → check-in in 5 secondi.'
    }
  },
  {
    id: 'multi-slot-packages',
    icon: Package,
    title: 'Pacchetti Multi-Slot con Sblocco Progressivo',
    summary: 'Il cliente compra un pacchetto e prenota uno slot alla volta: il successivo si sblocca solo dopo aver completato il precedente.',
    color: 'bg-mocha-mousse',
    isExtra: true,
    details: {
      howItWorks: [
        'Il cliente acquista il pacchetto e prenota il primo trattamento',
        'Gli slot successivi sono bloccati finché non viene completato quello attivo',
        'Lo scan del QR in struttura sblocca automaticamente lo slot successivo',
      ],
      benefits: [
        'Niente prenotazioni "a tappeto" che poi saltano',
        'Il cliente decide quando usare i trattamenti restanti',
        'Sempre chiaro quanti slot sono rimasti',
      ],
      example: 'Finito il 1° trattamento, lo scan del QR sblocca subito la possibilità di prenotare il 2°.'
    }
  },
  {
    id: 'subscriptions',
    icon: Repeat,
    title: 'Abbonamenti Ricorrenti con QR Personale',
    summary: 'Piani mensili con pagamento automatico. QR personale verificato ad ogni accesso.',
    color: 'bg-sage-green-dark',
    isExtra: true,
    details: {
      howItWorks: [
        'Il cliente attiva l\'abbonamento con pagamento ricorrente',
        'Riceve un QR personale con il suo stato abbonamento',
        'Ogni scan verifica in tempo reale se l\'abbonamento è attivo',
      ],
      benefits: [
        'Entrate mensili stabili, rinnovi automatici',
        'Accesso in reception più rapido con il QR',
        'Se l\'abbonamento è scaduto, il QR non è valido: niente errori',
      ],
      example: 'Il cliente mostra il QR → lo scan conferma subito se è attivo o scaduto, senza cercarlo manualmente.'
    }
  },
  {
    id: 'coupon-system',
    icon: Gift,
    title: 'Coupon Intelligenti e Gift Card',
    summary: '3 tipi di coupon (Nuovo Cliente, Inattivi, Standard) per incentivare la prima prenotazione o riattivare chi non viene da un po\'.',
    color: 'bg-misty-teal',
    isExtra: true,
    details: {
      howItWorks: [
        '3 famiglie di coupon con regole diverse: nuovo cliente, inattivo, standard',
        'Ogni coupon sblocca una Gift Card scontata con QR personale',
        'Scadenza e quantità gestite in automatico dal sistema',
      ],
      benefits: [
        'Trasforma i curiosi in clienti con un incentivo chiaro',
        'Riattiva chi non prenota da tempo senza essere invasivo',
        'Urgenza "soft": scadenza visibile, nessun spam',
      ],
      example: 'Il cliente riceve un coupon in chat, vede lo sconto in tempo reale e sblocca la Gift Card con QR.'
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
      className={`overflow-hidden mx-4 rounded-2xl border transition-all ${
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
              {expandedFeature === feature.id ? 'Chiudi' : 'Scopri di più'}
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
            Funzionalità Dettagliate
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-light px-4">
            Espandi ogni voce per capire come funziona e cosa ti cambia concretamente
          </p>
        </div>

        <div className="mb-4 mx-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px bg-gray-200 flex-1" />
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-sage-green" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Flussi Inclusi</span>
            </div>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <p className="text-xs text-gray-400 text-center mb-6">Sempre presenti in ogni configurazione</p>
        </div>

        <div className="space-y-4 mb-12">
          {coreFeatures.map((feature) => renderFeatureCard(feature))}
        </div>

        <div className="mb-4 mx-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px bg-amber-200 flex-1" />
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Moduli Extra</span>
            </div>
            <div className="h-px bg-amber-200 flex-1" />
          </div>
          <p className="text-xs text-amber-600/60 text-center mb-6">Funzionalità opzionali aggiungibili alla configurazione base</p>
        </div>

        <div className="space-y-4">
          {extraModules.map((feature) => renderFeatureCard(feature))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-soft-apricot rounded-wellness p-6 sm:p-8 max-w-3xl mx-auto border border-sage-green/20">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3">
              Tutto collegato in un flusso unico
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Messaggi, calendario, pagamenti, CRM e report lavorano insieme. Se vuoi, ti mostro una demo completa su un centro di prova.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandableFeatures;
