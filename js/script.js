// ===== FORMULÁRIO MULTI-ETAPAS - FUNCIONALIDADES MELHORADAS =====

// Variáveis globais para formulário em etapas
let currentStep = 1;
const totalSteps = 3;
let formData = {};

// Variáveis para formulário de cotação
let cotacaoCurrentStep = 1;
const cotacaoTotalSteps = 4;
let cotacaoFormData = {};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    
    // Verificar se existe o formulário de cotação
    const cotacaoForm = document.getElementById('cotacaoForm');
    if (cotacaoForm) {
        updateCotacaoProgressBar();
        updateCotacaoStepIndicators();
    }
});

// Inicialização do formulário
function initializeForm() {
    // Verificar se estamos na página de negócios
    const businessForm = document.getElementById('businessForm');
    if (businessForm) {
        // Inicializar primeiro passo
        showStep(1);
        
        // Configurar validação em tempo real
        setupRealTimeValidation();
        
        // Configurar máscaras de input
        setupInputMasks();
    }
    
    // Verificar se estamos na página principal com formulário de cotação
    const cotacaoForm = document.getElementById('cotacaoForm');
    if (cotacaoForm) {
        // Inicializar primeiro passo
        showCotacaoStep(1);
        
        // Configurar validação em tempo real
        setupCotacaoRealTimeValidation();
        
        // Configurar máscaras de input
        setupCotacaoInputMasks();
        
        // Atualizar indicadores
        updateCotacaoStepIndicators();
        updateCotacaoProgressBar();
    }
}

// Configuração dos event listeners
function setupEventListeners() {
    // Event listeners para navegação entre etapas
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-next')) {
            e.preventDefault();
            nextStep();
        } else if (e.target.classList.contains('btn-prev')) {
            e.preventDefault();
            prevStep();
        } else if (e.target.classList.contains('step-number')) {
            e.preventDefault();
            const targetStep = parseInt(e.target.dataset.step);
            if (targetStep <= currentStep || isStepCompleted(targetStep - 1)) {
                goToStep(targetStep);
            }
        }
    });

    // Event listener para envio do formulário
    const businessForm = document.getElementById('businessForm');
    if (businessForm) {
        businessForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Event listener para envio do formulário de cotação
    const cotacaoForm = document.getElementById('cotacaoForm');
    if (cotacaoForm) {
        cotacaoForm.addEventListener('submit', handleCotacaoFormSubmit);
    }
}

// Navegação para o próximo passo
function nextStep() {
    if (currentStep < totalSteps) {
        if (validateCurrentStep()) {
            // Salvar dados do passo atual
            saveCurrentStepData();
            
            // Marcar passo como completo
            markStepAsCompleted(currentStep);
            
            // Navegar para próximo passo
            const nextStepNumber = currentStep + 1;
            navigateToStep(nextStepNumber, 'next');
        }
    }
}

// Navegação para o passo anterior
function prevStep() {
    if (currentStep > 1) {
        const prevStepNumber = currentStep - 1;
        navigateToStep(prevStepNumber, 'prev');
    }
}

// Navegação direta para um passo específico
function goToStep(targetStep) {
    if (targetStep >= 1 && targetStep <= totalSteps) {
        const direction = targetStep > currentStep ? 'next' : 'prev';
        navigateToStep(targetStep, direction);
    }
}

// Navegação entre etapas com animações
function navigateToStep(stepNumber, direction) {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const targetStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
    
    if (!currentStepElement || !targetStepElement) return;
    
    // Animações de saída
    if (direction === 'next') {
        currentStepElement.classList.add('slide-out-left');
    } else {
        currentStepElement.classList.add('slide-out-right');
    }
    
    setTimeout(() => {
        // Esconder passo atual
        currentStepElement.classList.remove('active', 'slide-out-left', 'slide-out-right');
        
        // Atualizar variável global
        currentStep = stepNumber;
        
        // Mostrar passo alvo
        targetStepElement.classList.add('active');
        if (direction === 'next') {
            targetStepElement.classList.add('slide-in-right');
        } else {
            targetStepElement.classList.add('slide-in-left');
        }
        
        // Remover classes de animação após transição
        setTimeout(() => {
            targetStepElement.classList.remove('slide-in-right', 'slide-in-left');
        }, 400);
        
        // Atualizar indicadores
        updateStepIndicators();
        updateProgressBar();
        
        // Scroll suave para o topo do formulário
        scrollToFormTop();
        
        // Focar no primeiro campo do passo
        focusFirstField(targetStepElement);
        
    }, 400);
}

// Mostrar um passo específico
function showStep(stepNumber) {
    const allSteps = document.querySelectorAll('.form-step');
    allSteps.forEach(step => {
        step.classList.remove('active');
    });
    
    const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
}

// Validação do passo atual
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepElement) return false;
    
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    // Limpar mensagens de erro anteriores
    clearErrorMessages(currentStepElement);
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
            showFieldError(field, getErrorMessage(field));
        } else {
            markFieldAsValid(field);
        }
    });
    
    // Validações específicas por passo
    if (currentStep === 2) {
        if (!validateCoverageSelection()) {
            isValid = false;
        }
    }
    
    if (currentStep === 3) {
        if (!validateContactInfo()) {
            isValid = false;
        }
    }
    
    return isValid;
}

// Validação de campo individual
function validateField(field) {
    const value = field.value.trim();
    
    // Campo obrigatório
    if (field.hasAttribute('required') && !value) {
        return false;
    }
    
    // Validações específicas por tipo
    switch (field.type) {
        case 'email':
            return validateEmail(value);
        case 'tel':
            return validatePhone(value);
        default:
            return true;
    }
}

// Validação de email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validação de telefone
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Validação da seleção de cobertura
function validateCoverageSelection() {
    const coverageType = document.getElementById('coverageType');
    const additionalCoverages = document.querySelectorAll('input[name="additionalCoverage"]:checked');
    
    if (!coverageType.value) {
        showFieldError(coverageType, 'Selecione um tipo de cobertura');
        return false;
    }
    
    if (additionalCoverages.length === 0) {
        const checkboxGroup = document.querySelector('.checkbox-group');
        showGroupError(checkboxGroup, 'Selecione pelo menos uma cobertura adicional');
        return false;
    }
    
    return true;
}

// Validação das informações de contato
function validateContactInfo() {
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    
    let isValid = true;
    
    if (!contactName.value.trim()) {
        showFieldError(contactName, 'Nome é obrigatório');
        isValid = false;
    }
    
    if (!validateEmail(contactEmail.value)) {
        showFieldError(contactEmail, 'E-mail inválido');
        isValid = false;
    }
    
    if (!validatePhone(contactPhone.value)) {
        showFieldError(contactPhone, 'Telefone inválido');
        isValid = false;
    }
    
    return isValid;
}

// Mostrar erro de campo
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remover mensagem de erro anterior
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Criar nova mensagem de erro
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    field.parentNode.appendChild(errorMessage);
}

// Mostrar erro de grupo
function showGroupError(groupElement, message) {
    const existingError = groupElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    groupElement.appendChild(errorMessage);
}

// Limpar mensagens de erro
function clearErrorMessages(container) {
    const errorMessages = container.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorFields = container.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Marcar campo como válido
function markFieldAsValid(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    // Remover classe de sucesso após um tempo
    setTimeout(() => {
        field.classList.remove('success');
    }, 2000);
}

// Obter mensagem de erro para um campo
function getErrorMessage(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        return 'Este campo é obrigatório';
    }
    
    switch (field.type) {
        case 'email':
            return 'E-mail inválido';
        case 'tel':
            return 'Telefone inválido';
        default:
            return 'Campo inválido';
    }
}

// Salvar dados do passo atual
function saveCurrentStepData() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepElement) return;
    
    const formFields = currentStepElement.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        if (field.name) {
            if (field.type === 'checkbox') {
                if (field.checked) {
                    if (!formData[field.name]) {
                        formData[field.name] = [];
                    }
                    formData[field.name].push(field.value);
                }
            } else {
                formData[field.name] = field.value;
            }
        }
    });
}

// Marcar passo como completo
function markStepAsCompleted(stepNumber) {
    const stepIndicator = document.querySelector(`[data-step="${stepNumber}"]`);
    if (stepIndicator) {
        stepIndicator.classList.add('completed');
    }
}

// Verificar se um passo está completo
function isStepCompleted(stepNumber) {
    const stepIndicator = document.querySelector(`[data-step="${stepNumber}"]`);
    return stepIndicator && stepIndicator.classList.contains('completed');
}

// Atualizar indicadores de etapas
function updateStepIndicators() {
    const stepNumbers = document.querySelectorAll('.step-number');
    
    stepNumbers.forEach((step, index) => {
        const stepNum = index + 1;
        
        step.classList.remove('active', 'completed');
        
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
        }
    });
}

// Atualizar barra de progresso
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill-business');
    if (progressFill) {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// Scroll suave para o topo do formulário
function scrollToFormTop() {
    const formSection = document.querySelector('.form-section');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Focar no primeiro campo do passo
function focusFirstField(stepElement) {
    const firstField = stepElement.querySelector('input, select, textarea');
    if (firstField) {
        setTimeout(() => {
            firstField.focus();
        }, 100);
    }
}

// Configuração de validação em tempo real
function setupRealTimeValidation() {
    const form = document.getElementById('businessForm');
    if (!form) return;
    
    form.addEventListener('input', function(e) {
        const field = e.target;
        if (field.hasAttribute('required')) {
            if (validateField(field)) {
                field.classList.remove('error');
                field.classList.add('success');
                
                // Remover mensagem de erro
                const errorMessage = field.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            } else {
                field.classList.remove('success');
            }
        }
    });
    
    form.addEventListener('blur', function(e) {
        const field = e.target;
        if (field.hasAttribute('required')) {
            if (!validateField(field)) {
                showFieldError(field, getErrorMessage(field));
            }
        }
    });
}

// Configuração de máscaras de input
function setupInputMasks() {
    // Máscara para CNPJ
    const cnpjField = document.getElementById('cnpj-business');
    if (cnpjField) {
        cnpjField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 14) {
                value = value.replace(/^(\d{2})(\d)/, '$1.$2');
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }
    
    // Máscara para telefone
    const phoneField = document.getElementById('contactPhone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length === 11) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length === 10) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else if (value.length === 8) {
                    value = value.replace(/^(\d{4})(\d{4})/, '$1-$2');
                }
                e.target.value = value;
            }
        });
    }
}

// Manipulação do envio do formulário
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateCurrentStep()) {
        // Salvar dados do último passo
        saveCurrentStepData();
        
        // Mostrar estado de carregamento
        const submitButton = e.target.querySelector('.btn-submit');
        if (submitButton) {
            submitButton.classList.add('loading');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
        }
        
        // Simular envio (substituir por chamada real da API)
        setTimeout(() => {
            // Sucesso
            showSuccessMessage();
            
            // Resetar formulário
            resetForm();
            
            // Remover estado de carregamento
            if (submitButton) {
                submitButton.classList.remove('loading');
                submitButton.textContent = 'Enviar Solicitação';
                submitButton.disabled = false;
            }
        }, 2000);
    }
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    if (!formContainer) return;
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: var(--space-8);">
            <div style="font-size: 3rem; color: #10b981; margin-bottom: var(--space-4);">✓</div>
            <h3 style="color: #10b981; margin-bottom: var(--space-4);">Solicitação Enviada com Sucesso!</h3>
            <p style="color: var(--text-muted); margin-bottom: var(--space-6);">
                Nossa equipe entrará em contato em até 24 horas para apresentar sua proposta personalizada.
            </p>
            <button onclick="resetForm()" class="btn-next" style="background: var(--orioles-orange);">
                Nova Solicitação
            </button>
        </div>
    `;
    
    // Substituir formulário pela mensagem de sucesso
    const form = formContainer.querySelector('.multi-step-form');
    if (form) {
        form.style.display = 'none';
    }
    
    formContainer.appendChild(successMessage);
}

// Resetar formulário
function resetForm() {
    // Resetar variáveis
    currentStep = 1;
    formData = {};
    
    // Resetar formulário
    const form = document.getElementById('businessForm');
    if (form) {
        form.reset();
    }
    
    // Resetar indicadores
    updateStepIndicators();
    updateProgressBar();
    
    // Mostrar primeiro passo
    showStep(1);
    
    // Remover mensagem de sucesso
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.remove();
    }
    
    // Mostrar formulário novamente
    const hiddenForm = document.querySelector('.multi-step-form');
    if (hiddenForm) {
        hiddenForm.style.display = 'block';
    }
    
    // Limpar classes de erro/sucesso
    const allFields = form.querySelectorAll('input, select, textarea');
    allFields.forEach(field => {
        field.classList.remove('error', 'success');
    });
    
    // Limpar mensagens de erro
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

// Função para navegar para o próximo passo
function nextStep() {
    if (currentStep < totalSteps) {
        // Validar campos do passo atual
        if (validateCurrentStep()) {
            // Esconder passo atual com animação
            const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
            currentStepElement.style.opacity = '0';
            currentStepElement.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                // Esconder passo atual
                currentStepElement.classList.remove('active');
                
                // Avançar para próximo passo
                currentStep++;
                
                // Mostrar próximo passo
                const nextStepElement = document.querySelector(`[data-step="${currentStep}"]`);
                nextStepElement.classList.add('active');
                
                // Atualizar indicadores de progresso
                updateStepIndicators();
                
                // Atualizar barra de progresso
                updateProgressBar();
                
                // Scroll suave para o topo do formulário
                scrollToForm();
            }, 300);
        }
    }
}

// Função para navegar para o passo anterior
function prevStep() {
    if (currentStep > 1) {
        // Esconder passo atual com animação
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        currentStepElement.style.opacity = '0';
        currentStepElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Esconder passo atual
            currentStepElement.classList.remove('active');
            
            // Voltar para passo anterior
            currentStep--;
            
            // Mostrar passo anterior
            const prevStepElement = document.querySelector(`[data-step="${currentStep}"]`);
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
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
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
    const formSection = document.getElementById('form-section');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
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

// ===== FUNÇÕES PARA FORMULÁRIO DE COTAÇÃO EM ETAPAS =====

// Função comentada para evitar conflitos - usando nextCotacaoStep específica
// function nextStep() {
//     if (cotacaoCurrentStep < cotacaoTotalSteps) {
//         if (validateCotacaoStep()) {
//             saveCotacaoStepData();
//             markCotacaoStepAsCompleted(cotacaoCurrentStep);
//             
//             const nextStepNumber = cotacaoCurrentStep + 1;
//             navigateToCotacaoStep(nextStepNumber, 'next');
//         }
//     }
// }

// Função comentada para evitar conflitos - usando prevCotacaoStep específica
// function prevStep() {
//     if (cotacaoCurrentStep > 1) {
//         const prevStepNumber = cotacaoCurrentStep - 1;
//         navigateToCotacaoStep(prevStepNumber, 'prev');
//     }
// }

// Navegação entre etapas do formulário de cotação
function navigateToCotacaoStep(stepNumber, direction) {
    const currentStepElement = document.querySelector(`[data-step="${cotacaoCurrentStep}"]`);
    const targetStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
    
    if (!currentStepElement || !targetStepElement) return;
    
    // Animações de saída
    if (direction === 'next') {
        currentStepElement.classList.add('slide-out-left');
    } else {
        currentStepElement.classList.add('slide-out-right');
    }
    
    setTimeout(() => {
        // Esconder passo atual
        currentStepElement.classList.remove('active', 'slide-out-left', 'slide-out-right');
        
        // Atualizar variável global
        cotacaoCurrentStep = stepNumber;
        
        // Mostrar passo alvo
        targetStepElement.classList.add('active');
        if (direction === 'next') {
            targetStepElement.classList.add('slide-in-right');
        } else {
            targetStepElement.classList.add('slide-in-left');
        }
        
        // Remover classes de animação após transição
        setTimeout(() => {
            targetStepElement.classList.remove('slide-in-right', 'slide-in-left');
        }, 400);
        
        // Atualizar indicadores
        updateCotacaoStepIndicators();
        updateCotacaoProgressBar();
        
        // Focar no primeiro campo do passo
        focusFirstField(targetStepElement);
        
    }, 400);
}

// Validação do passo atual do formulário de cotação
function validateCotacaoStep() {
    console.log('Validando etapa:', cotacaoCurrentStep);
    const currentStepElement = document.querySelector(`[data-step="${cotacaoCurrentStep}"]`);
    console.log('Elemento da etapa encontrado:', currentStepElement);
    
    if (!currentStepElement) {
        console.log('Elemento da etapa não encontrado!');
        return false;
    }
    
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    console.log('Campos obrigatórios encontrados:', requiredFields.length);
    let isValid = true;
    
    // Limpar mensagens de erro anteriores
    clearCotacaoErrorMessages(currentStepElement);
    
    requiredFields.forEach(field => {
        if (!validateCotacaoField(field)) {
            isValid = false;
            showCotacaoFieldError(field, getCotacaoErrorMessage(field));
        } else {
            markCotacaoFieldAsValid(field);
        }
    });
    
    return isValid;
}

// Validação de campo individual do formulário de cotação
function validateCotacaoField(field) {
    const value = field.value.trim();
    
    // Campo obrigatório
    if (field.hasAttribute('required') && !value) {
        return false;
    }
    
    // Validações específicas por tipo
    switch (field.type) {
        case 'email':
            return validateEmail(value);
        case 'tel':
            return validatePhone(value);
        default:
            return true;
    }
}

// Mostrar erro de campo no formulário de cotação
function showCotacaoFieldError(field, message) {
    field.classList.add('error');
    
    // Remover mensagem de erro anterior
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Criar nova mensagem de erro
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    field.parentNode.appendChild(errorMessage);
}

// Limpar mensagens de erro do formulário de cotação
function clearCotacaoErrorMessages(container) {
    const errorMessages = container.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorFields = container.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Marcar campo como válido no formulário de cotação
function markCotacaoFieldAsValid(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    // Remover classe de sucesso após um tempo
    setTimeout(() => {
        field.classList.remove('success');
    }, 2000);
}

// Obter mensagem de erro para um campo do formulário de cotação
function getCotacaoErrorMessage(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        return 'Este campo é obrigatório';
    }
    
    switch (field.type) {
        case 'email':
            return 'E-mail inválido';
        case 'tel':
            return 'Telefone inválido';
        default:
            return 'Campo inválido';
    }
}

// Salvar dados do passo atual do formulário de cotação
function saveCotacaoStepData() {
    const currentStepElement = document.querySelector(`[data-step="${cotacaoCurrentStep}"]`);
    if (!currentStepElement) return;
    
    const formFields = currentStepElement.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        if (field.name) {
            if (field.type === 'checkbox') {
                if (field.checked) {
                    if (!cotacaoFormData[field.name]) {
                        cotacaoFormData[field.name] = [];
                    }
                    cotacaoFormData[field.name].push(field.value);
                }
            } else {
                cotacaoFormData[field.name] = field.value;
            }
        }
    });
}

// Marcar passo como completo no formulário de cotação
function markCotacaoStepAsCompleted(stepNumber) {
    const stepIndicator = document.querySelector(`[data-step="${stepNumber}"]`);
    if (stepIndicator) {
        stepIndicator.classList.add('completed');
    }
}

// Atualizar indicadores de etapas do formulário de cotação
function updateCotacaoStepIndicators() {
    const stepNumbers = document.querySelectorAll('.step-number');
    
    stepNumbers.forEach((step, index) => {
        const stepNum = index + 1;
        
        step.classList.remove('active', 'completed');
        
        if (stepNum === cotacaoCurrentStep) {
            step.classList.add('active');
        } else if (stepNum < cotacaoCurrentStep) {
            step.classList.add('completed');
        }
    });
}

// Atualizar barra de progresso do formulário de cotação
function updateCotacaoProgressBar() {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const progress = (cotacaoCurrentStep / cotacaoTotalSteps) * 100;
        progressFill.style.width = progress + '%';
    }
}

// Atualizar indicadores de etapa do formulário de cotação
function updateCotacaoStepIndicators() {
    const stepIndicators = document.querySelectorAll('.step-indicator-modern');
    const currentStepElement = document.getElementById('currentStep');
    
    stepIndicators.forEach((indicator, index) => {
        const stepNumber = index + 1;
        const stepCircle = indicator.querySelector('.w-8');
        const stepLabel = indicator.querySelector('span');
        
        if (stepNumber < cotacaoCurrentStep) {
            // Etapa completada
            stepCircle.classList.remove('bg-gray-300', 'text-gray-600');
            stepCircle.classList.add('bg-green-500', 'text-white');
            stepLabel.classList.remove('text-muted');
            stepLabel.classList.add('text-green-600');
        } else if (stepNumber === cotacaoCurrentStep) {
            // Etapa atual
            stepCircle.classList.remove('bg-gray-300', 'text-gray-600', 'bg-green-500', 'text-green-600');
            stepCircle.classList.add('bg-orange', 'text-white');
            stepLabel.classList.remove('text-muted', 'text-green-600');
            stepLabel.classList.add('text-primary');
        } else {
            // Etapa futura
            stepCircle.classList.remove('bg-orange', 'text-white', 'bg-green-500', 'text-green-600');
            stepCircle.classList.add('bg-gray-300', 'text-gray-600');
            stepLabel.classList.remove('text-primary', 'text-green-600');
            stepLabel.classList.add('text-muted');
        }
    });
    
    if (currentStepElement) {
        currentStepElement.textContent = cotacaoCurrentStep;
    }
}

// Focar no primeiro campo do passo
function focusFirstField(stepElement) {
    const firstField = stepElement.querySelector('input, select, textarea');
    if (firstField) {
        setTimeout(() => {
            firstField.focus();
        }, 100);
    }
}

// Função para scroll suave para o formulário
function scrollToForm() {
    const formSection = document.getElementById('cotacao');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mostrar um passo específico do formulário de cotação
function showCotacaoStep(stepNumber) {
    console.log('showCotacaoStep chamada para etapa:', stepNumber);
    const allSteps = document.querySelectorAll('.form-step');
    console.log('Total de etapas encontradas:', allSteps.length);
    
    allSteps.forEach(step => {
        step.classList.remove('active');
        step.style.display = 'none';
    });
    
    const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
    console.log('Etapa alvo encontrada:', targetStep);
    
    if (targetStep) {
        targetStep.classList.add('active');
        targetStep.style.display = 'block';
    }
}

// Configuração de validação em tempo real para formulário de cotação
function setupCotacaoRealTimeValidation() {
    const form = document.getElementById('cotacaoForm');
    if (!form) return;
    
    form.addEventListener('input', function(e) {
        const field = e.target;
        if (field.hasAttribute('required')) {
            if (validateCotacaoField(field)) {
                field.classList.remove('error');
                field.classList.add('success');
                
                // Remover mensagem de erro
                const errorMessage = field.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            } else {
                field.classList.remove('success');
            }
        }
    });
    
    form.addEventListener('blur', function(e) {
        const field = e.target;
        if (field.hasAttribute('required')) {
            if (!validateCotacaoField(field)) {
                showCotacaoFieldError(field, getCotacaoErrorMessage(field));
            }
        }
    });
}

// Configuração de máscaras de input para formulário de cotação
function setupCotacaoInputMasks() {
    // Máscara para telefone
    const phoneField = document.getElementById('telefone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length === 11) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length === 10) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else if (value.length === 8) {
                    value = value.replace(/^(\d{4})(\d{4})/, '$1-$2');
                }
                e.target.value = value;
            }
        });
    }
}

// Manipulação do envio do formulário de cotação
function handleCotacaoFormSubmit(e) {
    e.preventDefault();
    
    if (validateCotacaoStep()) {
        // Salvar dados do último passo
        saveCotacaoStepData();
        
        // Mostrar estado de carregamento
        const submitButton = e.target.querySelector('.btn-submit');
        if (submitButton) {
            submitButton.classList.add('loading');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
        }
        
        // Simular envio (substituir por chamada real da API)
        setTimeout(() => {
            // Sucesso
            showCotacaoSuccessMessage();
            
            // Resetar formulário
            resetCotacaoForm();
            
            // Remover estado de carregamento
            if (submitButton) {
                submitButton.classList.remove('loading');
                submitButton.textContent = 'Solicitar Cotação Gratuita';
                submitButton.disabled = false;
            }
        }, 2000);
    }
}

// Mostrar mensagem de sucesso do formulário de cotação
function showCotacaoSuccessMessage() {
    const formContainer = document.querySelector('.card-body');
    if (!formContainer) return;
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="text-align: center; padding: var(--space-8);">
            <div style="font-size: 3rem; color: #10b981; margin-bottom: var(--space-4);">✓</div>
            <h3 style="color: #10b981; margin-bottom: var(--space-4);">Cotação Enviada com Sucesso!</h3>
            <p style="color: var(--text-muted); margin-bottom: var(--space-6);">
                Nossa equipe entrará em contato em até 2 horas úteis para apresentar sua proposta personalizada.
            </p>
            <button onclick="resetCotacaoForm()" class="btn-next" style="background: var(--orioles-orange);">
                Nova Cotação
            </button>
        </div>
    `;
    
    // Substituir formulário pela mensagem de sucesso
    const form = formContainer.querySelector('.multi-step-form');
    if (form) {
        form.style.display = 'none';
    }
    
    // Esconder barra de progresso
    const progressContainer = formContainer.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.style.display = 'none';
    }
    
    formContainer.appendChild(successMessage);
}

// Resetar formulário de cotação
function resetCotacaoForm() {
    // Resetar variáveis
    cotacaoCurrentStep = 1;
    cotacaoFormData = {};
    
    // Resetar formulário
    const form = document.getElementById('cotacaoForm');
    if (form) {
        form.reset();
    }
    
    // Resetar indicadores
    updateCotacaoStepIndicators();
    updateCotacaoProgressBar();
    
    // Mostrar primeiro passo
    showCotacaoStep(1);
    
    // Remover mensagem de sucesso
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.remove();
    }
    
    // Mostrar formulário novamente
    const hiddenForm = document.querySelector('.multi-step-form');
    if (hiddenForm) {
        hiddenForm.style.display = 'block';
    }
    
    // Mostrar barra de progresso novamente
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.style.display = 'block';
    }
    
    // Limpar classes de erro/sucesso
    const allFields = form.querySelectorAll('input, select, textarea');
    allFields.forEach(field => {
        field.classList.remove('error', 'success');
    });
    
    // Limpar mensagens de erro
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

// ===== POPUPS E CONTROLE DE SAÍDA DA PÁGINA =====

// Variáveis para controle de popups
let exitIntentDetected = false;
let userHasInteracted = false;

// Inicializar funcionalidades de popup e saída
document.addEventListener('DOMContentLoaded', function() {
    initializePopupSystem();
    setupExitIntentDetection();
    setupBeforeUnloadWarning();
});

// Sistema de popups
function initializePopupSystem() {
    // Fechar popups ao clicar fora
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('popup-overlay')) {
            closeAllPopups();
        }
    });
    
    // Fechar popups com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });
}

// Mostrar popup de sucesso
function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('hidden');
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
        
        // Marcar que o usuário interagiu
        userHasInteracted = true;
    }
}

// Fechar popup de sucesso
function closeSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 300);
    }
}

// Mostrar popup de saída
function showExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup && !exitIntentDetected) {
        exitIntentDetected = true;
        popup.classList.remove('hidden');
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
    }
}

// Fechar popup de saída
function closeExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 300);
        exitIntentDetected = false;
    }
}

// Fechar todos os popups
function closeAllPopups() {
    closeSuccessPopup();
    closeExitPopup();
}

// Usuário realmente quer sair
function reallyExit() {
    closeExitPopup();
    // Permitir saída da página
    window.removeEventListener('beforeunload', beforeUnloadHandler);
    window.location.href = 'https://google.com'; // Redirecionar para sair
}

// Detecção de intenção de saída
function setupExitIntentDetection() {
    // Detectar movimento do mouse para cima (intenção de fechar aba)
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !userHasInteracted) {
            showExitPopup();
        }
    });
    
    // Detectar clique em links externos
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.hostname !== window.location.hostname) {
            e.preventDefault();
            showExitPopup();
        }
    });
    
    // Detectar teclas de navegação
    document.addEventListener('keydown', function(e) {
        if ((e.altKey && e.key === 'F4') || (e.ctrlKey && e.key === 'w')) {
            e.preventDefault();
            showExitPopup();
        }
    });
}

// Aviso antes de sair da página
function setupBeforeUnloadWarning() {
    window.addEventListener('beforeunload', beforeUnloadHandler);
}

function beforeUnloadHandler(e) {
    if (!userHasInteracted) {
        const message = 'Espere! Não perca esta oportunidade de proteger seu veículo. Tem certeza que quer sair?';
        e.preventDefault();
        e.returnValue = message;
        return message;
    }
}

// Modificar função de envio do formulário para mostrar popup de sucesso
function handleCotacaoFormSubmit(e) {
    e.preventDefault();
    
    if (validateCotacaoStep()) {
        // Salvar dados do passo atual
        saveCotacaoStepData();
        
        // Simular envio
        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.classList.add('loading');
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
        }
        
        // Simular delay de envio
        setTimeout(() => {
            // Mostrar popup de sucesso
            showSuccessPopup();
            
            // Resetar formulário
            resetCotacaoForm();
            
            // Remover estado de carregamento
            if (submitButton) {
                submitButton.classList.remove('loading');
                submitButton.textContent = 'Solicitar Cotação Gratuita';
                submitButton.disabled = false;
            }
        }, 2000);
    }
}

// Função para marcar interação do usuário
function markUserInteraction() {
    userHasInteracted = true;
}

// Adicionar event listeners para marcar interação
document.addEventListener('click', markUserInteraction);
document.addEventListener('scroll', markUserInteraction);
document.addEventListener('input', markUserInteraction);
document.addEventListener('keydown', markUserInteraction);

// Função para scroll suave para seção de cotação
function scrollToCotacao() {
    const cotacaoSection = document.getElementById('cotacao');
    if (cotacaoSection) {
        cotacaoSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para scroll suave para seção de depoimentos
function scrollToDepoimentos() {
    const depoimentosSection = document.getElementById('depoimentos');
    if (depoimentosSection) {
        depoimentosSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== FUNCIONALIDADES DA ETAPA 4 - RESUMO =====

// Atualizar resumo dos dados na etapa 4
function updateResumo() {
    // Dados pessoais
    const resumoNome = document.getElementById('resumoNome');
    const resumoEmail = document.getElementById('resumoEmail');
    const resumoTelefone = document.getElementById('resumoTelefone');
    
    if (resumoNome) resumoNome.textContent = cotacaoFormData.nome || '-';
    if (resumoEmail) resumoEmail.textContent = cotacaoFormData.email || '-';
    if (resumoTelefone) resumoTelefone.textContent = cotacaoFormData.telefone || '-';
    
    // Dados do veículo
    const resumoTipo = document.getElementById('resumoTipo');
    const resumoMarca = document.getElementById('resumoMarca');
    const resumoAno = document.getElementById('resumoAno');
    const resumoModelo = document.getElementById('resumoModelo');
    
    if (resumoTipo) resumoTipo.textContent = getTipoVeiculoText(cotacaoFormData.tipoVeiculo) || '-';
    if (resumoMarca) resumoMarca.textContent = cotacaoFormData.marca || '-';
    if (resumoAno) resumoAno.textContent = cotacaoFormData.ano || '-';
    if (resumoModelo) resumoModelo.textContent = cotacaoFormData.modelo || '-';
    
    // Preferências
    const resumoContato = document.getElementById('resumoContato');
    const resumoHorario = document.getElementById('resumoHorario');
    
    if (resumoContato) resumoContato.textContent = getPreferenciaContatoText(cotacaoFormData.preferenciaContato) || '-';
    if (resumoHorario) resumoHorario.textContent = getMelhorHorarioText(cotacaoFormData.melhorHorario) || '-';
    
    // Mensagem adicional
    const mensagemContainer = document.getElementById('resumoMensagemContainer');
    const mensagemText = document.getElementById('resumoMensagem');
    if (mensagemContainer && mensagemText) {
        if (cotacaoFormData.mensagem && cotacaoFormData.mensagem.trim()) {
            mensagemContainer.classList.remove('hidden');
            mensagemText.textContent = cotacaoFormData.mensagem;
        } else {
            mensagemContainer.classList.add('hidden');
        }
    }
}

// Funções auxiliares para converter valores em texto legível
function getTipoVeiculoText(tipo) {
    const tipos = {
        'carro': 'Carro',
        'moto': 'Moto',
        'caminhao': 'Caminhão',
        'van': 'Van/Utilitário',
        'outros': 'Outros'
    };
    return tipos[tipo] || tipo;
}

function getPreferenciaContatoText(preferencia) {
    const preferencias = {
        'whatsapp': 'WhatsApp',
        'telefone': 'Telefone',
        'email': 'E-mail',
        'visita': 'Visita Presencial'
    };
    return preferencias[preferencia] || preferencia;
}

function getMelhorHorarioText(horario) {
    const horarios = {
        'manha': 'Manhã (8h-12h)',
        'tarde': 'Tarde (13h-17h)',
        'noite': 'Noite (18h-21h)',
        'flexivel': 'Horário Flexível'
    };
    return horarios[horario] || horario;
}

// Modificar a função saveCotacaoCurrentStepData para incluir resumo
function saveCotacaoCurrentStepData() {
    const currentStepElement = document.querySelector(`[data-step="${cotacaoCurrentStep}"]`);
    if (!currentStepElement) return;
    
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.name && input.value) {
            cotacaoFormData[input.name] = input.value;
        }
    });
    
    // Se estiver na etapa 4, atualizar o resumo
    if (cotacaoCurrentStep === 4) {
        updateResumo();
    }
}

// Funções removidas - usando as novas funções específicas abaixo

// Função para ir para um passo específico
function goToCotacaoStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= cotacaoTotalSteps) {
        cotacaoCurrentStep = stepNumber;
        showCotacaoStep(cotacaoCurrentStep);
        updateCotacaoProgressBar();
        updateCotacaoStepIndicators();
        
        // Se for a etapa 4, atualizar o resumo
        if (cotacaoCurrentStep === 4) {
            setTimeout(updateResumo, 100);
        }
    }
}

// ===== FUNCIONALIDADES DA SEÇÃO DE COTAÇÃO MODERNA =====

// Variáveis para o novo formulário de cotação
window.novoCotacaoCurrentStep = 1;
window.novoCotacaoTotalSteps = 4;
window.novoCotacaoFormData = {};

// Inicializar funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setupCotacaoModerna();
    initializeNovoCotacaoForm();
});

// Inicializar o novo formulário de cotação
function initializeNovoCotacaoForm() {
    console.log('Inicializando novo formulário de cotação');
    
    // Mostrar primeira etapa
    showNovoCotacaoStep(1);
    
    // Atualizar indicadores
    updateNovoCotacaoProgressBar();
    updateNovoCotacaoStepIndicators();
    
    // Configurar event listeners para os botões
    setupNovoCotacaoEventListeners();
}

// Configurar event listeners específicos para o novo formulário
function setupNovoCotacaoEventListeners() {
    // Event listener para o formulário de envio
    const form = document.getElementById('cotacaoForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulário enviado na etapa:', window.novoCotacaoCurrentStep);
            
            if (window.novoCotacaoCurrentStep === 4) {
                // Processar envio final
                handleFinalSubmit();
            }
        });
    }
}

// Processar envio final do formulário
function handleFinalSubmit() {
    const button = document.querySelector('.btn-modern-success');
    const originalText = button.innerHTML;
    
    // Animação de loading
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
    button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check mr-2"></i>✓ Cotação Enviada com Sucesso!';
        
        setTimeout(() => {
            alert('Obrigado! Nossa equipe entrará em contato em até 2 horas úteis.');
            
            // Resetar formulário
            document.getElementById('cotacaoForm').reset();
            window.novoCotacaoCurrentStep = 1;
            window.novoCotacaoFormData = {};
            
            // Voltar para primeira etapa
            showNovoCotacaoStep(1);
            updateNovoCotacaoProgressBar();
            updateNovoCotacaoStepIndicators();
            
            // Restaurar botão
            button.innerHTML = originalText;
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            button.disabled = false;
        }, 2000);
    }, 1500);
}

function setupCotacaoModerna() {
    // Configurar máscara de telefone
    const telefoneField = document.getElementById('telefone');
    if (telefoneField) {
        telefoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                if (value.length < 14) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                }
            }
            e.target.value = value;
        });
    }
    
    // Configurar validação em tempo real
    const inputs = document.querySelectorAll('.form-input-modern, .form-select-modern, .form-textarea-modern');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                this.style.borderColor = '#e1e5e9';
                this.style.boxShadow = 'none';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)' && this.value.trim()) {
                this.style.borderColor = '#e1e5e9';
                this.style.boxShadow = 'none';
            }
        });
        
        // Animação nos inputs
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Configurar envio do formulário
    const formModerno = document.getElementById('cotacaoForm');
    if (formModerno) {
        formModerno.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = document.querySelector('.btn-modern-success');
            const originalText = button.innerHTML;
            
            // Validar campos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            
            let isValid = true;
            
            if (!nome) {
                document.getElementById('nome').style.borderColor = '#ef4444';
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                document.getElementById('email').style.borderColor = '#ef4444';
                isValid = false;
            }
            
            if (!telefone || telefone.replace(/\D/g, '').length < 10) {
                document.getElementById('telefone').style.borderColor = '#ef4444';
                isValid = false;
            }
            
            if (!isValid) {
                button.style.background = '#ef4444';
                button.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Preencha todos os campos corretamente';
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                }, 3000);
                return;
            }
            
            // Animação de loading
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processando...';
            button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check mr-2"></i>✓ Dados Enviados com Sucesso!';
                setTimeout(() => {
                    // Aqui você pode redirecionar ou mostrar próxima etapa
                    alert('Obrigado! Nossa equipe entrará em contato em até 2 horas úteis.');
                    formModerno.reset();
                    button.innerHTML = originalText;
                    button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    button.disabled = false;
                    
                    // Voltar para a primeira etapa
                    cotacaoCurrentStep = 1;
                    showCotacaoStep(1);
                    updateCotacaoProgressBar();
                    updateCotacaoStepIndicators();
                }, 2000);
            }, 1500);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== FUNÇÕES ESPECÍFICAS PARA O NOVO FORMULÁRIO DE COTAÇÃO =====

// Mostrar etapa específica do novo formulário
function showNovoCotacaoStep(stepNumber) {
    console.log('showNovoCotacaoStep chamada para etapa:', stepNumber);
    const allSteps = document.querySelectorAll('#cotacaoForm .form-step');
    console.log('Total de etapas encontradas:', allSteps.length);
    
    allSteps.forEach(step => {
        step.classList.remove('active');
        step.style.display = 'none';
    });
    
    const targetStep = document.querySelector(`#cotacaoForm [data-step="${stepNumber}"]`);
    console.log('Etapa alvo encontrada:', targetStep);
    
    if (targetStep) {
        targetStep.classList.add('active');
        targetStep.style.display = 'block';
    }
}

// Navegar para próxima etapa
window.nextCotacaoStep = function() {
    console.log('nextCotacaoStep chamada, etapa atual:', window.novoCotacaoCurrentStep);
    
    if (validateNovoCotacaoStep()) {
        saveNovoCotacaoStepData();
        
        if (window.novoCotacaoCurrentStep < window.novoCotacaoTotalSteps) {
            window.novoCotacaoCurrentStep++;
            console.log('Navegando para etapa:', window.novoCotacaoCurrentStep);
            showNovoCotacaoStep(window.novoCotacaoCurrentStep);
            updateNovoCotacaoProgressBar();
            updateNovoCotacaoStepIndicators();
            
            // Se for a etapa 4, atualizar o resumo
            if (window.novoCotacaoCurrentStep === 4) {
                setTimeout(updateNovoResumo, 100);
            }
        }
    } else {
        console.log('Validação falhou na etapa:', window.novoCotacaoCurrentStep);
    }
};

// Navegar para etapa anterior
window.prevCotacaoStep = function() {
    if (window.novoCotacaoCurrentStep > 1) {
        window.novoCotacaoCurrentStep--;
        console.log('Voltando para etapa:', window.novoCotacaoCurrentStep);
        showNovoCotacaoStep(window.novoCotacaoCurrentStep);
        updateNovoCotacaoProgressBar();
        updateNovoCotacaoStepIndicators();
    }
};

// Validar etapa atual
function validateNovoCotacaoStep() {
    console.log('Validando etapa:', window.novoCotacaoCurrentStep);
    const currentStepElement = document.querySelector(`#cotacaoForm [data-step="${window.novoCotacaoCurrentStep}"]`);
    console.log('Elemento da etapa encontrado:', currentStepElement);
    
    if (!currentStepElement) {
        console.log('Elemento da etapa não encontrado!');
        return false;
    }
    
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    console.log('Campos obrigatórios encontrados:', requiredFields.length);
    let isValid = true;
    
    requiredFields.forEach(field => {
        console.log('Validando campo:', field.name, 'valor:', field.value);
        if (!field.value.trim()) {
            console.log('Campo vazio:', field.name);
            field.style.borderColor = '#ef4444';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            isValid = false;
        } else {
            field.style.borderColor = '#e1e5e9';
            field.style.boxShadow = 'none';
        }
    });
    
    console.log('Validação resultado:', isValid);
    return isValid;
}

// Salvar dados da etapa atual
function saveNovoCotacaoStepData() {
    const currentStepElement = document.querySelector(`#cotacaoForm [data-step="${window.novoCotacaoCurrentStep}"]`);
    if (!currentStepElement) return;
    
    const formFields = currentStepElement.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        if (field.name && field.value) {
            window.novoCotacaoFormData[field.name] = field.value;
        }
    });
    
    console.log('Dados salvos:', window.novoCotacaoFormData);
}

// Atualizar barra de progresso
function updateNovoCotacaoProgressBar() {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const progress = (window.novoCotacaoCurrentStep / window.novoCotacaoTotalSteps) * 100;
        progressFill.style.width = progress + '%';
        console.log('Progresso atualizado:', progress + '%');
    }
    
    const currentStepElement = document.getElementById('currentStep');
    if (currentStepElement) {
        currentStepElement.textContent = window.novoCotacaoCurrentStep;
    }
    
    // Atualizar indicador principal
    updateMainStepIndicator();
}

// Atualizar indicador principal de etapa
function updateMainStepIndicator() {
    const stepTitles = ['Dados Pessoais', 'Dados do Veículo', 'Preferências', 'Confirmação'];
    const stepDescriptions = [
        'Informações básicas para contato',
        'Informações sobre seu veículo',
        'Últimos detalhes para sua cotação',
        'Revise seus dados antes de enviar'
    ];
    
    const stepNumber = document.getElementById('currentStepNumber');
    const stepTitle = document.getElementById('currentStepTitle');
    const stepDescription = document.getElementById('currentStepDescription');
    
    if (stepNumber) stepNumber.textContent = window.novoCotacaoCurrentStep;
    if (stepTitle) stepTitle.textContent = stepTitles[window.novoCotacaoCurrentStep - 1];
    if (stepDescription) stepDescription.textContent = stepDescriptions[window.novoCotacaoCurrentStep - 1];
}

// Atualizar indicadores de etapa
function updateNovoCotacaoStepIndicators() {
    const stepIndicators = document.querySelectorAll('.step-indicator-modern');
    
    stepIndicators.forEach((indicator, index) => {
        const stepNumber = index + 1;
        const stepCircle = indicator.querySelector('.w-8');
        const stepLabel = indicator.querySelector('span');
        
        if (stepNumber < window.novoCotacaoCurrentStep) {
            // Etapa completada
            stepCircle.classList.remove('bg-gray-300', 'text-gray-600');
            stepCircle.classList.add('bg-green-500', 'text-white');
            stepLabel.classList.remove('text-muted');
            stepLabel.classList.add('text-green-600');
        } else if (stepNumber === window.novoCotacaoCurrentStep) {
            // Etapa atual
            stepCircle.classList.remove('bg-gray-300', 'text-gray-600', 'bg-green-500');
            stepCircle.classList.add('bg-orange', 'text-white');
            stepLabel.classList.remove('text-muted', 'text-green-600');
            stepLabel.classList.add('text-primary');
        } else {
            // Etapa futura
            stepCircle.classList.remove('bg-orange', 'text-white', 'bg-green-500');
            stepCircle.classList.add('bg-gray-300', 'text-gray-600');
            stepLabel.classList.remove('text-primary', 'text-green-600');
            stepLabel.classList.add('text-muted');
        }
    });
}

// Atualizar resumo na etapa 4
function updateNovoResumo() {
    // Dados pessoais
    const resumoNome = document.getElementById('resumoNome');
    const resumoEmail = document.getElementById('resumoEmail');
    const resumoTelefone = document.getElementById('resumoTelefone');
    
    if (resumoNome) resumoNome.textContent = window.novoCotacaoFormData.nome || '-';
    if (resumoEmail) resumoEmail.textContent = window.novoCotacaoFormData.email || '-';
    if (resumoTelefone) resumoTelefone.textContent = window.novoCotacaoFormData.telefone || '-';
    
    // Dados do veículo
    const resumoTipo = document.getElementById('resumoTipo');
    const resumoMarca = document.getElementById('resumoMarca');
    const resumoAno = document.getElementById('resumoAno');
    const resumoModelo = document.getElementById('resumoModelo');
    
    if (resumoTipo) resumoTipo.textContent = getTipoVeiculoText(window.novoCotacaoFormData.tipoVeiculo) || '-';
    if (resumoMarca) resumoMarca.textContent = window.novoCotacaoFormData.marca || '-';
    if (resumoAno) resumoAno.textContent = window.novoCotacaoFormData.ano || '-';
    if (resumoModelo) resumoModelo.textContent = window.novoCotacaoFormData.modelo || '-';
    
    // Preferências
    const resumoContato = document.getElementById('resumoContato');
    const resumoHorario = document.getElementById('resumoHorario');
    
    if (resumoContato) resumoContato.textContent = getPreferenciaContatoText(window.novoCotacaoFormData.preferenciaContato) || '-';
    if (resumoHorario) resumoHorario.textContent = getMelhorHorarioText(window.novoCotacaoFormData.melhorHorario) || '-';
    
    // Mensagem adicional
    const mensagemContainer = document.getElementById('resumoMensagemContainer');
    const mensagemText = document.getElementById('resumoMensagem');
    if (mensagemContainer && mensagemText) {
        if (window.novoCotacaoFormData.mensagem && window.novoCotacaoFormData.mensagem.trim()) {
            mensagemContainer.classList.remove('hidden');
            mensagemText.textContent = window.novoCotacaoFormData.mensagem;
        } else {
            mensagemContainer.classList.add('hidden');
        }
    }
}
