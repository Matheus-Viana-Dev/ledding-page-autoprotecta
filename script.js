/**
 * AUTOPROTECTA DESIGN SYSTEM - JAVASCRIPT
 * Funcionalidades interativas e animações
 */

// ================================================
// CONFIGURAÇÕES GLOBAIS
// ================================================

const AutoprotectaApp = {
  // Configurações de animação
  animationSettings: {
    duration: 300,
    easing: 'ease-in-out',
    stagger: 100
  },
  
  // Estado da aplicação
  state: {
    isMenuOpen: false,
    isLoading: false,
    scrollPosition: 0,
    activeSection: null
  },
  
  // Seletores DOM
  selectors: {
    header: '.header',
    navMenu: '.nav-menu',
    heroSection: '.hero',
    features: '.feature-card',
    services: '.service-card',
    ctaSection: '.cta',
    buttons: 'button, .btn-primary, .btn-secondary, .btn-outline',
    animatedElements: '[data-animate]'
  }
};

// ================================================
// UTILITÁRIOS
// ================================================

/**
 * Utilitários gerais
 */
const Utils = {
  // Throttle para otimizar eventos de scroll
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Debounce para otimizar eventos de resize
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  // Verificar se elemento está visível na viewport
  isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold &&
      rect.left <= windowWidth * (1 - threshold) &&
      rect.right >= windowWidth * threshold
    );
  },

  // Smooth scroll para âncoras
  smoothScrollTo(target, duration = 800) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
};

// ================================================
// ANIMAÇÕES
// ================================================

/**
 * Sistema de animações
 */
const Animations = {
  // Inicializar observador de intersecção (excluindo features)
  initIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observar apenas elementos de serviços (não features)
    document.querySelectorAll(AutoprotectaApp.selectors.services).forEach(el => {
      observer.observe(el);
    });

    // Observar elementos com data-animate (exceto se estiverem na seção features)
    document.querySelectorAll('[data-animate]').forEach(el => {
      const featuresSection = el.closest('.features');
      if (!featuresSection) {
        observer.observe(el);
      }
    });
  },

  // Animar elemento específico
  animateElement(element) {
    const animationType = element.dataset.animate || 'fadeInUp';
    
    switch (animationType) {
      case 'fadeInUp':
        element.classList.add('animate-fade-in-up');
        break;
      case 'slideInLeft':
        element.classList.add('animate-slide-in-left');
        break;
      case 'slideInRight':
        element.classList.add('animate-slide-in-right');
        break;
      case 'float':
        element.classList.add('animate-float');
        break;
      case 'pulse':
        element.classList.add('animate-pulse');
        break;
      default:
        element.classList.add('animate-fade-in-up');
    }
  },

  // Animar cards em sequência (stagger) - excluindo features
  staggerCards(selector, delay = 100) {
    // Não aplicar stagger nos feature-cards
    if (selector.includes('feature-card')) {
      return;
    }
    
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-fade-in-up');
      }, index * delay);
    });
  },

  // Animação da imagem no carregamento
  animateLogo() {
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
      logoImage.style.transform = 'scale(0.8)';
      logoImage.style.opacity = '0';
      
      setTimeout(() => {
        logoImage.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        logoImage.style.transform = 'scale(1)';
        logoImage.style.opacity = '1';
      }, 100);
    }
  },

  // Efeito de loading
  showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
      <div class="spinner"></div>
      <p>Carregando...</p>
    `;
    document.body.appendChild(loader);
    AutoprotectaApp.state.isLoading = true;
  },

  hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.remove();
      AutoprotectaApp.state.isLoading = false;
    }
  }
};

// ================================================
// INTERAÇÕES DE UI
// ================================================

/**
 * Gerenciamento de interações da interface
 */
const UIInteractions = {
  // Inicializar todas as interações
  init() {
    this.initButtonEffects();
    this.initScrollEffects();
    this.initFormValidation();
    this.initTooltips();
    this.initModalHandlers();
  },

  // Efeitos nos botões
  initButtonEffects() {
    document.querySelectorAll(AutoprotectaApp.selectors.buttons).forEach(button => {
      // Efeito de ripple
      button.addEventListener('click', (e) => {
        this.createRipple(e);
      });

      // Efeito hover com sons (opcional)
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });
  },

  // Criar efeito ripple nos botões
  createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    // Remove o elemento após a animação
    setTimeout(() => {
      circle.remove();
    }, 600);
  },

  // Efeitos de scroll
  initScrollEffects() {
    const header = document.querySelector(AutoprotectaApp.selectors.header);
    
    const handleScroll = Utils.throttle(() => {
      const scrollY = window.scrollY;
      AutoprotectaApp.state.scrollPosition = scrollY;

      // Header com efeito de transparência
      if (scrollY > 50) {
        header.classList.add('scrolled');
        header.style.backgroundColor = 'rgba(12, 12, 12, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.classList.remove('scrolled');
        header.style.backgroundColor = 'var(--smoky-black)';
        header.style.backdropFilter = 'none';
      }

      // Parallax no hero
      const hero = document.querySelector(AutoprotectaApp.selectors.heroSection);
      if (hero && scrollY < hero.offsetHeight) {
        const parallaxSpeed = scrollY * 0.5;
        hero.style.transform = `translateY(${parallaxSpeed}px)`;
      }

      // Atualizar seção ativa
      this.updateActiveSection();
    }, 16);

    window.addEventListener('scroll', handleScroll);
  },

  // Atualizar seção ativa no menu
  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remover classe ativa de todos os links
        document.querySelectorAll('.nav-menu a').forEach(link => {
          link.classList.remove('active');
        });

        // Adicionar classe ativa ao link correspondente
        const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }

        AutoprotectaApp.state.activeSection = sectionId;
      }
    });
  },

  // Validação de formulários
  initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Validação em tempo real
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    });
  },

  // Validar formulário
  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  },

  // Validar campo individual
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    // Remover mensagens de erro anteriores
    this.removeFieldError(field);

    // Validações básicas
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório';
    } else if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Email inválido';
    } else if (type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Telefone inválido';
    }

    // Mostrar erro se inválido
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  },

  // Validar email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar telefone
  isValidPhone(phone) {
    const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
    return phoneRegex.test(phone);
  },

  // Mostrar erro no campo
  showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
  },

  // Remover erro do campo
  removeFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  },

  // Inicializar tooltips
  initTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target);
      });

      element.addEventListener('mouseleave', (e) => {
        this.hideTooltip(e.target);
      });
    });
  },

  // Mostrar tooltip
  showTooltip(element) {
    const text = element.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.transform = 'translateX(-50%)';
    
    setTimeout(() => tooltip.classList.add('visible'), 10);
  },

  // Esconder tooltip
  hideTooltip(element) {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  },

  // Handlers para modais
  initModalHandlers() {
    // Botões que abrem modais
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal');
        this.openModal(modalId);
      });
    });

    // Fechar modal ao clicar no overlay
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.closeModal();
      }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  },

  // Abrir modal
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  // Fechar modal
  closeModal() {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

// ================================================
// PERFORMANCE E OTIMIZAÇÕES
// ================================================

/**
 * Otimizações de performance
 */
const Performance = {
  // Lazy loading de imagens
  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  // Preload de recursos críticos
  preloadCriticalResources() {
    const criticalResources = [
      // Adicionar URLs de recursos críticos
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  },

  // Monitoramento de performance
  monitorPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Tempo de carregamento:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        }, 0);
      });
    }
  }
};

// ================================================
// FUNCIONALIDADES ESPECÍFICAS
// ================================================

/**
 * Funcionalidades específicas da Autoprotecta
 */
const AutoprotectaFeatures = {
  // Calculadora de cotação (simulação)
  initQuoteCalculator() {
    const calculatorForms = document.querySelectorAll('.quote-calculator');
    
    calculatorForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processQuote(form);
      });
    });
  },

  // Processar cotação
  processQuote(form) {
    const formData = new FormData(form);
    const vehicleType = formData.get('vehicleType');
    const vehicleValue = parseFloat(formData.get('vehicleValue')) || 0;
    const coverage = formData.get('coverage');
    
    // Simulação de cálculo
    let basePrice = vehicleValue * 0.05; // 5% do valor do veículo
    
    // Ajustes por tipo de veículo
    switch (vehicleType) {
      case 'car':
        basePrice *= 1.0;
        break;
      case 'motorcycle':
        basePrice *= 1.2;
        break;
      case 'truck':
        basePrice *= 1.5;
        break;
    }
    
    // Ajustes por cobertura
    switch (coverage) {
      case 'basic':
        basePrice *= 0.8;
        break;
      case 'complete':
        basePrice *= 1.2;
        break;
      case 'premium':
        basePrice *= 1.5;
        break;
    }
    
    this.showQuoteResult(basePrice);
  },

  // Mostrar resultado da cotação
  showQuoteResult(price) {
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
    
    const resultModal = this.createQuoteResultModal(formattedPrice);
    document.body.appendChild(resultModal);
    
    setTimeout(() => {
      resultModal.classList.add('active');
    }, 100);
  },

  // Criar modal de resultado
  createQuoteResultModal(price) {
    const modal = document.createElement('div');
    modal.className = 'modal quote-result-modal';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Sua Cotação</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="quote-result">
              <div class="result-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h4>Proteção Autoprotecta</h4>
              <div class="price-display">
                <span class="price">${price}</span>
                <span class="period">por mês</span>
              </div>
              <ul class="benefits">
                <li><i class="fas fa-check"></i> Guincho 24h ilimitado</li>
                <li><i class="fas fa-check"></i> Carro reserva</li>
                <li><i class="fas fa-check"></i> Assistência técnica</li>
                <li><i class="fas fa-check"></i> Proteção contra roubo</li>
              </ul>
              <button class="btn-primary btn-large">
                <i class="fas fa-phone"></i>
                Contratar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Adicionar event listener para fechar
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.remove();
    });
    
    return modal;
  },

  // Sistema de notificações toast
  showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = this.getNotificationIcon(type);
    notification.innerHTML = `
      <div class="notification-content">
        <i class="${icon}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">&times;</button>
    `;
    
    // Container de notificações
    let container = document.querySelector('.notifications-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'notifications-container';
      document.body.appendChild(container);
    }
    
    container.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Remover automaticamente
    setTimeout(() => {
      this.removeNotification(notification);
    }, duration);
    
    // Botão de fechar
    notification.querySelector('.notification-close').addEventListener('click', () => {
      this.removeNotification(notification);
    });
  },

  // Ícones para notificações
  getNotificationIcon(type) {
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
  },

  // Remover notificação
  removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  },

  // Chat bot simulado
  initChatBot() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWidget = document.querySelector('.chat-widget');
    
    if (chatToggle && chatWidget) {
      chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
      });
      
      this.setupChatMessages();
    }
  },

  // Configurar mensagens do chat
  setupChatMessages() {
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatInput && chatSend && chatMessages) {
      // Mensagem de boas-vindas
      this.addChatMessage('Olá! Sou a assistente virtual da Autoprotecta. Como posso ajudar você hoje?', 'bot');
      
      chatSend.addEventListener('click', () => {
        this.sendChatMessage(chatInput, chatMessages);
      });
      
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendChatMessage(chatInput, chatMessages);
        }
      });
    }
  },

  // Enviar mensagem do chat
  sendChatMessage(input, messagesContainer) {
    const message = input.value.trim();
    if (!message) return;
    
    // Adicionar mensagem do usuário
    this.addChatMessage(message, 'user');
    input.value = '';
    
    // Simular resposta do bot
    setTimeout(() => {
      const response = this.generateBotResponse(message);
      this.addChatMessage(response, 'bot');
    }, 1000);
  },

  // Adicionar mensagem ao chat
  addChatMessage(message, sender) {
    const messagesContainer = document.querySelector('.chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}`;
    
    messageElement.innerHTML = `
      <div class="message-content">
        ${sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'}
        <span>${message}</span>
      </div>
      <div class="message-time">${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  },

  // Gerar resposta do bot
  generateBotResponse(userMessage) {
    const responses = {
      cotacao: 'Claro! Para fazer uma cotação, preciso de algumas informações sobre seu veículo. Qual o tipo do seu veículo?',
      preco: 'Nossos preços variam de acordo com o tipo de veículo e cobertura. Posso fazer uma simulação para você!',
      contato: 'Você pode nos contatar pelo telefone 0800 123 4567 ou WhatsApp. Estamos disponíveis 24h!',
      cobertura: 'Oferecemos cobertura completa: guincho 24h, carro reserva, assistência técnica e muito mais!',
      default: 'Entendi sua dúvida! Um de nossos especialistas entrará em contato para te ajudar melhor. Posso anotar seu telefone?'
    };
    
    const message = userMessage.toLowerCase();
    
    if (message.includes('cotacao') || message.includes('cotação') || message.includes('preço')) {
      return responses.cotacao;
    } else if (message.includes('contato') || message.includes('telefone')) {
      return responses.contato;
    } else if (message.includes('cobertura') || message.includes('proteção')) {
      return responses.cobertura;
    } else {
      return responses.default;
    }
  }
};

// ================================================
// INICIALIZAÇÃO
// ================================================

/**
 * Inicializar aplicação quando DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🛡️ Autoprotecta - Sistema inicializado');
  
  // Inicializar componentes principais
  Animations.initIntersectionObserver();
  Animations.animateLogo();
  
  UIInteractions.init();
  
  Performance.initLazyLoading();
  Performance.preloadCriticalResources();
  Performance.monitorPerformance();
  
  AutoprotectaFeatures.initQuoteCalculator();
  AutoprotectaFeatures.initChatBot();
  
  // Adicionar estilos CSS dinâmicos
  addDynamicStyles();
  
  // Configurar eventos globais
  setupGlobalEvents();
  
  // Animar elementos iniciais após carregamento (excluindo features)
  setTimeout(() => {
    Animations.staggerCards('.service-card', 150);
  }, 500);
});

/**
 * Adicionar estilos CSS dinâmicos via JavaScript
 */
function addDynamicStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Estilos para ripple effect */
    .ripple {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    /* Estilos para notificações */
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      pointer-events: none;
    }
    
    .notification {
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
      box-shadow: var(--shadow-lg);
      border-left: 4px solid var(--orioles-orange);
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      pointer-events: auto;
      max-width: 400px;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification.success {
      border-left-color: #10b981;
    }
    
    .notification.error {
      border-left-color: #ef4444;
    }
    
    .notification.warning {
      border-left-color: #f59e0b;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }
    
    .notification-close {
      position: absolute;
      top: 5px;
      right: 10px;
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: #666;
    }
    
    /* Estilos para modal de cotação */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
    }
    
    .modal.active {
      opacity: 1;
      visibility: visible;
    }
    
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(12, 12, 12, 0.8);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal-content {
      background: white;
      border-radius: var(--radius-xl);
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      transform: scale(0.7);
      transition: transform 0.3s ease-in-out;
    }
    
    .modal.active .modal-content {
      transform: scale(1);
    }
    
    .modal-header {
      padding: var(--spacing-lg);
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
    }
    
    .modal-body {
      padding: var(--spacing-lg);
    }
    
    .quote-result {
      text-align: center;
    }
    
    .result-icon {
      width: 80px;
      height: 80px;
      background: var(--orioles-orange);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--spacing-lg);
      font-size: var(--font-size-2xl);
      color: white;
    }
    
    .price-display {
      margin: var(--spacing-lg) 0;
    }
    
    .price {
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-black);
      color: var(--orioles-orange);
      display: block;
    }
    
    .period {
      color: #666;
      font-size: var(--font-size-sm);
    }
    
    .benefits {
      list-style: none;
      text-align: left;
      margin: var(--spacing-lg) 0;
    }
    
    .benefits li {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-sm);
    }
    
    .benefits i {
      color: var(--orioles-orange);
    }
    
    /* Estilos para chat widget */
    .chat-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: var(--orioles-orange);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      transition: var(--transition-normal);
    }
    
    .chat-toggle:hover {
      transform: scale(1.1);
    }
    
    .chat-widget {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 300px;
      height: 400px;
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease-in-out;
    }
    
    .chat-widget.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    /* Estilos para loader */
    .loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(12, 12, 12, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      color: white;
    }
    
    .loader .spinner {
      margin-bottom: var(--spacing-lg);
    }
    
    /* Estilos para campos com erro */
    input.error,
    textarea.error,
    select.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .field-error {
      color: #ef4444;
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-xs);
    }
    
    /* Estilos para tooltip */
    .tooltip {
      position: absolute;
      background: var(--smoky-black);
      color: var(--platinum);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-sm);
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      z-index: 10000;
      pointer-events: none;
    }
    
    .tooltip.visible {
      opacity: 1;
    }
    
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: var(--smoky-black);
    }
  `;
  
  document.head.appendChild(style);
}

/**
 * Configurar eventos globais
 */
function setupGlobalEvents() {
  // Navegação suave para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        Utils.smoothScrollTo(targetElement);
      }
    });
  });
  
  // Tratamento de resize da janela
  window.addEventListener('resize', Utils.debounce(() => {
    // Reajustar elementos dependentes do tamanho da tela
    console.log('Redimensionamento detectado');
  }, 250));
  
  // Detectar mudanças de orientação em dispositivos móveis
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      // Reajustar layout após mudança de orientação
      window.scrollTo(0, window.scrollY);
    }, 100);
  });
  
  // Tratamento de perda de foco da aba
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      console.log('Aba perdeu foco');
    } else {
      console.log('Aba ganhou foco');
    }
  });
}

/**
 * Funções utilitárias para desenvolvedores
 */
window.Autoprotecta = {
  // API pública para interagir com o sistema
  showNotification: AutoprotectaFeatures.showNotification.bind(AutoprotectaFeatures),
  openModal: UIInteractions.openModal.bind(UIInteractions),
  closeModal: UIInteractions.closeModal.bind(UIInteractions),
  animateElement: Animations.animateElement.bind(Animations),
  
  // Debug e desenvolvimento
  debug: {
    state: AutoprotectaApp.state,
    settings: AutoprotectaApp.animationSettings,
    utils: Utils
  }
};

// Log de inicialização
console.log('🚀 Autoprotecta Design System carregado com sucesso!');
console.log('📖 Acesse window.Autoprotecta para funções públicas');
console.log('🔧 Acesse window.Autoprotecta.debug para ferramentas de desenvolvimento');