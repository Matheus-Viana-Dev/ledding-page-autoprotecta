'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, 
  Settings, 
  Eye, 
  Shield 
} from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: 'Faça a cotação',
    description: 'Preencha os dados em menos de 2 minutos',
    color: 'from-orioles-orange to-orioles-orange-light'
  },
  {
    id: 2,
    icon: <Settings className="w-8 h-8" />,
    title: 'Personalize seu plano',
    description: 'Escolha as coberturas que fazem sentido para você',
    color: 'from-smoky-black to-smoky-black-light'
  },
  {
    id: 3,
    icon: <Eye className="w-8 h-8" />,
    title: 'Faça a vistoria online',
    description: 'Processo 100% digital, sem sair de casa',
    color: 'from-orioles-orange-light to-orioles-orange'
  },
  {
    id: 4,
    icon: <Shield className="w-8 h-8" />,
    title: 'Esteja protegido',
    description: 'Receba seu certificado e dirija com tranquilidade',
    color: 'from-smoky-black-light to-smoky-black-lighter'
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-smoky-black mb-6">
            Como funciona o{' '}
            <span className="text-gradient">processo</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Desmistificamos o processo de contratação, mostrando como é simples 
            e rápido se proteger com a AutoProtecta.
          </p>
        </motion.div>

        {/* Passos conectados */}
        <div className="relative">
          {/* Linha conectora */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orioles-orange via-smoky-black to-orioles-orange transform -translate-y-1/2 z-0"></div>
          
          {/* Grid de passos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Card do passo */}
                <div className="card p-6 text-center h-full bg-white relative">
                  {/* Número do passo */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orioles-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>

                  {/* Ícone com gradiente */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <h3 className="text-xl font-bold text-smoky-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Conector para mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-orioles-orange to-transparent"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-smoky-black to-smoky-black-light rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Simples assim! Quer começar agora?
            </h3>
            <p className="text-platinum mb-6 max-w-2xl mx-auto">
              Em apenas 4 passos você estará protegido. Não perca mais tempo, 
              faça sua cotação gratuita e garanta a segurança do seu veículo.
            </p>
            <button className="btn-primary text-lg px-8 py-4 bg-orioles-orange hover:bg-orioles-orange-dark">
              Começar Cotação
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
