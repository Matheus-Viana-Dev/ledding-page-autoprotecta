'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const FinalCTASection: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-smoky-black via-smoky-black-light to-smoky-black-lighter text-white relative overflow-hidden">
      {/* Padrão de fundo com grafismos da marca */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-20 w-40 h-40 border border-orioles-orange opacity-10 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 border border-orioles-orange opacity-10 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-orioles-orange opacity-5 rounded-full"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Ícone principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-orioles-orange to-orioles-orange-light rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Título principal convincente */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
          >
            Não espere o{' '}
            <span className="text-gradient">inesperado</span> acontecer.{' '}
            <span className="text-gradient">Proteja seu veículo</span> agora.
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-platinum mb-8 leading-relaxed"
          >
            Em menos de 2 minutos você terá uma cotação personalizada. 
            Não perca mais tempo, garanta a segurança do seu patrimônio hoje mesmo.
          </motion.p>

          {/* Botão CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <button className="group bg-orioles-orange hover:bg-orioles-orange-dark text-white font-black text-xl md:text-2xl px-12 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl">
              <span className="flex items-center space-x-3">
                <span>Fazer Cotação Grátis</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>

          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 text-platinum">
              <Phone className="w-5 h-5 text-orioles-orange" />
              <span className="text-sm">0800 123 4567</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-platinum">
              <Mail className="w-5 h-5 text-orioles-orange" />
              <span className="text-sm">contato@autoprotecta.com.br</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-platinum">
              <Clock className="w-5 h-5 text-orioles-orange" />
              <span className="text-sm">Atendimento 24h</span>
            </div>
          </motion.div>

          {/* Garantias */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black text-orioles-orange mb-2">100%</div>
                  <p className="text-platinum text-sm">Seguro e confiável</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-orioles-orange mb-2">2 min</div>
                  <p className="text-platinum text-sm">Cotação rápida</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-orioles-orange mb-2">24h</div>
                  <p className="text-platinum text-sm">Suporte disponível</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
