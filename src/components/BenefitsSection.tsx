'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Smartphone, 
  Users,
  Zap,
  Award
} from 'lucide-react';

const benefits = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Proteção Completa',
    description: 'Cobertura contra roubo, furto, colisão e danos naturais',
    color: 'from-smoky-black to-smoky-black-light'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Assistência 24h',
    description: 'Suporte em todo Brasil, 7 dias por semana',
    color: 'from-orioles-orange to-orioles-orange-light'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Processo Digital',
    description: 'Contratação 100% online, sem papelada',
    color: 'from-orioles-orange-light to-orioles-orange'
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: 'Preços Justos',
    description: 'Melhor custo-benefício do mercado',
    color: 'from-smoky-black-light to-smoky-black-lighter'
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: 'App Exclusivo',
    description: 'Acompanhe tudo pelo seu celular',
    color: 'from-orioles-orange to-orioles-orange-dark'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Atendimento Humano',
    description: 'Especialistas dedicados para você',
    color: 'from-smoky-black to-smoky-black-light'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Cotação Rápida',
    description: 'Proposta em menos de 2 minutos',
    color: 'from-orioles-orange-light to-orioles-orange'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Garantia Total',
    description: 'Segurança e confiança garantidas',
    color: 'from-smoky-black-light to-smoky-black-lighter'
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="section-padding bg-platinum-light">
      <div className="container-custom">
        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-smoky-black mb-6">
            Por que escolher a{' '}
            <span className="text-gradient">AutoProtecta</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossa missão é ser o guardião incansável do seu patrimônio, 
            oferecendo proteção com inovação e transparência.
          </p>
        </motion.div>

        {/* Grid de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card p-6 text-center h-full hover:scale-105 transition-transform duration-300">
                {/* Ícone com gradiente */}
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>

                {/* Conteúdo */}
                <h3 className="text-lg font-bold text-smoky-black mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-smoky-black mb-4">
              Pronto para se proteger?
            </h3>
            <p className="text-gray-600 mb-6">
              Junte-se a milhares de clientes que já escolheram a AutoProtecta 
              para proteger seu patrimônio com segurança e tranquilidade.
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Fazer Cotação Gratuita
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
