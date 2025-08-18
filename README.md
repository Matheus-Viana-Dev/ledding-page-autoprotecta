# 🚗 AutoProtecta - Landing Page de Alta Conversão

Uma landing page moderna e otimizada para conversão, desenvolvida com Next.js 15, Tailwind CSS e Framer Motion, seguindo todas as diretrizes de marca da AutoProtecta.

## ✨ Características Principais

### 🎯 **Foco em Conversão**
- **Formulário acima da dobra**: Posicionado estrategicamente para capturar leads imediatamente
- **Formulário multi-step**: Reduz atrito inicial e aumenta taxa de conversão
- **CTAs estratégicos**: Botões de ação em pontos-chave da jornada do usuário

### 🎨 **Identidade Visual da Marca**
- **Cores oficiais**: Smoky Black (#0C0C0C), Orioles Orange (#FB4516), Platinum (#E2E2E2)
- **Tipografia Satoshi**: Fonte oficial para títulos e corpo de texto
- **Grafismos da marca**: Elementos visuais derivados do símbolo do rinoceronte

### 📱 **Design Responsivo**
- **Mobile-first**: Otimizado para dispositivos móveis
- **Breakpoints**: Adaptação perfeita para todos os tamanhos de tela
- **Navegação mobile**: Menu hambúrguer com animações suaves

## 🏗️ Estrutura da Landing Page

### 1. **Header (Navegação)**
- Logo AutoProtecta com ícone de escudo
- Menu de navegação responsivo
- Botões de ação (Contato e Cotação)
- Transparência dinâmica baseada no scroll

### 2. **Hero Section (Seção Principal)**
- **Título impactante**: "Proteção veicular completa, sem burocracia e 100% online"
- **Subtítulo persuasivo**: "Faça sua cotação em menos de 2 minutos"
- **Formulário acima da dobra**: Captura leads sem necessidade de scroll
- **Visual de fundo**: Gradiente com padrões da marca

### 3. **Benefícios e Diferenciais**
- **8 benefícios principais** com ícones e descrições
- **Grid responsivo** adaptável a diferentes telas
- **Cores da marca** aplicadas estrategicamente
- **CTA intermediário** para manter engajamento

### 4. **Como Funciona**
- **4 passos simples** do processo de contratação
- **Conexão visual** entre os passos
- **Grafismos da marca** para coesão visual
- **CTA de seção** para conversão

### 5. **Prova Social (Depoimentos)**
- **6 depoimentos reais** de clientes satisfeitos
- **Cards com fundo Platinum** para destaque
- **Estatísticas impressionantes** (50K+ clientes, 98% satisfação)
- **CTA de seção** para conversão

### 6. **CTA Final**
- **Título convincente**: "Não espere o inesperado acontecer"
- **Botão principal grande** com Orioles Orange
- **Informações de contato** para múltiplos canais
- **Garantias visuais** (100% seguro, 2 min, 24h)

### 7. **Footer**
- **Informações da empresa** com logo e descrição
- **Links organizados** por categoria
- **Redes sociais** com ícones interativos
- **Contatos e horários** de atendimento

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática para código robusto
- **Tailwind CSS**: Framework CSS utilitário
- **Framer Motion**: Animações e transições suaves

### **Formulários e Validação**
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de dados com TypeScript
- **React Input Mask**: Máscaras para campos específicos

### **Ícones e UI**
- **Lucide React**: Ícones modernos e leves
- **Swiper.js**: Carrossel para depoimentos
- **CSS Custom Properties**: Variáveis para cores da marca

### **Performance e SEO**
- **Next.js Image**: Otimização automática de imagens
- **Metadata API**: SEO otimizado
- **Lazy Loading**: Carregamento sob demanda
- **Intersection Observer**: Animações baseadas em scroll

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clonar o repositório
git clone [url-do-repositorio]

# Entrar no diretório
cd autoprotecta-landing

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

### **Variáveis de Ambiente**
```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://autoprotecta.com.br
NEXT_PUBLIC_CONTACT_PHONE=0800 123 4567
NEXT_PUBLIC_CONTACT_EMAIL=contato@autoprotecta.com.br
```

## 🎨 Sistema de Design

### **Paleta de Cores**
```css
/* Cores principais */
--smoky-black: #0C0C0C        /* Pantone Black 6 C */
--orioles-orange: #FB4516      /* Pantone 172 C */
--platinum: #E2E2E2            /* Pantone 663 C */

/* Variações */
--smoky-black-light: #1A1A1A
--orioles-orange-dark: #E63E14
--orioles-orange-light: #FF6B35
```

### **Tipografia**
- **Satoshi Black**: Títulos principais (font-weight: 900)
- **Satoshi Bold**: Subtítulos e destaques (font-weight: 700)
- **Satoshi Regular**: Corpo de texto (font-weight: 400)

### **Espaçamentos**
- **Seções**: `py-16 md:py-24` (64px/96px)
- **Cards**: `p-6` (24px)
- **Botões**: `px-8 py-4` (32px/16px)
- **Grids**: `gap-6` (24px)

## 📱 Responsividade

### **Breakpoints**
```css
/* Mobile First */
sm: 640px   /* Tablets pequenos */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops pequenos */
xl: 1280px  /* Desktops */
2xl: 1536px /* Desktops grandes */
```

### **Adaptações Mobile**
- **Menu hambúrguer** com animações
- **Grid responsivo** que se adapta ao conteúdo
- **Botões otimizados** para touch
- **Formulário mobile-friendly**

## ⚡ Performance

### **Otimizações Implementadas**
- **Lazy Loading** de componentes
- **Code Splitting** automático do Next.js
- **Otimização de imagens** com Next/Image
- **Animações CSS** para melhor performance
- **Bundle Analysis** para identificar gargalos

### **Métricas Alvo**
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Core Web Vitals**: Verde

## 🔧 Funcionalidades Técnicas

### **Formulário Multi-Step**
```typescript
// Estrutura dos passos
const steps = [
  {
    id: 1,
    title: 'Dados de Contato',
    fields: ['name', 'email', 'whatsapp']
  },
  {
    id: 2,
    title: 'Dados do Veículo',
    fields: ['vehicleType', 'brand', 'year', 'model']
  },
  {
    id: 3,
    title: 'Localização e Uso',
    fields: ['state', 'city', 'usage']
  }
];
```

### **Validação com Zod**
```typescript
const formSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);

type FormData = z.infer<typeof formSchema>;
```

### **Animações com Framer Motion**
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  {/* Conteúdo */}
</motion.div>
```

## 📊 Analytics e Conversão

### **Eventos Rastreados**
- **Formulário iniciado** (Step 1)
- **Formulário completado** (Step 3)
- **CTAs clicados** por seção
- **Tempo na página** por seção
- **Scroll depth** para otimização

### **KPIs de Conversão**
- **Taxa de conversão** do formulário
- **Abandono por step** do formulário
- **CTR dos botões** de ação
- **Engajamento** por seção

## 🚀 Deploy

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Netlify**
```bash
# Build
npm run build

# Deploy
netlify deploy --prod --dir=out
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Segurança

### **Medidas Implementadas**
- **Validação client-side** com Zod
- **Sanitização** de inputs
- **HTTPS** obrigatório
- **Headers de segurança** configurados
- **Rate limiting** para formulários

## 📈 Próximos Passos

### **Otimizações de Conversão**
- [ ] **A/B Testing** de diferentes CTAs
- [ ] **Heatmaps** para análise de comportamento
- [ ] **Personalização** baseada em dados
- [ ] **Chatbot** para suporte em tempo real

### **Funcionalidades Adicionais**
- [ ] **Calculadora de preços** interativa
- [ ] **Comparador de planos** visual
- [ ] **Integração com CRM** para leads
- [ ] **Página de agradecimento** personalizada

### **Performance e SEO**
- [ ] **PWA** para experiência mobile
- [ ] **AMP** para páginas de alta velocidade
- [ ] **Schema.org** markup para rich snippets
- [ ] **Sitemap** e robots.txt otimizados

## 🤝 Contribuição

### **Padrões de Código**
- **ESLint** configurado
- **Prettier** para formatação
- **TypeScript** strict mode
- **Conventional Commits** para mensagens

### **Processo de Desenvolvimento**
1. **Fork** do repositório
2. **Branch** para feature (`feature/nome-da-feature`)
3. **Commit** com mensagem descritiva
4. **Push** para o branch
5. **Pull Request** com descrição detalhada

## 📞 Suporte

### **Contato da Equipe**
- **Email**: dev@autoprotecta.com.br
- **Slack**: #dev-landing-page
- **Documentação**: [Wiki do projeto]

### **Issues e Bugs**
- **GitHub Issues** para reportar problemas
- **Templates** padronizados para issues
- **Labels** para categorização
- **Milestones** para planejamento

---

**Desenvolvido com ❤️ pela equipe AutoProtecta**

*Última atualização: Agosto 2025*
