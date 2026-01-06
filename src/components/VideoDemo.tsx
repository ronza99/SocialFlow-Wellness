import React from 'react';
import { Play, Smartphone, MessageSquare, CreditCard, X, ZoomIn, Calendar } from 'lucide-react';

const VideoDemo = () => {
  const [zoomedImage, setZoomedImage] = React.useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-calculator');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openZoom = (imageSrc: string) => {
    setZoomedImage(imageSrc);
    setZoomLevel(1);
  };

  const closeZoom = () => {
    setZoomedImage(null);
    setZoomLevel(1);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1);
  };
  return (
    <>
      <section className="py-24 bg-white">
      <div id="video-demo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 px-4">
            🎬 Guarda SocialFlow in Azione
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light px-4 leading-relaxed">
            Scopri passo dopo passo come funziona il sistema con esempi reali
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Foto esplicative - Placeholder per le immagini */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-12 sm:mb-16">
            {/* Foto 1 - Placeholder */}
            <div className="wellness-card p-6 sm:p-8 text-center mx-4 sm:mx-0">
              <div className="rounded-wellness h-48 sm:h-56 md:h-64 overflow-hidden mb-6 sm:mb-8 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/files_5792006-1752964493999-image.png')}>
                <img 
                  src="/files_5792006-1752964493999-image.png" 
                  alt="Cliente inizia conversazione su Instagram" 
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-3 sm:mb-4 text-lg sm:text-xl">Passo 1: Primo Contatto</h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Foto che mostra come il cliente viene guidato con un semplice flusso a pulsanti dove sceglie tutti i servizi solo con un tap di dito. 
                Il cliente invia un messaggio diretto su Instagram o Facebook e viene immediatamente accolto dal bot automatico con un'interfaccia intuitiva.
              </p>
            </div>

            {/* Foto 2 */}
            <div className="wellness-card p-4 sm:p-6 text-center">
              <div className="rounded-wellness h-56 sm:h-64 overflow-hidden mb-6 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/ea43067f-a01a-4617-9203-b2317592f072.png')}>
                <img 
                  src="/ea43067f-a01a-4617-9203-b2317592f072.png" 
                  alt="Cliente sceglie massaggio sportivo con opzioni di pagamento" 
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Passo 2: Scelta Trattamento e Pagamento</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Dopo aver scelto il massaggio sportivo, il cliente vede tutte le opzioni disponibili: 
                pagamento in sede, acquisto Gift Card con QR code, domande al centro, 
                cambio trattamento o annullamento. Massima flessibilità in un tap.
              </p>
            </div>

            {/* Foto 3 */}
            <div className="wellness-card p-4 sm:p-6 text-center">
              <div className="rounded-wellness h-56 sm:h-64 overflow-hidden mb-6 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/ea43067f-a01a-4617-9203-b2317592f072.png')}>
                <img 
                  src="/ea43067f-a01a-4617-9203-b2317592f072.png" 
                  alt="Cliente acquista Gift Card con QR code per massaggio sportivo" 
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Passo 3: Acquisto Gift Card con QR Code</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Il cliente sceglie di pagare subito acquistando una Gift Card per sé o come regalo. 
                Effettua il pagamento e riceve il QR code in chat. Il QR rimane sempre attivo per quel 
                trattamento: può cancellare e spostare prenotazioni liberamente!
              </p>
            </div>

            {/* Foto 4 - Calendario Prenotazione */}
            <div className="wellness-card p-4 sm:p-6 text-center">
              <div className="rounded-wellness h-56 sm:h-64 overflow-hidden mb-6 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/bacf2097-262e-405e-bd21-17f8eed8ccea.png')}>
                <img 
                  src="/bacf2097-262e-405e-bd21-17f8eed8ccea.png" 
                  alt="Calendario prenotazione intuitivo e accattivante" 
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Passo 4: Calendario Prenotazione</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Questa è come si mostra il calendario per prenotare: molto intuitivo e accattivante. 
                Il cliente può vedere tutte le disponibilità in tempo reale e scegliere data e orario 
                con un semplice tap. Design pulito e user-friendly che rende la prenotazione un piacere.
              </p>
            </div>

            {/* Foto 5 - Conversazione AI */}
            <div className="wellness-card p-4 sm:p-6 text-center">
              <div className="rounded-wellness h-56 sm:h-64 overflow-hidden mb-6 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/3029fb9d-c935-4e97-b3cd-7766ab40a2d8.png')}>
                <img 
                  src="/3029fb9d-c935-4e97-b3cd-7766ab40a2d8.png" 
                  alt="Conversazione intelligente tra cliente e AI su Messenger" 
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Passo 5: Conversazione AI Intelligente</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Questa rappresenta un esempio di conversazione tra un cliente e l'intelligenza artificiale 
                direttamente su Messenger, in grado di adattarsi alle domande e rispondere a ogni dubbio del cliente. 
                Al termine della conversazione lo porterà di nuovo indietro per terminare il pagamento o la prenotazione del trattamento scelto.
              </p>
            </div>

            {/* Foto 6 - Ecommerce in Chat */}
            <div className="wellness-card p-4 sm:p-6 text-center">
              <div className="rounded-wellness h-56 sm:h-64 overflow-hidden mb-6 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/Immagine 2025-07-29 221527.png')}>
                <img 
                  src="/Immagine 2025-07-29 221527.png" 
                  alt="Ecommerce integrato in chat - Cliente seleziona creme per la pelle" 
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Passo 6: Ecommerce Integrato in Chat</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Esempio reale di ecommerce direttamente in chat: il cliente ha selezionato "Creme" 
                e il sistema mostra 2 creme per la pelle con foto, descrizioni e prezzi. 
                Tutto nella chat senza uscire dal social - vendita diretta e immediata!
              </p>
            </div>

            {/* Foto 7 - Google Calendar Sincronizzato */}
            <div className="wellness-card p-4 sm:p-6 text-center">
              <div className="rounded-wellness h-56 sm:h-64 overflow-hidden mb-6 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/image copy copy copy copy copy copy copy copy copy copy.png')}>
                <img
                  src="/image copy copy copy copy copy copy copy copy copy copy.png"
                  alt="Google Calendar con prenotazioni sincronizzate automaticamente"
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Passo 7: Google Calendar Sincronizzato</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Qui in Google Calendar vengono mostrate tutte le prenotazioni di ogni operatore
                in modo ordinato e organizzato. Ogni volta che un cliente cancella o prenota,
                il calendario si aggiorna automaticamente in tempo reale. Gestione semplice e familiare!
              </p>
            </div>

            {/* Foto 8 - Dashboard CRM HubSpot */}
            <div className="wellness-card p-4 sm:p-6 text-center">
              <div className="rounded-wellness h-56 sm:h-64 overflow-hidden mb-6 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/Immagine 2025-07-29 223038.png')}>
                <img 
                  src="/Immagine 2025-07-29 223038.png" 
                  alt="Dashboard CRM HubSpot con gestione clienti completa" 
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Passo 8: Dashboard CRM Professionale</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Dashboard CRM di HubSpot dove vengono tracciati automaticamente tutti i clienti 
                con storico delle interazioni e prenotazioni (dati censurati per privacy). 
                Visione 360° di ogni cliente per il controllo totale del tuo business.
              </p>
            </div>

            {/* Foto 9 - Analytics e Grafici Performance */}
            <div className="wellness-card p-4 sm:p-6 text-center">
              <div className="rounded-wellness h-56 sm:h-64 overflow-hidden mb-6 shadow-wellness cursor-pointer relative group" onClick={() => openZoom('/Immagine 2025-07-30 221835.png')}>
                <img 
                  src="/Immagine 2025-07-30 221835.png" 
                  alt="Dashboard analytics con grafici performance del centro wellness" 
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-300 image-rendering-crisp"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Passo 9: Analytics e Performance</h4>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Esempio di grafici e dati per analizzare come sta andando l'attività: 
                in alto a sinistra i <strong>contatti nuovi</strong> ottenuti mese per mese, 
                in alto a destra tutte le <strong>prenotazioni effettuate</strong> dai clienti 
                e in basso a sinistra tutte le <strong>Gift Card vendute</strong>. 
                Controllo completo delle performance del tuo centro.
              </p>
            </div>
          </div>

          {/* Info section senza CTA */}
          <div className="text-center mt-16">
            <div className="bg-soft-apricot rounded-wellness p-10 border border-sage-green/20">
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                🧪 Vuoi Vedere il Sistema in Azione?
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                Contattami per testare il funnel completo con un centro wellness fittizio: 
                dalla chat al pagamento, come se fossi un vero cliente. Vedrai tutto il sistema funzionante in tempo reale.
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Modal Zoom */}
      {zoomedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4 overflow-auto" onClick={closeZoom}>
          <div className="relative max-w-none max-h-none flex items-center justify-center min-h-full min-w-full">
            <button
              onClick={closeZoom}
              className="fixed top-2 right-2 sm:top-4 sm:right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 sm:p-3 transition-colors z-10 touch-manipulation"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            
            {/* Indicatore zoom */}
            <div className="fixed top-2 left-2 sm:top-4 sm:left-4 bg-black/50 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm z-10">
              Zoom: {zoomLevel === 1 ? '100%' : zoomLevel === 1.5 ? '150%' : '200%'}
              <div className="text-xs mt-1 opacity-75 hidden sm:block">Clicca per ingrandire</div>
              <div className="text-xs mt-1 opacity-75 sm:hidden">Tap per zoom</div>
            </div>
            
            <img
              src={zoomedImage}
              alt="Immagine ingrandita"
              className="object-contain rounded-wellness shadow-2xl cursor-zoom-in transition-transform duration-300 ease-in-out touch-manipulation"
              style={{
                transform: `scale(${zoomLevel})`,
                maxWidth: zoomLevel === 1 ? '95vw' : 'none',
                maxHeight: zoomLevel === 1 ? '85vh' : 'none',
                width: zoomLevel > 1 ? 'auto' : undefined,
                height: zoomLevel > 1 ? 'auto' : undefined,
                transformOrigin: 'center center'
              }}
              onClick={handleImageClick}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDemo;