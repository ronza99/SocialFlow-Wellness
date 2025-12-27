import React from 'react';
import { MessageSquare, Mail, TrendingUp, CheckCircle, Target, Clock, DollarSign } from 'lucide-react';

const SMSvsEmailMarketing = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-warm-sand to-sage-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
            📱 WhatsApp Follow-up: Perché Funziona Meglio
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light px-4">
            I dati parlano chiaro: WhatsApp vs Email per il follow-up post-trattamento
          </p>
        </div>

        {/* Confronto essenziale */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            💰 Costi Reali: WhatsApp vs Email
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="wellness-card p-6 sm:p-8">
              <div className="text-center mb-6">
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4" />
                <h4 className="font-serif font-bold text-gray-900 text-xl sm:text-2xl mb-4">Email Marketing</h4>
              </div>
              
              <div className="space-y-4 sm:space-y-5">
                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-800 font-medium">Costo invio:</span>
                  <span className="font-bold text-green-600">€0.00</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-800 font-medium">Tasso apertura:</span>
                  <span className="font-bold text-red-600">20%</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-800 font-medium">Conversioni:</span>
                  <span className="font-bold text-red-600">3-5%</span>
                </div>
                <div className="border-t pt-4 sm:pt-5 mt-5">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="font-bold text-gray-900">Costo per conversione:</span>
                    <span className="font-bold text-red-600">Alto</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="wellness-card p-6 sm:p-8 border-2 border-sage-green">
              <div className="text-center mb-6">
                <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-sage-green mx-auto mb-4" />
                <h4 className="font-serif font-bold text-gray-900 text-xl sm:text-2xl mb-4">WhatsApp Follow-up</h4>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-800 font-medium">Costo invio:</span>
                  <span className="font-bold text-orange-600">€0.07</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-800 font-medium">Tasso apertura:</span>
                  <span className="font-bold text-green-600">98%</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg">
                  <span className="text-gray-800 font-medium">Conversioni:</span>
                  <span className="font-bold text-green-600">32%</span>
                </div>
                <div className="border-t pt-4 sm:pt-5 mt-5">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="font-bold text-gray-900">Costo per conversione:</span>
                    <span className="font-bold text-green-600">€0.22</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <div className="bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-8 sm:p-10 max-w-3xl mx-auto">
              <h4 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6">💡 La Verità</h4>
              <p className="text-lg sm:text-xl leading-relaxed">
                Pagare €0.07 per messaggio WhatsApp con 98% apertura è infinitamente più conveniente
                di email "gratuite" che nessuno legge.
              </p>
            </div>
          </div>
        </div>

        {/* Strategia WhatsApp - Layout migliorato e bilanciato */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-8 sm:p-12">
            <div className="text-center mb-8 sm:mb-10">
              <Target className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4 sm:mb-6" />
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6">
                🎯 La Strategia WhatsApp di SocialFlow
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              <div>
                <h4 className="font-serif font-bold text-white mb-4 sm:mb-6 text-lg sm:text-xl flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Cosa Facciamo
                </h4>
                <ul className="text-white space-y-3 sm:space-y-4">
                  <li className="flex items-start text-base sm:text-lg">
                    <span className="text-sage-green/80 mr-4 mt-1 text-xl">•</span>
                    Follow-up post-trattamento per feedback
                  </li>
                  <li className="flex items-start text-base sm:text-lg">
                    <span className="text-sage-green/80 mr-4 mt-1 text-xl">•</span>
                    Richiesta recensioni con incentivi
                  </li>
                  <li className="flex items-start text-base sm:text-lg">
                    <span className="text-sage-green/80 mr-4 mt-1 text-xl">•</span>
                    Riattivazione clienti inattivi (30+ giorni) con coupon sconto
                  </li>
                  <li className="flex items-start text-base sm:text-lg">
                    <span className="text-sage-green/80 mr-4 mt-1 text-xl">•</span>
                    Messaggi WhatsApp con coupon Gift Card per incentivare ritorno immediato
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif font-bold text-white mb-4 sm:mb-6 text-lg sm:text-xl flex items-center">
                  <DollarSign className="w-6 h-6 mr-3" />
                  Risultati Misurabili
                </h4>
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-wellness p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-white">98%</div>
                    <div className="text-white font-semibold text-sm sm:text-base">Tasso di lettura WhatsApp</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-wellness p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-white">32%</div>
                    <div className="text-white font-semibold text-sm sm:text-base">Conversioni medie</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-wellness p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-white">€0.22</div>
                    <div className="text-white font-semibold text-sm sm:text-base">Costo per conversione</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 bg-white/10 backdrop-blur-md rounded-wellness p-6 sm:p-8">
              <div className="text-center">
                <h5 className="font-serif font-bold text-white mb-3 sm:mb-4 text-lg sm:text-xl">
                  🎯 Strategia GDPR-Compliant, Non Spam
                </h5>
                <p className="text-base sm:text-lg">
                  <strong>Messaggi WhatsApp mirati e strategici</strong> inviati solo con consenso esplicito del cliente.
                  Sistema GDPR-compliant che rispetta le preferenze: se rifiuta il consenso marketing,
                  nessun messaggio promozionale viene inviato.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Risultati concreti - Layout equilibrato */}
        <div className="bg-soft-apricot rounded-wellness p-8 sm:p-12 border border-sage-green/20">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-4 sm:mb-6">
              📈 Risultati Concreti con WhatsApp Follow-up
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Dati reali da centri wellness che utilizzano la strategia WhatsApp di SocialFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-wellness p-6 sm:p-8 text-center hover:shadow-wellness-lg transition-all duration-200">
              <div className="bg-sage-green w-12 h-12 sm:w-16 sm:h-16 rounded-wellness flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-sage-green mb-3">70%</div>
              <h4 className="font-bold text-gray-900 mb-2">Recensioni Positive</h4>
              <p className="text-gray-800 text-sm sm:text-base font-medium">con WhatsApp follow-up vs 15% senza</p>
            </div>
            
            <div className="bg-white rounded-wellness p-6 sm:p-8 text-center hover:shadow-wellness-lg transition-all duration-200">
              <div className="bg-misty-teal w-12 h-12 sm:w-16 sm:h-16 rounded-wellness flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-misty-teal mb-3">35%</div>
              <h4 className="font-bold text-gray-900 mb-2">Clienti Riattivati</h4>
              <p className="text-gray-800 text-sm sm:text-base font-medium">vs 5% con solo email marketing</p>
            </div>
            
            <div className="bg-white rounded-wellness p-6 sm:p-8 text-center hover:shadow-wellness-lg transition-all duration-200">
              <div className="bg-mocha-mousse w-12 h-12 sm:w-16 sm:h-16 rounded-wellness flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-mocha-mousse mb-3">+540%</div>
              <h4 className="font-bold text-gray-900 mb-2">ROI Conversioni</h4>
              <p className="text-gray-800 text-sm sm:text-base font-medium">WhatsApp vs solo email marketing</p>
            </div>
          </div>

          {/* Esempio pratico costi */}
          <div className="mt-8 sm:mt-10 bg-white rounded-wellness p-6 sm:p-8">
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              💰 Esempio Pratico: Centro con 200 Clienti/Mese
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h5 className="font-bold text-gray-800 mb-3">📧 Solo Email:</h5>
                <ul className="text-gray-800 space-y-2 text-sm sm:text-base font-medium">
                  <li>• 200 email inviate (€0 costo)</li>
                  <li>• 40 email aperte (20%)</li>
                  <li>• 2 conversioni (5%)</li>
                  <li>• Ricavo: €120 (2 × €60)</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-bold text-gray-800 mb-3">📱 WhatsApp Follow-up:</h5>
                <ul className="text-gray-800 space-y-2 text-sm sm:text-base font-medium">
                  <li>• 200 messaggi inviati (€14 costo)</li>
                  <li>• 196 messaggi letti (98%)</li>
                  <li>• 64 conversioni (32%)</li>
                  <li>• Ricavo: €3.840 (64 × €60)</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 bg-gradient-to-r from-sage-green-dark to-misty-teal-dark text-white rounded-wellness p-4 sm:p-6 text-center">
              <p className="text-lg sm:text-xl font-bold">
                Differenza: +€3.720 ricavi per €14 investimento
              </p>
              <p className="text-white font-semibold text-sm sm:text-base mt-2">
                ROI: 26.500% in un solo mese
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SMSvsEmailMarketing;