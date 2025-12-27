import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Clock, BarChart3, Target } from 'lucide-react';

const MarketDataNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const marketData = [
    {
      title: "Settore Wellness in Crescita",
      stat: "+12.8%",
      description: "crescita annua del mercato wellness italiano",
      source: "Report Wellness Economy 2024",
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      title: "Prenotazioni Online",
      stat: "78%",
      description: "dei clienti preferisce prenotare online",
      source: "Studio Comportamenti Consumatori 2024",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "No-Show Tradizionali",
      stat: "25-30%",
      description: "tasso medio no-show senza pagamento anticipato",
      source: "Analisi Settore Beauty & Wellness",
      icon: Clock,
      color: "bg-orange-500"
    },
    {
      title: "Social Commerce",
      stat: "+45%",
      description: "crescita acquisti diretti sui social media",
      source: "Digital Commerce Report 2024",
      icon: DollarSign,
      color: "bg-purple-500"
    },
    {
      title: "Automazione Business",
      stat: "€2.1M",
      description: "risparmio medio annuo per azienda con automazione",
      source: "McKinsey Automation Study",
      icon: BarChart3,
      color: "bg-teal-500"
    },
    {
      title: "Customer Experience",
      stat: "86%",
      description: "dei clienti paga di più per migliore esperienza",
      source: "PwC Customer Experience Survey",
      icon: Target,
      color: "bg-pink-500"
    }
  ];

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentNotification((prev) => (prev + 1) % marketData.length);
        }, 500);
      }, 6000); // Mostra per 6 secondi
    };

    // Mostra la prima notifica dopo 5 secondi
    const initialTimer = setTimeout(showNotification, 5000);

    // Poi ogni 3 minuti (180 secondi)
    const interval = setInterval(showNotification, 180000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [marketData.length]);

  const notification = marketData[currentNotification];

  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm">
        <div className="flex items-start space-x-4">
          <div className={`${notification.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
            <notification.icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              📊 {notification.title}
            </h4>
            
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-2xl font-bold text-gray-900">{notification.stat}</span>
              <span className="text-sm text-gray-600">{notification.description}</span>
            </div>
            
            <p className="text-xs text-gray-500 italic">
              Fonte: {notification.source}
            </p>
          </div>
        </div>
        
        {/* Indicatore di credibilità */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Dati di mercato verificati</span>
            <div className="flex space-x-1">
              {marketData.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentNotification ? 'bg-sage-green' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDataNotifications;