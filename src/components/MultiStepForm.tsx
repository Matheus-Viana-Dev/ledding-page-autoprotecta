'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Shield, Car, MapPin } from 'lucide-react';

// Schema de validação para o Passo 1: Dados de Contato
const step1Schema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  whatsapp: z.string().min(14, 'WhatsApp inválido'),
});

// Schema de validação para o Passo 2: Dados do Veículo
const step2Schema = z.object({
  vehicleType: z.string().min(1, 'Selecione o tipo de veículo'),
  brand: z.string().min(1, 'Selecione a marca'),
  year: z.string().min(4, 'Ano inválido'),
  model: z.string().min(1, 'Digite o modelo'),
});

// Schema de validação para o Passo 3: Dados de Localização e Uso
const step3Schema = z.object({
  state: z.string().min(1, 'Selecione o estado'),
  city: z.string().min(1, 'Digite a cidade'),
  usage: z.string().min(1, 'Selecione o uso'),
});

// Schema completo do formulário
const formSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type FormData = z.infer<typeof formSchema>;

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const watchedFields = watch();

  const steps = [
    {
      id: 1,
      title: 'Dados de Contato',
      description: 'Nome, E-mail e WhatsApp',
      icon: <Shield className="w-6 h-6" />,
      fields: ['name', 'email', 'whatsapp'],
      schema: step1Schema,
    },
    {
      id: 2,
      title: 'Dados do Veículo',
      description: 'Tipo, Marca, Ano e Modelo',
      icon: <Car className="w-6 h-6" />,
      fields: ['vehicleType', 'brand', 'year', 'model'],
      schema: step2Schema,
    },
    {
      id: 3,
      title: 'Localização e Uso',
      description: 'Estado, Cidade e Uso',
      icon: <MapPin className="w-6 h-6" />,
      fields: ['state', 'city', 'usage'],
      schema: step3Schema,
    },
  ];

  const canProceed = async (step: number) => {
    const currentStepData = steps[step - 1];
    const fieldsToValidate = currentStepData.fields as (keyof FormData)[];
    
    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    if (await canProceed(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simular envio para API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Dados do formulário:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-smoky-black mb-2">
            Nome Completo *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
            placeholder="Digite seu nome completo"
          />
          {errors.name && (
            <p className="text-error text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-smoky-black mb-2">
            E-mail *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-bold text-smoky-black mb-2">
            WhatsApp *
          </label>
          <input
            {...register('whatsapp')}
            type="tel"
            id="whatsapp"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
            placeholder="(11) 99999-9999"
          />
          {errors.whatsapp && (
            <p className="text-error text-sm mt-1">{errors.whatsapp.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vehicleType" className="block text-sm font-bold text-smoky-black mb-2">
            Tipo de Veículo *
          </label>
          <select
            {...register('vehicleType')}
            id="vehicleType"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
          >
            <option value="">Selecione...</option>
            <option value="carro">Carro</option>
            <option value="moto">Moto</option>
            <option value="caminhao">Caminhão</option>
            <option value="utilitario">Utilitário</option>
          </select>
          {errors.vehicleType && (
            <p className="text-error text-sm mt-1">{errors.vehicleType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-bold text-smoky-black mb-2">
            Marca *
          </label>
          <select
            {...register('brand')}
            id="brand"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
          >
            <option value="">Selecione...</option>
            <option value="chevrolet">Chevrolet</option>
            <option value="ford">Ford</option>
            <option value="volkswagen">Volkswagen</option>
            <option value="fiat">Fiat</option>
            <option value="honda">Honda</option>
            <option value="toyota">Toyota</option>
            <option value="hyundai">Hyundai</option>
            <option value="outros">Outros</option>
          </select>
          {errors.brand && (
            <p className="text-error text-sm mt-1">{errors.brand.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-bold text-smoky-black mb-2">
            Ano *
          </label>
          <input
            {...register('year')}
            type="number"
            id="year"
            min="1900"
            max={new Date().getFullYear() + 1}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
            placeholder="2024"
          />
          {errors.year && (
            <p className="text-error text-sm mt-1">{errors.year.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-bold text-smoky-black mb-2">
            Modelo *
          </label>
          <input
            {...register('model')}
            type="text"
            id="model"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
            placeholder="Ex: Onix, HB20, etc."
          />
          {errors.model && (
            <p className="text-error text-sm mt-1">{errors.model.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="state" className="block text-sm font-bold text-smoky-black mb-2">
            Estado *
          </label>
          <select
            {...register('state')}
            id="state"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
          >
            <option value="">Selecione...</option>
            <option value="sp">São Paulo</option>
            <option value="rj">Rio de Janeiro</option>
            <option value="mg">Minas Gerais</option>
            <option value="rs">Rio Grande do Sul</option>
            <option value="pr">Paraná</option>
            <option value="sc">Santa Catarina</option>
            <option value="ba">Bahia</option>
            <option value="go">Goiás</option>
            <option value="pe">Pernambuco</option>
            <option value="ce">Ceará</option>
            <option value="outros">Outros</option>
          </select>
          {errors.state && (
            <p className="text-error text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-bold text-smoky-black mb-2">
            Cidade *
          </label>
          <input
            {...register('city')}
            type="text"
            id="city"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
            placeholder="Digite sua cidade"
          />
          {errors.city && (
            <p className="text-error text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="usage" className="block text-sm font-bold text-smoky-black mb-2">
            Uso do Veículo *
          </label>
          <select
            {...register('usage')}
            id="usage"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orioles-orange focus:outline-none transition-colors"
          >
            <option value="">Selecione...</option>
            <option value="pessoal">Uso Pessoal</option>
            <option value="trabalho">Uso para Trabalho</option>
            <option value="comercial">Uso Comercial</option>
            <option value="aplicativo">Uso para Aplicativo</option>
            <option value="outros">Outros</option>
          </select>
          {errors.usage && (
            <p className="text-error text-sm mt-1">{errors.usage.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-smoky-black mb-4">
          Cotação Enviada com Sucesso!
        </h3>
        <p className="text-gray-600 mb-6">
          Nossa equipe entrará em contato em até 2 horas com sua cotação personalizada.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
          }}
          className="btn-primary"
        >
          Fazer Nova Cotação
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Indicador de Progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-orioles-orange border-orioles-orange text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step.id ? 'bg-orioles-orange' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-smoky-black">
            {steps[currentStep - 1].title}
          </h3>
          <p className="text-gray-600">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>

      {/* Conteúdo do Step */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {/* Botões de Navegação */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-6 py-3 text-orioles-orange border-2 border-orioles-orange rounded-lg hover:bg-orioles-orange hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </button>
          )}

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary ml-auto"
            >
              Próximo Passo
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary ml-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  Receber Cotação
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
