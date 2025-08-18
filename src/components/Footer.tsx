'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produtos: [
      { name: 'Proteção Veicular', href: '#protecao' },
      { name: 'Tipos de Veículos', href: '#veiculos' },
      { name: 'Planos e Coberturas', href: '#planos' },
    ],
    suporte: [
      { name: 'Central de Ajuda', href: '#suporte' },
      { name: 'Fale Conosco', href: '#contato' },
      { name: 'Perguntas Frequentes', href: '#faq' },
    ],
    empresa: [
      { name: 'Sobre Nós', href: '#sobre' },
      { name: 'Política de Privacidade', href: '#politica' },
      { name: 'Termos de Uso', href: '#termos' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <MessageCircle className="w-5 h-5" />, href: '#', label: 'WhatsApp' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-smoky-black text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orioles-orange to-orioles-orange-light rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black">AutoProtecta</span>
            </div>
            <p className="text-platinum text-sm leading-relaxed mb-6">
              Proteção veicular com inovação e transparência. 
              Seu patrimônio merece o melhor cuidado.
            </p>
            <div className="space-y-2 text-sm text-platinum">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orioles-orange rounded-full"></div>
                <span>Proteção 100% garantida</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orioles-orange rounded-full"></div>
                <span>Atendimento 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orioles-orange rounded-full"></div>
                <span>Processo 100% digital</span>
              </div>
            </div>
          </motion.div>

          {/* Links de produtos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-orioles-orange mb-4">Produtos</h4>
            <ul className="space-y-2">
              {footerLinks.produtos.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-platinum hover:text-orioles-orange transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links de suporte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-orioles-orange mb-4">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-platinum hover:text-orioles-orange transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links da empresa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-orioles-orange mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-platinum hover:text-orioles-orange transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Linha separadora */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-smoky-black-light my-8"
        ></motion.div>

        {/* Rodapé inferior */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-platinum text-sm"
          >
            &copy; {currentYear} AutoProtecta. Todos os direitos reservados.
          </motion.p>

          {/* Redes sociais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex space-x-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="w-10 h-10 bg-smoky-black-light hover:bg-orioles-orange rounded-full flex items-center justify-center text-platinum hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Informações de contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-smoky-black-light"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <h5 className="text-orioles-orange font-semibold">Telefone</h5>
              <p className="text-platinum text-sm">0800 123 4567</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-orioles-orange font-semibold">E-mail</h5>
              <p className="text-platinum text-sm">contato@autoprotecta.com.br</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-orioles-orange font-semibold">Atendimento</h5>
              <p className="text-platinum text-sm">24 horas por dia, 7 dias por semana</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
