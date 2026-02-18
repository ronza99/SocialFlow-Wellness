import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, CheckCircle, Zap, Bot, CreditCard } from 'lucide-react';

const ClientNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const notifications = [
    {
      name: "Centro Benessere Milano",
      location: "Milano",
      action: "ha implementato SocialFlow Wellness",
      time: "2 minuti fa",
      avatar: "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      color: "bg-green-500",
      icon: CheckCircle
    },
    {
      name: "Estetica Roma Centro",
      location: "Roma", 
      action: "ha attivato il bot automatico",
      time: "5 minuti fa",
      avatar: "https://images.pexels.com/photos/3985167/pexels-photo-3985167.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      color: "bg-blue-500",
      icon: Bot
    },
    {
      name: "Fisioterapia Sport Torino",
      location: "Torino",
      action: "ha configurato i pagamenti automatici",
      time: "8 minuti fa", 
      avatar: "https://images.pexels.com/photos/3985175/pexels-photo-3985175.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      color: "bg-purple-500",
      icon: CreditCard
    },
    {
      name: "Wellness Napoli",
      location: "Napoli",
      action: "ha richiesto una demo personalizzata",
      time: "12 minuti fa",
      avatar: "https://images.pexels.com/photos/3985171/pexels-photo-3985171.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      color: "bg-pink-500",
      icon: Zap
    },
    {
      name: "Centro Massaggi Bologna",
      location: "Bologna",
      action: "ha completato il setup del sistema",
      time: "15 minuti fa",
      avatar: "https://images.pexels.com/photos/3985169/pexels-photo-3985169.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      color: "bg-orange-500",
      icon: CheckCircle
    },
    {
      name: "Estetica Avanzata Firenze",
      location: "Firenze",
      action: "ha attivato l'ecommerce integrato",
      time: "18 minuti fa",
      avatar: "https://images.pexels.com/photos/3985173/pexels-photo-3985173.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
      color: "bg-teal-500",
      icon: Bot
    }
  ];

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentNotification((prev) => (prev + 1) % notifications.length);
        }, 500);
      }, 4000);
    };

    // Mostra la prima notifica dopo 3 secondi
    const initialTimer = setTimeout(showNotification, 3000);

    // Poi ogni 2 minuti (120 secondi)
    const interval = setInterval(showNotification, 120000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [notifications.length]);

  const notification = notifications[currentNotification];

  return (
    <div className={`fixed bottom-20 sm:bottom-6 left-6 z-50 transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={notification.avatar} 
              alt={notification.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${notification.color} rounded-full flex items-center justify-center`}>
              <notification.icon className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {notification.name}
              </p>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="text-xs">{notification.location}</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-tight mb-2">
              {notification.action}
            </p>
            
            <div className="flex items-center text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              <span className="text-xs">{notification.time}</span>
            </div>
          </div>
        </div>
        
        {/* Pulse animation */}
        <div className="absolute -top-1 -right-1">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ClientNotifications;