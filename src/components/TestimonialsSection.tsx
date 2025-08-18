'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Silva',
    role: 'Motorista de Aplicativo',
    city: 'São Paulo, SP',
    rating: 5,
    text: 'A AutoProtecta salvou meu carro quando precisei! O processo foi super rápido e o atendimento foi excepcional. Recomendo para todos!',
    avatar: 'CS'
  },
  {
    id: 2,
    name: 'Ana Costa',
    role: 'Empresária',
    city: 'Rio de Janeiro, RJ',
    rating: 5,
    text: 'Contratei a proteção para minha frota de 5 veículos. Preços justos, cobertura completa e suporte 24h. Excelente escolha!',
    avatar: 'AC'
  },
  {
    id: 3,
    name: 'Roberto Santos',
    role: 'Médico',
    city: 'Belo Horizonte, MG',
    rating: 5,
    text: 'Como médico, preciso de confiança total. A AutoProtecta me deu isso. Processo digital, sem burocracia e proteção real.',
    avatar: 'RS'
  },
  {
    id: 4,
    name: 'Maria Oliveira',
    role: 'Aposentada',
    city: 'Porto Alegre, RS',
    rating: 5,
    text: 'Minha filha me ajudou a contratar online. Foi muito simples! Agora posso dirigir tranquila sabendo que estou protegida.',
    avatar: 'MO'
  },
  {
    id: 5,
    name: 'João Pereira',
    role: 'Advogado',
    city: 'Salvador, BA',
    rating: 5,
    text: 'Como advogado, sei a importância de ter uma proteção sólida. A AutoProtecta oferece exatamente isso com transparência total.',
    avatar: 'JP'
  },
  {
    id: 6,
    name: 'Fernanda Lima',
    role: 'Designer',
    city: 'Curitiba, PR',
    rating: 5,
    text: 'Adorei a experiência! Interface moderna, processo rápido e atendimento humanizado. É assim que deveria ser sempre!',
    avatar: 'FL'
  }
];

const TestimonialsSection: React.FC = () => {
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
            O que nossos{' '}
            <span className="text-gradient">clientes</span> dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Milhares de brasileiros já escolheram a AutoProtecta para proteger 
            seus veículos. Veja alguns depoimentos reais.
          </p>
        </motion.div>

        {/* Grid de depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card p-6 h-full bg-platinum hover:bg-white transition-colors duration-300">
                {/* Quote icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-orioles-orange opacity-60" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Texto do depoimento */}
                <blockquote className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </blockquote>

                {/* Informações do cliente */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orioles-orange to-orioles-orange-light rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-smoky-black text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {testimonial.role}
                    </p>
                    <p className="text-orioles-orange text-xs font-medium">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-black text-orioles-orange mb-2">50K+</div>
                <p className="text-gray-600 text-sm">Clientes ativos</p>
              </div>
              <div>
                <div className="text-3xl font-black text-orioles-orange mb-2">98%</div>
                <p className="text-gray-600 text-sm">Satisfação</p>
              </div>
              <div>
                <div className="text-3xl font-black text-orioles-orange mb-2">24h</div>
                <p className="text-gray-600 text-sm">Atendimento</p>
              </div>
              <div>
                <div className="text-3xl font-black text-orioles-orange mb-2">4.9</div>
                <p className="text-gray-600 text-sm">Avaliação média</p>
              </div>
            </div>
          </div>
        </motion.div>

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
              Junte-se aos nossos clientes satisfeitos!
            </h3>
            <p className="text-platinum mb-6 max-w-2xl mx-auto">
              Não espere o inesperado acontecer. Proteja seu veículo agora mesmo 
              e faça parte da família AutoProtecta.
            </p>
            <button className="btn-primary text-lg px-8 py-4 bg-orioles-orange hover:bg-orioles-orange-dark">
              Fazer Cotação Grátis
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
