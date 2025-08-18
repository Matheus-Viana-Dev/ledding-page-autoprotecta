'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Proteção', href: '#protecao' },
    { name: 'Veículos', href: '#veiculos' },
    { name: 'Suporte', href: '#suporte' },
    { name: 'Minha Conta', href: '#conta' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orioles-orange to-orioles-orange-light rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-black ${
              isScrolled ? 'text-smoky-black' : 'text-white'
            }`}>
              AutoProtecta
            </span>
          </motion.div>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-semibold transition-colors duration-300 hover:text-orioles-orange ${
                  isScrolled ? 'text-smoky-black' : 'text-white'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Botões de ação Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => scrollToSection('#contato')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                isScrolled
                  ? 'border-orioles-orange text-orioles-orange hover:bg-orioles-orange hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-smoky-black'
              }`}
            >
              Contato
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => scrollToSection('#cotacao')}
              className="px-6 py-3 bg-orioles-orange hover:bg-orioles-orange-dark text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Fazer Cotação
            </motion.button>
          </div>

          {/* Botão mobile menu */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-smoky-black' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container-custom py-6">
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-smoky-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <button
                  onClick={() => scrollToSection('#contato')}
                  className="block w-full text-center py-3 px-6 border-2 border-orioles-orange text-orioles-orange rounded-lg font-semibold hover:bg-orioles-orange hover:text-white transition-all duration-300"
                >
                  Contato
                </button>
                <button
                  onClick={() => scrollToSection('#cotacao')}
                  className="block w-full text-center py-3 px-6 bg-orioles-orange text-white rounded-lg font-semibold hover:bg-orioles-orange-dark transition-all duration-300"
                >
                  Fazer Cotação
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
