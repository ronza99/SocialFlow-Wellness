import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Zap, Star, HelpCircle, User, Tag } from 'lucide-react';
import Logo from './Logo';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/come-funziona', label: 'Come funziona', icon: Zap },
    { path: '/vantaggi', label: 'Vantaggi', icon: Star },
    { path: '/faq', label: 'FAQ', icon: HelpCircle },
    { path: '/chi-sono', label: 'Chi sono', icon: User },
  ];

  const scrollToPricing = () => {
    if (location.pathname !== '/') {
      navigate('/#pricing');
    } else {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <Logo className="h-12 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={scrollToPricing}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
              >
                Richiedi Preventivo
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={scrollToPricing}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-md"
              >
                Preventivo
              </button>
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-stretch h-16">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            const shortLabel = link.label;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-gray-500'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
                <span className="text-[10px] font-medium leading-tight">{shortLabel}</span>
                {isActive && (
                  <span className="absolute bottom-0 w-6 h-0.5 bg-emerald-600 rounded-t-full" />
                )}
              </Link>
            );
          })}
          <button
            onClick={scrollToPricing}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 text-emerald-600"
          >
            <Tag className="h-5 w-5 stroke-[2px]" />
            <span className="text-[10px] font-semibold leading-tight">Prezzi</span>
          </button>
        </div>
      </nav>
    </>
  );
}
