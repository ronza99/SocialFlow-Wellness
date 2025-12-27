import React from 'react';
import { Mail, Phone } from 'lucide-react';
import Logo from './Logo';

const About = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            👋 Chi sono
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Profile Image */}
              <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-[200px] aspect-square rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                  <img
                    src="/untitled_(1).png"
                    alt="Francesco Farì"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="md:w-2/3 p-6 sm:p-8 md:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Francesco Farì</h3>
                <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  Consulente diretto e sviluppatore del tuo funnel. Costruisco la vetrina digitale su misura 
                  e resto al tuo fianco finché tutto non funziona alla perfezione.
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs sm:text-sm">Email</p>
                      <a href="mailto:francesco@socialflowwellness.it" className="text-base sm:text-lg font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                        francesco@socialflowwellness.it
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs sm:text-sm">Telefono</p>
                      <a href="tel:+393893125278" className="text-base sm:text-lg font-semibold text-green-600 hover:text-green-700 transition-colors">
                        389 312 5278
                      </a>
                    </div>
                  </div>
                </div>

                {/* Expertise highlights */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Specializzazioni</h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <span className="bg-purple-100 text-purple-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">Automazione Social</span>
                    <span className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">Chatbot AI</span>
                    <span className="bg-green-100 text-green-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">Pagamenti Online</span>
                    <span className="bg-orange-100 text-orange-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">Settore Wellness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promise section with Logo */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Logo watermark */}
              <div className="absolute top-4 right-4 opacity-20">
                <Logo size="lg" showText={false} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 relative z-10">💝 La mia promessa</h3>
              <p className="text-xl text-purple-100 relative z-10">
                Non vendo solo software, ma un processo completo che trasforma i tuoi social 
                in una macchina di acquisizione clienti. Ti accompagno personalmente fino al risultato.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;