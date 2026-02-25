import React from 'react';
import { Bell, UserCheck, ChevronRight, Shield, Info } from 'lucide-react';

const benefitCards = [
  {
    icon: Bell,
    color: 'bg-sage-green/10 text-sage-green',
    border: 'border-sage-green/25',
    title: 'Promemoria appuntamento',
    bullets: [
      'Il cliente riceve un messaggio il giorno prima: meno dimenticanze, meno buchi in agenda.',
      'Il promemoria è automatico: non devi ricordarti di inviarlo ogni volta.',
    ],
    when: 'Ha senso per tutti i centri con appuntamenti ricorrenti o servizi con alto tasso di assenze.',
  },
  {
    icon: UserCheck,
    color: 'bg-mocha-mousse/10 text-mocha-mousse',
    border: 'border-mocha-mousse/25',
    title: 'Riattivazione discreta',
    bullets: [
      'Per clienti che non si vedono da tempo: un messaggio discreto per ricordare che ci sei.',
      'Può includere un\'offerta o semplicemente un invito a prenotare, senza essere invadenti.',
    ],
    when: 'Ha senso per centri con un database di clienti che non tornano regolarmente.',
  },
];

const steps = [
  {
    num: '1',
    title: 'Dopo la prenotazione',
    text: 'Il cliente riceve un messaggio di conferma nel canale che preferisce (WhatsApp o altro).',
  },
  {
    num: '2',
    title: 'Promemoria pre-appuntamento',
    text: 'Se attivo, un promemoria automatico viene inviato il giorno prima. Solo messaggi di servizio, non promozionali.',
  },
  {
    num: '3',
    title: 'Clienti inattivi',
    text: 'Solo a chi ha autorizzato le comunicazioni marketing: un messaggio per invitarli a tornare.',
  },
];

const SMSvsEmailMarketing = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero sezione */}
        <div className="text-center mb-14 sm:mb-18">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-high-contrast mb-4">
            Promemoria e messaggi di richiamo su WhatsApp
          </h2>
          <p className="text-base sm:text-lg text-medium-contrast font-light max-w-2xl mx-auto mb-5 leading-relaxed">
            WhatsApp viene letto con più regolarità rispetto all'email, soprattutto per messaggi brevi legati a un appuntamento. Per questo, in molti casi, è il canale più efficace per promemoria e messaggi di ricontatto dopo il trattamento.
          </p>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-sage-green-dark bg-sage-green/10 border border-sage-green/25 px-4 py-2 rounded-wellness">
            <Shield className="w-3.5 h-3.5" />
            WhatsApp opzionale. Attivabile solo con consenso del cliente.
          </span>
        </div>

        {/* 3 card benefici */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {benefitCards.map((card) => (
            <div key={card.title} className={`rounded-wellness border ${card.border} bg-white p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-high-contrast mb-3">{card.title}</h3>
              <ul className="space-y-2 mb-4 flex-1">
                {card.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-medium-contrast leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-sage-green" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-3">
                <span className="font-semibold not-italic text-gray-600">Quando ha senso: </span>
                {card.when}
              </p>
            </div>
          ))}
        </div>

        {/* Come funziona */}
        <div className="bg-warm-sand rounded-wellness p-8 sm:p-10 mb-10 border border-sage-green/20">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-high-contrast mb-2 text-center">
            Come funziona
          </h3>
          <p className="text-sm text-medium-contrast text-center mb-8 font-light">
            Messaggi automatici solo nei momenti giusti, mai spam.
          </p>

          <div className="space-y-5">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-4 bg-white rounded-wellness p-4 shadow-sm border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-sage-green text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <p className="font-semibold text-high-contrast text-sm mb-0.5">{step.title}</p>
                  <p className="text-sm text-medium-contrast leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-sage-green/10 border border-sage-green/30 rounded-wellness p-4 flex items-start gap-3">
            <Shield className="w-4 h-4 text-sage-green flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-sage-green-dark">
              Se il cliente non dà consenso marketing, non inviamo promozioni. Solo messaggi operativi legati all'appuntamento.
            </p>
          </div>
        </div>

        {/* Privacy e consensi */}
        <div className="wellness-card p-8 sm:p-10 mb-10 border border-gray-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-misty-teal/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-misty-teal" />
            </div>
            <h3 className="text-xl font-serif font-bold text-high-contrast">Privacy e consensi</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-semibold text-high-contrast mb-1">Consenso separato per marketing</p>
              <p className="text-sm text-medium-contrast leading-relaxed">
                I messaggi di servizio (conferma, promemoria) non richiedono consenso marketing. Le promozioni sì: consenso separato, esplicito.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-high-contrast mb-1">Preferenze modificabili</p>
              <p className="text-sm text-medium-contrast leading-relaxed">
                Il cliente può revocare il consenso in qualsiasi momento. La cancellazione dalla lista è semplice e rispettata immediatamente.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-high-contrast mb-1">Tracciamento consensi</p>
              <p className="text-sm text-medium-contrast leading-relaxed">
                Ogni consenso viene registrato con data e canale. Trasparenza completa in caso di verifica.
              </p>
            </div>
          </div>
        </div>

        {/* Trasparenza costi */}
        <div className="bg-soft-apricot rounded-wellness p-6 sm:p-8 border border-mocha-mousse/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-mocha-mousse flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-serif font-bold text-high-contrast mb-2">Costi WhatsApp: cosa sapere</h3>
              <p className="text-sm text-medium-contrast leading-relaxed mb-2">
                I messaggi WhatsApp Business hanno un costo variabile che dipende dal Paese del destinatario, dalla categoria del messaggio (servizio o promozionale) e dall'uso di modelli di testo preapprovati inviati fuori da una conversazione già aperta.
              </p>
              <p className="text-sm text-medium-contrast leading-relaxed">
                Impostiamo regole per evitare invii inutili e usare WhatsApp solo quando porta valore concreto. Riceverai sempre visibilità sui volumi inviati.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SMSvsEmailMarketing;
