import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ArrowRight, Bot, User, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: ChatOption[];
  scrollTarget?: string;
}

interface ChatOption {
  id: string;
  text: string;
  scrollTarget?: string;
  nextMessage?: string;
  subOptions?: ChatOption[];
}

const InteractiveChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    // Gestione navigazione tra pagine
    if (sectionId === 'come-funziona-page') {
      navigate('/come-funziona');
      setTimeout(() => setIsOpen(false), 500);
      return;
    }

    if (sectionId === 'vantaggi-page') {
      navigate('/vantaggi');
      setTimeout(() => setIsOpen(false), 500);
      return;
    }

    if (sectionId === 'faq-page') {
      navigate('/faq');
      setTimeout(() => setIsOpen(false), 500);
      return;
    }

    if (sectionId === 'chi-sono-page') {
      navigate('/chi-sono');
      setTimeout(() => setIsOpen(false), 500);
      return;
    }

    if (sectionId === 'home') {
      navigate('/');
      setTimeout(() => setIsOpen(false), 500);
      return;
    }

    if (sectionId === 'transparent-costs') {
      if (location.pathname !== '/vantaggi') {
        navigate('/vantaggi');
        setTimeout(() => {
          const element = document.getElementById('transparent-costs');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          setTimeout(() => setIsOpen(false), 1000);
        }, 500);
      } else {
        const element = document.getElementById('transparent-costs');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(() => setIsOpen(false), 1000);
      }
      return;
    }

    if (sectionId === 'video-demo') {
      if (location.pathname !== '/come-funziona') {
        navigate('/come-funziona');
        setTimeout(() => {
          const element = document.getElementById('video-demo');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          setTimeout(() => setIsOpen(false), 1000);
        }, 500);
      } else {
        const element = document.getElementById('video-demo');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(() => setIsOpen(false), 1000);
      }
      return;
    }

    // Se non siamo sulla home, torna prima alla home per scrollare alle sezioni
    if (location.pathname !== '/' && !['come-funziona-page', 'vantaggi-page', 'faq-page', 'chi-sono-page'].includes(sectionId)) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => setIsOpen(false), 1000);
        }
      }, 300);
      return;
    }

    // Gestione speciale per FAQ: scrolla alla sezione e apri la prima FAQ
    if (sectionId === 'faq') {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Dopo lo scroll, clicca sulla prima FAQ per aprirla
        setTimeout(() => {
          const firstFAQ = faqSection.querySelector('button[aria-expanded]');
          if (firstFAQ && firstFAQ.getAttribute('aria-expanded') === 'false') {
            (firstFAQ as HTMLElement).click();
          }

          // Chiudi il chatbot
          setTimeout(() => setIsOpen(false), 500);
        }, 1000);
      }
      return;
    }

    // Se è una funzionalità specifica, apri la tendina corrispondente
    const featureIds = ['social-booking', 'calendar-management', 'ecommerce-social', 'ai-assistant', 'payment-system', 'multi-slot-packages', 'subscriptions', 'coupon-system', 'crm-integration', 'sms-followup', 'gdpr-compliance'];

    if (featureIds.includes(sectionId)) {
      // Prima vai alla sezione expandable-features e centra la funzionalità specifica
      const expandableSection = document.getElementById('expandable-features');
      if (expandableSection) {
        // Trova prima la funzionalità specifica per calcolare la posizione
        const specificFeature = document.querySelector(`[data-feature-id="${sectionId}"]`);
        
        if (specificFeature) {
          // Scrolla alla funzionalità specifica
          specificFeature.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          // Fallback alla sezione generale
          expandableSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Dopo lo scroll, apri la tendina specifica e ri-scrolla per centrare il contenuto aperto
        setTimeout(() => {
          const featureButton = document.querySelector(`[data-feature-button="${sectionId}"]`);
          if (featureButton) {
            (featureButton as HTMLElement).click();
            
            // Dopo aver aperto la tendina, ri-scrolla per centrare il contenuto espanso
            setTimeout(() => {
              const expandedFeature = document.querySelector(`[data-feature-id="${sectionId}"]`);
              if (expandedFeature) {
                expandedFeature.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 300); // Aspetta che l'animazione di apertura sia completata
          }
          
          // Chiudi il chatbot dopo tutto
          setTimeout(() => setIsOpen(false), 800);
        }, 800); // Tempo per completare il primo scroll
      }
    } else {
      // Comportamento normale per altre sezioni
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Chiudi il chatbot dopo lo scroll
        setTimeout(() => setIsOpen(false), 1000);
      }
    }
  };

  const chatOptions: ChatOption[] = [
    {
      id: 'how-it-works',
      text: '🛠 Come funziona?',
      scrollTarget: 'come-funziona-page',
      nextMessage: 'Ti porto alla pagina dedicata dove vedrai il processo completo passo dopo passo!'
    },
    {
      id: 'pricing',
      text: '💰 Quanto costa?',
      scrollTarget: 'pricing-calculator',
      nextMessage: 'Ti porto al calcolatore prezzi dove puoi comporre il tuo sistema personalizzato!'
    },
    {
      id: 'demo',
      text: '🎬 Vedi una demo',
      scrollTarget: 'video-demo',
      nextMessage: 'Ti porto alla demo video! Potrai vedere il sistema in azione.'
    },
    {
      id: 'contact',
      text: '📞 Richiedi preventivo',
      scrollTarget: 'pricing-calculator',
      nextMessage: 'Ti porto al configuratore per richiedere il tuo preventivo personalizzato!'
    }
  ];

  const addMessage = (text: string, isBot: boolean, options?: ChatOption[], scrollTarget?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      options,
      scrollTarget
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: ChatOption) => {
    // Aggiungi la scelta dell'utente
    addMessage(option.text, false);

    // Simula typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      if (option.subOptions) {
        // Se ha sotto-opzioni, mostrali
        addMessage(
          'Perfetto! Su cosa vuoi sapere di più?',
          true,
          option.subOptions
        );
      } else {
        // Altrimenti, mostra il messaggio e scrolla
        addMessage(option.nextMessage || 'Ti porto alla sezione giusta!', true);
        
        if (option.scrollTarget) {
          setTimeout(() => {
            scrollToSection(option.scrollTarget!);
          }, 1000);
        }
      }
    }, 1500);
  };

  const initializeChat = () => {
    setMessages([]);
    setTimeout(() => {
      addMessage(
        '👋 Ciao! Sono l\'assistente di SocialFlow Wellness. Come posso aiutarti?',
        true,
        chatOptions
      );
    }, 500);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Help Arrow - Solo se chat non è aperta */}
        {!isOpen && (
          <div className="absolute -top-10 sm:-top-12 md:-top-16 -left-16 sm:-left-20 md:-left-32 animate-bounce">
            <div className="bg-white rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 shadow-lg border border-sage-green/20 relative">
              <span className="text-xs sm:text-sm text-sage-green-dark font-medium whitespace-nowrap">
                Hai bisogno di aiuto?
              </span>
              {/* Freccia che punta al chatbot */}
              <div className="absolute -bottom-2 right-3 sm:right-4 md:right-8 w-0 h-0 border-l-3 border-r-3 border-t-3 sm:border-l-4 sm:border-r-4 sm:border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
            {/* Freccia animata che lampeggia */}
            <div className="absolute -bottom-5 sm:-bottom-6 md:-bottom-8 right-2 sm:right-3 md:right-4 animate-pulse">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-sage-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
        
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-sage-green to-misty-teal hover:from-sage-green-dark hover:to-misty-teal-dark text-white rounded-full p-3 sm:p-4 shadow-wellness-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 pulse-contact-button"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-72 sm:w-80 md:w-96 h-80 sm:h-96 bg-white rounded-wellness shadow-2xl border border-sage-green/20 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sage-green to-misty-teal text-white p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-white/20 rounded-full p-2">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base">SocialFlow Assistant</h3>
                <p className="text-xs text-sage-green/80 hidden sm:block">Online ora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-warm-sand/30">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] sm:max-w-xs ${message.isBot ? 'bg-white border border-sage-green/20' : 'bg-sage-green text-white'} rounded-wellness p-2 sm:p-3 shadow-sm`}>
                  <div className="flex items-start space-x-1 sm:space-x-2">
                    {message.isBot && (
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-sage-green mt-0.5 flex-shrink-0" />
                    )}
                    {!message.isBot && (
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm">{message.text}</p>
                      
                      {/* Options */}
                      {message.options && (
                        <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                          {message.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleOptionClick(option)}
                              className="w-full text-left bg-sage-green/10 hover:bg-sage-green/20 text-sage-green-dark rounded-wellness p-1.5 sm:p-2 text-xs font-medium transition-all flex items-center justify-between group transform hover:scale-105 cursor-pointer"
                            >
                              <span>{option.text}</span>
                              <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-sage-green/20 rounded-wellness p-2 sm:p-3 shadow-sm">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-sage-green" />
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sage-green rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sage-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sage-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-sage-green/20 bg-white">
            <div className="flex items-center justify-center">
              <button
                onClick={initializeChat}
                className="text-xs text-sage-green-dark hover:text-sage-green font-medium flex items-center space-x-1"
              >
                <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
                <span>Ricomincia conversazione</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveChatbot;