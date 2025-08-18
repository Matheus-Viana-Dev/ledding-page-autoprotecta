'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle } from 'lucide-react';
import MultiStepForm from './MultiStepForm';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-smoky-black via-smoky-black-light to-smoky-black-lighter text-white overflow-hidden">
      {/* Padrão de fundo com grafismos da marca */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-orioles-orange opacity-20 rounded-full"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 border border-orioles-orange opacity-20 rounded-full"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Conteúdo da Esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge de destaque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-orioles-orange/20 border border-orioles-orange/30 rounded-full text-orioles-orange text-sm font-bold"
            >
              <Shield className="w-4 h-4 mr-2" />
              Proteção 100% Garantida
            </motion.div>

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            >
              Proteção veicular{' '}
              <span className="text-gradient">completa</span>,{' '}
              sem burocracia e{' '}
              <span className="text-gradient">100% online</span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-platinum leading-relaxed"
            >
              Faça sua cotação em menos de 2 minutos e dirija com tranquilidade. 
              A AutoProtecta é o guardião incansável do seu patrimônio.
            </motion.p>

            {/* Benefícios rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orioles-orange rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-platinum">Cotação em 2 min</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orioles-orange rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-platinum">100% Seguro</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orioles-orange rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-platinum">Atendimento 24h</span>
              </div>
            </motion.div>

            {/* CTA secundário */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="btn-primary text-lg px-8 py-4">
                Começar Agora
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Saiba Mais
              </button>
            </motion.div>
          </motion.div>

          {/* Formulário da Direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Card do formulário */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              {/* Header do formulário */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orioles-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-smoky-black mb-2">
                  Solicite sua cotação gratuita
                </h2>
                <p className="text-gray-600 text-lg">
                  Preencha os dados abaixo e receba uma proposta personalizada em minutos
                </p>
              </div>

              {/* Formulário multi-step */}
              <MultiStepForm />
            </div>

            {/* Elementos decorativos ao redor do formulário */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-orioles-orange rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orioles-orange rounded-full opacity-60"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
