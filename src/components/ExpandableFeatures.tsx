import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Instagram, Bot, CreditCard, ShoppingCart, MessageSquare, Calendar, Users, Zap, Gift, Brain, Phone, CheckCircle, RotateCcw, CalendarX, Shield, Package, Repeat } from 'lucide-react';

const ExpandableFeatures = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const toggleFeature = (featureId: string) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      id: 'social-booking',
      icon: Instagram,
      title: 'Prenotazioni Dirette sui Social',
      summary: 'I clienti prenotano in chat su Instagram e Facebook senza uscire dall\'app. (WhatsApp disponibile per reminder e follow-up, opzionale.)',
      color: 'bg-sage-green',
      details: {
        howItWorks: [
          'Il cliente apre i messaggi del centro e sceglie dal menu',
          'Può arrivare da Instagram, Facebook, QR code o sponsorizzazioni',
          'Sceglie tra: consulenza, trattamento singolo o pacchetto',
          'Il sistema mostra la disponibilità aggiornata dal calendario',
          'Seleziona data/ora e conferma in pochi tocchi',
          'Controllo automatico: riduce errori e doppie prenotazioni'
        ],
        benefits: [
          'Prenotazione guidata direttamente in chat',
          'Nessuna registrazione e nessun form esterno',
          'Disponibilità sempre allineata al calendario',
          'Riduce il rischio di conflitti di orario e doppie prenotazioni',
          'Flusso semplice: meno passaggi, meno frizioni'
        ],
        technical: [
          'Collegamento calendario (Google Calendar + CRM)',
          'Controllo conflitti e duplicazioni',
          'Sessione con timeout per evitare blocchi "in sospeso"',
          'Registro/backup su Google Sheets per tracciamento',
          'Esempio pratico: il cliente scrive "Prenota", sceglie servizio e orario, conferma.'
        ]
      }
    },
    {
      id: 'calendar-management',
      icon: CalendarX,
      title: 'Gestione Calendario Avanzata',
      summary: 'Blocca giorni e orari per tutto il centro o per singolo operatore: il bot aggiorna le disponibilità automaticamente.',
      color: 'bg-misty-teal',
      details: {
        howItWorks: [
          'Apri Google Calendar e seleziona giorni/orari da bloccare',
          'Scegli: centro intero o singolo operatore',
          'Confermi: le disponibilità si aggiornano in automatico',
          'I clienti vedono e possono scegliere solo gli slot liberi'
        ],
        benefits: [
          'Chiudi facilmente giorni/orari senza interventi manuali nel bot',
          'Interfaccia familiare: usi Google Calendar',
          'Disponibilità coerenti su tutti i canali collegati',
          'Riduce prenotazioni in orari non disponibili'
        ],
        technical: [
          'Sincronizzazione calendario ↔ sistema prenotazioni',
          'Aggiornamento automatico disponibilità per il bot',
          'Gestione blocchi: centro intero / operatori singoli',
          'Esempio pratico: chiudi "Sabato pomeriggio" su Calendar e sparisce subito dal bot.'
        ]
      }
    },
    {
      id: 'ecommerce-social',
      icon: ShoppingCart,
      title: 'Negozio nei Messaggi (Modulo Extra)',
      summary: 'Vendi prodotti (cosmetici, integratori, accessori) direttamente in chat con carrello, pagamento e gestione stock.',
      color: 'bg-mocha-mousse',
      details: {
        howItWorks: [
          'Il cliente sfoglia i prodotti direttamente nei messaggi',
          'Caroselli con foto, descrizione e pulsante "Aggiungi al carrello"',
          'Il carrello resta aperto per 15 minuti, poi si svuota automaticamente',
          'Al checkout, il sistema ricontrolla la disponibilità',
          'Dopo il pagamento: ordine registrato e stock aggiornato'
        ],
        benefits: [
          'Vendita guidata durante la conversazione',
          'Nessun sito e-commerce da gestire',
          'Riduce il rischio di vendere prodotti non disponibili',
          'Ordini tracciati e salvati per gestione semplice'
        ],
        technical: [
          'Stock gestito con quantità numeriche',
          'Carrello con timer (es. 15 minuti)',
          'Ricontrollo disponibilità prima del pagamento',
          'Scarico stock e registrazione ordine automatica (es. Google Sheets)',
          'Esempio pratico: il cliente aggiunge 2 prodotti, paga, e lo stock si aggiorna da solo.'
        ]
      }
    },
    {
      id: 'ai-assistant',
      icon: Bot,
      title: 'Assistente AI H24 (Modulo Extra)',
      summary: 'Risponde alle domande frequenti e orienta il cliente verso i servizi giusti.',
      color: 'bg-sage-green-dark',
      details: {
        howItWorks: [
          'Il cliente scrive nei messaggi e riceve risposta immediata',
          'L\'assistente risponde su trattamenti, prezzi, preparazione e policy',
          'Indirizza verso: prenotazione, pagamento, pacchetti o Gift Card',
          'Gestione preferenze: promozioni solo con consenso'
        ],
        benefits: [
          'Sempre disponibile anche fuori orario',
          'Riduce messaggi ripetitivi e carico sullo staff',
          'Risposte coerenti con il tono del centro'
        ],
        technical: [
          'AI per comprensione del linguaggio naturale',
          'Regole di sicurezza + soglie di utilizzo',
          'Esempio pratico: il cliente chiede "Che massaggio consigliate per schiena contratta?" e riceve una risposta guidata + invito a prenotare.'
        ]
      }
    },
    {
      id: 'payment-system',
      icon: CreditCard,
      title: 'Pagamenti Flessibili e Gift Card con QR',
      summary: 'Trattamenti singoli con scelta libera: paghi in sede oppure paghi online e ricevi un QR da mostrare in struttura.',
      color: 'bg-misty-teal-dark',
      details: {
        howItWorks: [
          'Per ogni trattamento singolo, il cliente sceglie: "Paga in sede" oppure "Paga ora"',
          'Se paga online, completa il pagamento e riceve un QR/codice univoco',
          'Il QR arriva direttamente in chat',
          'All\'arrivo, l\'operatore scansiona il QR e conferma',
          'Il sistema verifica validità e utilizzo (anti-duplicazione)',
          'La stessa logica si estende a pacchetti e abbonamenti (QR personale)'
        ],
        benefits: [
          'Libertà di scelta: online o in sede, senza frizioni',
          'Riduce il rischio di appuntamenti "dimenticati" quando si paga online',
          'Gift Card comode da regalare: QR pronto da usare',
          'Check-in più rapido e ordinato in reception',
          'Maggiore controllo: QR gestito dal sistema e tracciato'
        ],
        technical: [
          'Pagamenti Stripe integrati in chat',
          'Generazione automatica QR/codice univoco',
          'Verifica validità e collegamento all\'appuntamento (Make)',
          'Registro su Google Sheets per tracciamento e controlli',
          'Abbonamenti: verifica stato attivo durante lo scan',
          'Esempio pratico: il cliente paga online, riceve il QR in chat e lo mostra all\'arrivo.'
        ]
      }
    },
    {
      id: 'multi-slot-packages',
      icon: Package,
      title: 'Pacchetti Multi-Slot con Sblocco Progressivo',
      summary: 'Pacchetti con più trattamenti: il cliente prenota uno slot alla volta, e sblocca il successivo dopo aver completato il precedente.',
      color: 'bg-purple-600',
      details: {
        howItWorks: [
          'Ogni pacchetto include N trattamenti (slot)',
          'Gli slot vengono memorizzati nel profilo cliente',
          'Dopo aver prenotato il primo slot, i successivi restano bloccati',
          'In struttura, l\'operatore scansiona il QR e conferma',
          'La conferma sblocca lo slot successivo in automatico',
          'Il pacchetto resta attivo finché tutti gli slot non sono utilizzati'
        ],
        benefits: [
          'Più ordine: un appuntamento per volta, senza caos',
          'Riduce prenotazioni multiple "in anticipo" che poi saltano',
          'Controllo automatico: accesso bloccato finché lo slot non è completato',
          'Flessibilità: il cliente decide quando prenotare il prossimo trattamento',
          'Tracciamento chiaro: si vede sempre quanti slot restano'
        ],
        technical: [
          'Slot mappati su campi del profilo cliente',
          'Tag/condizioni di blocco per impedire accesso ai flussi',
          'Scan QR: rimuove blocco e aggiorna lo slot corrente',
          'Sblocco automatico dello slot successivo',
          'Pacchetto attivo fino a completamento totale',
          'Esempio pratico: finito il 1° trattamento, lo scan sblocca automaticamente la prenotazione del 2°.'
        ]
      }
    },
    {
      id: 'subscriptions',
      icon: Repeat,
      title: 'Abbonamenti Ricorrenti con QR Personale',
      summary: 'Abbonamenti mensili con pagamento automatico: QR personale e verifica dello stato attivo ad ogni scan.',
      color: 'bg-emerald-600',
      details: {
        howItWorks: [
          'Ogni piano ha un link di pagamento dedicato',
          'Il cliente attiva l\'abbonamento con pagamento ricorrente',
          'Il sistema aggiorna CRM/tag e genera un QR personale (con dati utili)',
          'Il QR è consultabile anche dal bot Telegram del centro per verifica rapida',
          'Ogni scan controlla che l\'abbonamento sia attivo',
          'Se non è attivo, il QR risulta non valido e viene richiesto un aggiornamento'
        ],
        benefits: [
          'Entrate mensili più stabili e gestibili',
          'QR personale: riconoscimento più rapido in reception',
          'Controllo automatico validità ad ogni accesso',
          'Verifica veloce tramite elenco abbonati attivi (Telegram)',
          'Gestione più ordinata di rinnovi e scadenze'
        ],
        technical: [
          'Stripe: link/piani di pagamento dedicati',
          'Aggiornamento CRM + tag all\'acquisto',
          'Generazione automatica QR con metadati',
          'Integrazione bot Telegram per consultazione rapida',
          'Verifica subscription ad ogni scan + stato attivo/scaduto automatico',
          'Esempio pratico: il cliente mostra il QR, lo scan conferma subito se l\'abbonamento è attivo.'
        ]
      }
    },
    {
      id: 'coupon-system',
      icon: Gift,
      title: 'Coupon Intelligenti e Gift Card',
      summary: '3 tipi di coupon (Nuovo Cliente, Inattivi, Standard) per sbloccare Gift Card scontate e accelerare la decisione, senza essere invadenti.',
      color: 'bg-mocha-mousse-dark',
      details: {
        howItWorks: [
          '3 famiglie di coupon: Nuovo Cliente, Inattivi, Standard',
          'Coupon Nuovo Cliente e Inattivi: restano tracciati anche dopo la scadenza (gestione controllata)',
          'Coupon Standard: si disattiva automaticamente a scadenza',
          'Scadenza e quantità sono controllate dal sistema',
          'I coupon sbloccano Gift Card scontate con "Paga ora" e QR personale',
          'Possibile integrazione in follow-up WhatsApp per riattivazioni (opzionale)'
        ],
        benefits: [
          'Aiuta a trasformare "mi informo" in "prenoto" con un incentivo chiaro',
          'Sconto visibile in chat: il cliente capisce subito il vantaggio',
          'Gift Card con QR: pronta da regalare o usare',
          'Riattivazione clienti inattivi con coupon dedicato',
          'Urgenza "soft": scadenza e quantità gestite in modo pulito'
        ],
        technical: [
          'Scadenza e quantità gestite con campi sistema (data + numero)',
          'Coupon Nuovo Cliente/Inattivi: tracciamento persistente (anti-perdita storico)',
          'Coupon Standard: disattivazione automatica',
          'Sblocco Gift Card scontate al momento dell\'acquisto + QR personale',
          'Integrazione follow-up WhatsApp (se attivo)',
          'Esempio pratico: il cliente riceve un coupon in chat, vede lo sconto e sblocca la Gift Card con QR.'
        ]
      }
    },
    {
      id: 'crm-integration',
      icon: Users,
      title: 'CRM, Calendario e Report Automatici',
      summary: 'HubSpot CRM con Google Calendar sincronizzato, assegnazione clienti (round robin) e report su Google Sheets.',
      color: 'bg-sage-green',
      details: {
        howItWorks: [
          'Ogni operatore ha il suo calendario Google personale',
          'Le nuove richieste vengono assegnate in modo ordinato e create nel calendario giusto',
          'Stati appuntamento visibili con etichette/colori (senza email automatiche ai partecipanti)',
          'Contatti, trattamenti e pagamenti vengono registrati nel CRM con collegamento al pagamento',
          'Report e tabelle su Google Sheets si aggiornano automaticamente',
          'Segmentazione/gestione clienti inattivi con regole configurabili'
        ],
        benefits: [
          'Visione completa di ogni cliente in un unico posto',
          'Calendari separati per operatore: più organizzazione',
          'Distribuzione più equilibrata del lavoro nel team',
          'Report sempre aggiornati per decisioni rapide',
          'Riconciliazione più semplice tra pagamenti e appuntamenti'
        ],
        technical: [
          'Assegnazione round robin con protezione anti-conflitto',
          'Gestione stati appuntamento via etichette/colori',
          'CRM collegato ai pagamenti Stripe (ID transazione/cliente)',
          'Report automatici su Google Sheets',
          'Regole per segmentazione/pulizia contatti inattivi'
        ],
        roundRobinExplanation: {
          title: 'Cos\'è il Round Robin?',
          description: 'È un metodo di assegnazione che distribuisce i nuovi clienti tra gli operatori disponibili in modo equilibrato.',
          example: 'Esempio pratico: con 3 operatori, il 1° va ad A, il 2° a B, il 3° a C, poi si ricomincia.'
        }
      }
    },
    {
      id: 'sms-followup',
      icon: Phone,
      title: 'Follow-up e Promemoria Automatici',
      summary: 'Messaggi automatici nei social e (opzionale) su WhatsApp: promemoria prima dell\'appuntamento e riattivazione clienti.',
      color: 'bg-misty-teal',
      details: {
        howItWorks: [
          'Dopo la prenotazione: follow-up nei messaggi social (nella finestra standard)',
          'Se serve contattare su WhatsApp fuori finestra: invio tramite template approvati (opzionale)',
          'Promemoria automatico prima dell\'appuntamento',
          'Il sistema rileva clienti inattivi (frequenza configurabile)',
          'Messaggio di riattivazione con incentivo/coupon (solo se consentito)',
          'Opt-in WhatsApp per promemoria e promozioni (se attivo)',
          'Preferenze rispettate: promozioni solo con consenso'
        ],
        benefits: [
          'Riduce il rischio di no-show con promemoria programmati',
          'Il cliente riceve aggiornamenti nel canale che preferisce',
          'Riattivazione "soft" di clienti fermi con coupon dedicato',
          'Comunicazioni promozionali solo se autorizzate',
          'Promemoria come comunicazioni di servizio',
          'Automazione che riduce gran parte del lavoro manuale'
        ],
        technical: [
          'Follow-up nei messaggi social (finestra standard)',
          'Template WhatsApp per comunicazioni fuori finestra',
          'Promemoria automatici prima dell\'appuntamento',
          'Rilevamento inattivi configurabile (es. ogni X settimane)',
          'Opt-in WhatsApp per utility e promozioni',
          'Coupon automatici per riattivazioni'
        ]
      }
    },
    {
      id: 'gdpr-compliance',
      icon: Shield,
      title: 'Conformità GDPR e Privacy',
      summary: 'Gestione consensi e preferenze del cliente, con tracciamento e blocchi automatici degli invii non consentiti.',
      color: 'bg-purple-600',
      details: {
        howItWorks: [
          'Richiesta consenso prima di raccogliere dati non necessari alla conversazione',
          'Informativa privacy chiara e comprensibile',
          'Se il cliente rifiuta, il sistema limita la raccolta ai soli dati indispensabili',
          'Consenso separato per comunicazioni promozionali (email/SMS/WhatsApp)',
          'Gestione automatica opt-in e opt-out, sempre modificabile'
        ],
        benefits: [
          'Approccio orientato alla conformità e alla trasparenza',
          'Il cliente controlla cosa riceve e su quale canale',
          'Riduce invii indesiderati grazie alle preferenze registrate',
          'Storico consensi utile in caso di verifica',
          'Aumenta fiducia e percezione di professionalità'
        ],
        technical: [
          'Moduli consenso integrati nel bot conversazionale',
          'Database consensi tracciato e separato',
          'Flag automatici per bloccare invii non consentiti',
          'Log consensi e modifiche (audit)',
          'Revoca consensi sempre disponibile (comando/link)'
        ],
        gdprDetails: {
          title: 'Come Funziona il Sistema GDPR',
          process: [
            {
              step: 'Informativa Privacy',
              description: 'Il cliente riceve un\'informativa chiara su come vengono usati i dati.',
              action: 'Cliente: può accettare o rifiutare.'
            },
            {
              step: 'Consenso Dati Personali',
              description: 'Richiesta specifica per i dati necessari (es. nome e contatto) in base al flusso.',
              action: 'Cliente: se rifiuta, il sistema limita la raccolta ai dati indispensabili.'
            },
            {
              step: 'Consenso Marketing',
              description: 'Richiesta separata per comunicazioni promozionali (canali selezionati).',
              action: 'Cliente: se rifiuta, non riceve messaggi promozionali.'
            },
            {
              step: 'Gestione Continua',
              description: 'Il cliente può modificare o revocare i consensi in qualsiasi momento.',
              action: 'Cliente: le preferenze vengono applicate automaticamente ai messaggi futuri.'
            }
          ]
        }
      }
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div id="expandable-features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-expandable-features>
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 px-4">
            🔧 Funzionalità Dettagliate
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light px-4 leading-relaxed">
            Clicca su "Più informazioni" per scoprire come funziona ogni componente del sistema
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature) => (
            <div key={feature.id} className="wellness-card overflow-hidden mx-4" data-feature-id={feature.id}>
              {/* Header sempre visibile */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center space-x-4 sm:space-x-6 flex-1">
                    <div className={`${feature.color} w-14 h-14 sm:w-16 sm:h-16 rounded-wellness flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed">{feature.summary}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFeature(feature.id)}
                    className="flex items-center space-x-2 sm:space-x-3 bg-warm-sand hover:bg-sage-green/10 px-6 sm:px-8 py-3 sm:py-4 rounded-wellness transition-colors flex-shrink-0 w-full sm:w-auto justify-center"
                    data-feature-button={feature.id}
                  >
                    <span className="text-sm sm:text-base font-medium text-gray-800">
                      {expandedFeature === feature.id ? 'Meno info' : 'Più informazioni'}
                    </span>
                    <div className="flex-shrink-0">
                      {expandedFeature === feature.id ? (
                        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Contenuto espandibile */}
              {expandedFeature === feature.id && (
                <div className="border-t border-sage-green/20 p-6 sm:p-8 md:p-10 bg-warm-sand">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                    {/* Come Funziona */}
                    <div>
                      <h4 className="font-serif font-bold text-gray-900 mb-6 sm:mb-8 flex items-center text-lg sm:text-xl">
                        <Zap className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-sage-green flex-shrink-0" />
                        Come Funziona
                      </h4>
                      <ul className="space-y-4 sm:space-y-5">
                        {feature.details.howItWorks.map((step, index) => (
                          <li key={index} className="text-base sm:text-lg text-gray-700 flex items-start leading-relaxed">
                            <span className="bg-sage-green/20 text-sage-green rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Vantaggi */}
                    <div>
                      <h4 className="font-serif font-bold text-gray-900 mb-6 sm:mb-8 flex items-center text-lg sm:text-xl">
                        <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-misty-teal flex-shrink-0" />
                        Vantaggi
                      </h4>
                      <ul className="space-y-4 sm:space-y-5">
                        {feature.details.benefits.map((benefit, index) => (
                          <li key={index} className="text-base sm:text-lg text-gray-700 flex items-start leading-relaxed">
                            <span className="text-misty-teal mr-4 mt-0.5 text-lg flex-shrink-0">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Integrazioni */}
                    <div>
                      <h4 className="font-serif font-bold text-gray-900 mb-6 sm:mb-8 flex items-center text-lg sm:text-xl">
                        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-mocha-mousse flex-shrink-0" />
                        Integrazioni
                      </h4>
                      <ul className="space-y-4 sm:space-y-5">
                        {feature.details.technical.map((tech, index) => (
                          <li key={index} className="text-base sm:text-lg text-gray-700 flex items-start leading-relaxed">
                            <span className="text-mocha-mousse mr-4 mt-0.5 text-lg flex-shrink-0">⚙️</span>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spiegazione Round Robin per CRM */}
                  {feature.id === 'crm-integration' && feature.details.roundRobinExplanation && (
                    <div className="mt-8 sm:mt-10 bg-soft-apricot rounded-wellness p-6 sm:p-8 border-l-4 border-sage-green">
                      <h5 className="font-serif font-bold text-sage-green-dark mb-4 sm:mb-6 flex items-center text-lg sm:text-xl">
                        <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 mr-3 flex-shrink-0" />
                        {feature.details.roundRobinExplanation.title}
                      </h5>
                      <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">{feature.details.roundRobinExplanation.description}</p>
                      <div className="bg-white/70 rounded-wellness p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          <strong>Esempio pratico:</strong> {feature.details.roundRobinExplanation.example}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Dettagli GDPR per Privacy */}
                  {feature.id === 'gdpr-compliance' && feature.details.gdprDetails && (
                    <div className="mt-8 sm:mt-10 bg-soft-apricot rounded-wellness p-6 sm:p-8 border-l-4 border-purple-600">
                      <h5 className="font-serif font-bold text-purple-800 mb-6 sm:mb-8 flex items-center text-lg sm:text-xl">
                        <Shield className="w-6 h-6 sm:w-7 sm:h-7 mr-3 flex-shrink-0" />
                        {feature.details.gdprDetails.title}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {feature.details.gdprDetails.process.map((step, index) => (
                          <div key={index} className="bg-white/70 rounded-wellness p-4 sm:p-6">
                            <h6 className="font-serif font-bold text-purple-800 mb-3 sm:mb-4 text-base sm:text-lg">
                              {index + 1}. {step.step}
                            </h6>
                            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{step.description}</p>
                            <p className="text-sm sm:text-base text-purple-700 font-medium">
                              <strong>Cliente:</strong> {step.action}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info finale senza CTA */}
        <div className="text-center mt-20">
          <div className="bg-soft-apricot rounded-wellness p-6 sm:p-8 md:p-10 max-w-4xl mx-auto border border-sage-green/20 mx-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
              Tutto collegato in un flusso unico
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Le funzionalità lavorano insieme (messaggi, calendario, pagamenti, CRM e report) per rendere il processo più semplice e tracciabile.
              Se vuoi, ti mostro una demo completa su un centro di prova.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandableFeatures;