# 🎨 Guia da Nova Paleta de Cores - AutoProtecta

## 🖤 Paleta Principal: Preto, Laranja e Silver

A nova identidade visual do AutoProtecta foi redesenhada para dar maior destaque ao **preto** como cor dominante, equilibrado com **laranja** e **silver**.

### 🔥 Cores Principais

#### Preto (Dominante)
- **Preto Principal**: `#0a0a0a` (`--primary-black`)
- **Preto Claro**: `#1a1a1a` (`--primary-black-light`)

#### Laranja (Destaque)
- **Laranja Principal**: `#FB4516` (`--primary-orange`)
- **Laranja Escuro**: `#d73610` (`--primary-orange-dark`)
- **Laranja Claro**: `#ff6b3d` (`--primary-orange-light`)

#### Silver (Neutro)
- **Silver Principal**: `#c0c0c0` (`--primary-silver`)
- **Silver Claro**: `#e8e8e8` (`--primary-silver-light`)
- **Silver Escuro**: `#999999` (`--primary-silver-dark`)

### 🌈 Gradientes Especiais

```css
/* Gradiente Laranja para Preto */
background: var(--gradient-orange-black);

/* Gradiente Preto para Laranja */
background: var(--gradient-black-orange);

/* Gradiente Silver para Preto */
background: var(--gradient-silver-black);
```

## 🎯 Como Usar

### Botões

#### Botão Primário (Gradiente Laranja-Preto)
```html
<button class="btn btn-primary">Botão Principal</button>
```

#### Botão Escuro (Preto)
```html
<button class="btn btn-dark">Botão Escuro</button>
```

#### Botão Secundário (Silver)
```html
<button class="btn btn-secondary">Botão Secundário</button>
```

### Seções Especiais

#### Hero Section com Fundo Preto
```html
<section class="hero-dark">
    <h1>Título em branco sobre fundo preto</h1>
    <p>Texto em silver claro</p>
</section>
```

#### Navegação Escura
```html
<nav class="navbar-dark">
    <a href="#" class="nav-link">Link do Menu</a>
</nav>
```

#### Seção com Fundo Preto
```html
<section class="section-dark">
    <h2>Conteúdo sobre fundo preto</h2>
</section>
```

#### Seção com Fundo Silver
```html
<section class="section-silver">
    <h2>Conteúdo sobre fundo silver</h2>
</section>
```

### Cards

#### Card Padrão (com bordas silver)
```html
<div class="card">
    <div class="card-header">Cabeçalho</div>
    <div class="card-body">Conteúdo</div>
</div>
```

#### Card Escuro
```html
<div class="card card-dark">
    <div class="card-header">Cabeçalho escuro</div>
    <div class="card-body">Conteúdo em branco</div>
</div>
```

### Badges e Destaques

#### Badge Escuro
```html
<span class="badge-dark">Destaque Preto</span>
```

#### Badge Laranja
```html
<span class="badge-orange">Destaque Laranja</span>
```

#### Badge Silver
```html
<span class="badge-silver">Destaque Silver</span>
```

#### Destaque Laranja
```html
<span class="highlight-orange">Texto Destacado</span>
```

## 🛠️ Classes Utilitárias

### Cores de Texto
```html
<p class="text-black">Texto preto</p>
<p class="text-orange">Texto laranja</p>
<p class="text-silver">Texto silver</p>
<p class="text-white">Texto branco</p>
```

### Cores de Fundo
```html
<div class="bg-black">Fundo preto</div>
<div class="bg-orange">Fundo laranja</div>
<div class="bg-silver">Fundo silver claro</div>
<div class="bg-silver-dark">Fundo silver escuro</div>
```

### Gradientes
```html
<div class="bg-gradient-orange-black">Gradiente laranja-preto</div>
<div class="bg-gradient-black-orange">Gradiente preto-laranja</div>
<div class="bg-gradient-silver-black">Gradiente silver-preto</div>
```

### Bordas
```html
<div class="border-black">Borda preta</div>
<div class="border-orange">Borda laranja</div>
<div class="border-silver">Borda silver</div>
```

### Efeitos Hover
```html
<div class="hover-lift">Elemento que levanta no hover</div>
<div class="hover-glow-orange">Brilho laranja no hover</div>
<div class="hover-glow-black">Brilho preto no hover</div>
```

## 🎨 Exemplos de Combinações

### Header Escuro com Destaque Laranja
```html
<header class="navbar-dark">
    <div class="logo text-white">
        <span class="text-orange">Auto</span>Protecta
    </div>
</header>
```

### Hero Section Impactante
```html
<section class="hero-dark">
    <h1 class="text-white">
        Proteção Veicular 
        <span class="text-orange">Completa</span>
    </h1>
    <p class="text-silver">Segurança que você pode confiar</p>
    <button class="btn btn-primary">Faça sua Cotação</button>
</section>
```

### Card com Destaque
```html
<div class="card hover-lift border-orange">
    <div class="card-header bg-silver">
        <h3 class="text-black">Plano Premium</h3>
    </div>
    <div class="card-body">
        <p>Proteção completa para seu veículo</p>
        <button class="btn btn-dark">Contratar</button>
    </div>
</div>
```

## 🔧 Personalização

### Variáveis CSS Disponíveis

```css
:root {
    /* Preto */
    --primary-black: #0a0a0a;
    --primary-black-light: #1a1a1a;
    
    /* Laranja */
    --primary-orange: #FB4516;
    --primary-orange-dark: #d73610;
    --primary-orange-light: #ff6b3d;
    
    /* Silver */
    --primary-silver: #c0c0c0;
    --primary-silver-light: #e8e8e8;
    --primary-silver-dark: #999999;
    
    /* Gradientes */
    --gradient-orange-black: linear-gradient(135deg, #FB4516 0%, #1a1a1a 100%);
    --gradient-black-orange: linear-gradient(135deg, #0a0a0a 0%, #FB4516 100%);
    --gradient-silver-black: linear-gradient(135deg, #c0c0c0 0%, #1a1a1a 100%);
    
    /* Transparências */
    --orange-alpha-10: rgba(251, 69, 22, 0.1);
    --orange-alpha-20: rgba(251, 69, 22, 0.2);
    --black-alpha-10: rgba(10, 10, 10, 0.1);
    --black-alpha-80: rgba(10, 10, 10, 0.8);
    --black-alpha-90: rgba(10, 10, 10, 0.9);
    --silver-alpha-20: rgba(192, 192, 192, 0.2);
}
```

## ✨ Benefícios da Nova Paleta

1. **Sofisticação**: O preto dominante traz elegância e seriedade
2. **Impacto Visual**: O laranja cria pontos focais e calls-to-action eficazes
3. **Equilíbrio**: O silver suaviza e cria respiração visual
4. **Legibilidade**: Alto contraste garante excelente leitura
5. **Modernidade**: Combinação atual e profissional
6. **Versatilidade**: Funciona bem em diferentes contextos

## 🎯 Diretrizes de Uso

- **Use preto para**: Fundos principais, textos importantes, navegação
- **Use laranja para**: Botões primários, destaques, calls-to-action
- **Use silver para**: Elementos neutros, bordas, backgrounds secundários
- **Combine gradientes**: Para criar depth e modernidade
- **Mantenha contraste**: Sempre garanta legibilidade
