// Variáveis globais
let currentStep = 1;
const totalSteps = 3;












// Função para navegar para o próximo passo
function nextStep() {
    if (currentStep < totalSteps) {
        // Validar campos do passo atual
        if (validateCurrentStep()) {
            // Esconder passo atual com animação
            const currentStepElement = document.getElementById(`step${currentStep}`);
            currentStepElement.style.opacity = '0';
            currentStepElement.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                // Esconder passo atual
                currentStepElement.classList.remove('active');
                
                // Avançar para próximo passo
                currentStep++;
                
                // Mostrar próximo passo
                const nextStepElement = document.getElementById(`step${currentStep}`);
                nextStepElement.classList.add('active');
                
                // Atualizar indicadores de progresso
                updateStepIndicators();
                
                // Atualizar barra de progresso
                updateProgressBar();
                
                // Scroll suave para o topo do formulário
                document.querySelector('.hero-form').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    }
}

// Função para navegar para o passo anterior
function prevStep() {
    if (currentStep > 1) {
        // Esconder passo atual com animação
        const currentStepElement = document.getElementById(`step${currentStep}`);
        currentStepElement.style.opacity = '0';
        currentStepElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Esconder passo atual
            currentStepElement.classList.remove('active');
            
            // Voltar para passo anterior
            currentStep--;
            
            // Mostrar passo anterior
            const prevStepElement = document.getElementById(`step${currentStep}`);
            prevStepElement.classList.add('active');
            
            // Atualizar indicadores de progresso
            updateStepIndicators();
            
            // Atualizar barra de progresso
            updateProgressBar();
        }, 300);
    }
}

// Função para validar o passo atual
function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            // Adicionar classe de erro
            field.classList.add('error');
            isValid = false;
        } else {
            // Remover classe de erro
            field.classList.remove('error');
        }
    });
    
    // Validação específica para email
    const emailField = currentStepElement.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
            emailField.classList.add('error');
            isValid = false;
        }
    }
    
    // Validação específica para WhatsApp
    const whatsappField = currentStepElement.querySelector('input[id="whatsapp"]');
    if (whatsappField && whatsappField.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = whatsappField.value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
            whatsappField.classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    // Atualizar todas as barras de progresso
    for (let i = 1; i <= totalSteps; i++) {
        const progressFill = document.querySelector(`#step${i} .progress-fill`);
        if (progressFill) {
            const progress = (i / totalSteps) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }
    
    // Atualizar texto de progresso
    const progressText = document.querySelector(`#step${currentStep} .progress-text`);
    if (progressText) {
        progressText.textContent = `Passo ${currentStep} de ${totalSteps}`;
    }
}

// Função para atualizar indicadores de progresso
function updateStepIndicators() {
    // Atualizar todos os indicadores
    for (let i = 1; i <= totalSteps; i++) {
        const stepIndicator = document.querySelector(`#step${i} .step-indicator .step-number:nth-child(${i})`);
        if (stepIndicator) {
            stepIndicator.classList.remove('active', 'completed');
            
            if (i < currentStep) {
                stepIndicator.classList.add('completed');
                // Adicionar animação de conclusão
                stepIndicator.style.animation = 'completedPulse 0.6s ease-out';
            } else if (i === currentStep) {
                stepIndicator.classList.add('active');
                // Adicionar animação de ativação
                stepIndicator.style.animation = 'none';
                setTimeout(() => {
                    stepIndicator.style.animation = 'completedPulse 0.6s ease-out';
                }, 100);
            }
        }
    }
}

// Função para scroll suave para o formulário
function scrollToForm() {
    document.querySelector('.hero-form').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Função para navegação suave para seções
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Função para lidar com o envio do formulário
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (validateCurrentStep()) {
        // Coletar todos os dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            whatsapp: document.getElementById('whatsapp').value,
            tipoVeiculo: document.getElementById('tipo-veiculo').value,
            marca: document.getElementById('marca').value,
            ano: document.getElementById('ano').value,
            modelo: document.getElementById('modelo').value,
            estado: document.getElementById('estado').value,
            cidade: document.getElementById('cidade').value,
            usoApp: document.getElementById('uso-app').value
        };
        
        // Aqui você pode implementar o envio para sua API
        console.log('Dados do formulário:', formData);
        
        // Mostrar mensagem de sucesso
        showSuccessMessage();
        
        // Resetar formulário
        resetForm();
    }
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 3rem; color: #FB4516; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #0C0C0C; margin-bottom: 16px;">Cotação enviada com sucesso!</h3>
            <p style="color: #666; margin-bottom: 24px;">Nossa equipe entrará em contato em até 24 horas com sua cotação personalizada.</p>
            <button onclick="resetForm()" style="background: #FB4516; color: white; border: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                <i class="fas fa-refresh"></i>
                Nova Cotação
            </button>
        </div>
    `;
    
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
}

// Função para resetar o formulário
function resetForm() {
    currentStep = 1;
    
    // Limpar todos os campos
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.value = '';
        input.classList.remove('error');
    });
    
    // Voltar para o primeiro passo
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
        step.style.opacity = '1';
        step.style.transform = 'translateY(0)';
    });
    document.getElementById('step1').classList.add('active');
    
    // Atualizar indicadores
    updateStepIndicators();
    
    // Atualizar barra de progresso
    updateProgressBar();
    
    // Restaurar formulário original
    location.reload();
}

// Função para inicializar o formulário
function initializeForm() {
    // Configurar estado inicial
    currentStep = 1;
    
    // Atualizar indicadores
    updateStepIndicators();
    
    // Atualizar barra de progresso
    updateProgressBar();
    
    // Adicionar transições suaves aos passos
    document.querySelectorAll('.form-step').forEach(step => {
        step.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// Função para controlar o header no scroll
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(12, 12, 12, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(12, 12, 12, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Função para adicionar estilos de erro dinamicamente
function addErrorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error {
            border-color: #ff4444;
            box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
        }
        
        .success-message {
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .header {
            transition: all 0.3s ease;
        }
        
        .nav-link.active {
            color: #FB4516;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Função para destacar link ativo no menu
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Adicionar listeners de eventos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carregar página salva
    loadSavedPage();
    
    // Inicializar formulário
    initializeForm();
    
    // Adicionar listener para o formulário
    const form = document.querySelector('.form-container');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Adicionar listeners para validação em tempo real
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error') && this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });
    
    // Adicionar navegação suave para links do menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            smoothScrollToSection(sectionId);
        });
    });
    
    // Adicionar animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Adicionar animação de entrada específica para cada tipo de elemento
                if (entry.target.classList.contains('benefit-item')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out';
                } else if (entry.target.classList.contains('step-item')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out 0.1s both';
                } else if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out 0.2s both';
                } else if (entry.target.classList.contains('stat-item')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out 0.3s both';
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.benefit-item, .step-item, .testimonial-card, .feature-item, .stat-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Adicionar delay escalonado para animação em sequência
        el.style.animationDelay = `${index * 0.1}s`;
        
        observer.observe(el);
    });
    
    // Adicionar animações CSS dinâmicas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .benefit-item:hover {
            animation: fadeInScale 0.3s ease-out;
        }
        
        .step-item:hover {
            animation: fadeInScale 0.3s ease-out;
        }
        
        .testimonial-card:hover {
            animation: fadeInScale 0.3s ease-out;
        }
        
        .stat-item:hover {
            animation: fadeInScale 0.3s ease-out;
        }
        
        .form-step.active {
            animation: slideInLeft 0.5s ease-out;
        }
        
        /* Estilos para notificação de tema */
        .theme-notification {
            animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
            }
            to {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar efeito de parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Controlar header no scroll
        handleHeaderScroll();
        
        // Destacar link ativo no menu
        highlightActiveNavLink();
    });
    
    // Adicionar listener para scroll do header
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Adicionar listener para scroll para destacar menu ativo
    window.addEventListener('scroll', highlightActiveNavLink);
    
    // Adicionar funcionalidade de scroll para o topo
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #FB4516;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(251, 69, 22, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Mostrar/ocultar botão de scroll para o topo
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão scroll para o topo
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects para o botão
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(251, 69, 22, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(251, 69, 22, 0.3)';
    });
    

});

// Adicionar estilos de erro
addErrorStyles();
