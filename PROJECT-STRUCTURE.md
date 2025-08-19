# 📁 Estrutura do Projeto AutoProtecta

## 🎯 Organização por Pastas

O projeto foi reorganizado seguindo as melhores práticas de estrutura de projetos web:

```
autoprotecta-leddingpage/
├── 📁 css/                    # Arquivos de estilo
│   ├── styles.css             # Estilos principais
│   └── index.css              # Estilos específicos da página inicial
├── 📁 js/                     # Arquivos JavaScript
│   └── script.js              # Funcionalidades JavaScript
├── 📁 images/                 # Imagens e logos
│   └── logo-autoprotecta-horizontal.png
├── 📁 assets/                 # Recursos adicionais
│   └── fav-icon.png           # Favicon do site
├── 📁 pages/                  # Páginas secundárias
│   ├── index-pessoal.html     # Página para pessoas físicas
│   ├── index-negocios.html    # Página para negócios
│   └── index-empresarial.html # Página para empresas
├── 📄 index.html              # Página principal
├── 📄 README.md               # Documentação do projeto
└── 📄 PROJECT-STRUCTURE.md    # Este arquivo
```

## 🔗 Caminhos Atualizados

### Página Principal (index.html)
- CSS: `css/styles.css` e `css/index.css`
- JavaScript: `js/script.js`

### Páginas Secundárias (pasta pages/)
- CSS: `../css/styles.css` e `../css/index.css`
- JavaScript: `../js/script.js`
- Imagens: `../images/logo-autoprotecta-horizontal.png`

## ✅ Benefícios da Nova Estrutura

1. **Organização Clara**: Cada tipo de arquivo tem sua pasta específica
2. **Manutenibilidade**: Fácil localização e edição de arquivos
3. **Escalabilidade**: Estrutura preparada para crescimento do projeto
4. **Padrões da Indústria**: Segue convenções estabelecidas
5. **Colaboração**: Estrutura intuitiva para novos desenvolvedores

## 🚀 Como Usar

### Desenvolvimento Local
```bash
# Navegar para o projeto
cd autoprotecta-leddingpage

# Iniciar servidor local (recomendado)
python -m http.server 8000

# Acessar no navegador
http://localhost:8000
```

### Edição de Arquivos
- **Estilos**: Editar arquivos em `css/`
- **JavaScript**: Editar arquivos em `js/`
- **Imagens**: Adicionar/editar em `images/`
- **Páginas**: Editar HTML em `pages/` ou raiz

## 📝 Notas Importantes

- Todas as referências de caminhos foram atualizadas automaticamente
- A estrutura mantém compatibilidade com servidores web
- Recomenda-se usar servidor HTTP local para desenvolvimento
- Evite abrir arquivos HTML diretamente (protocolo file://)

## 🔄 Próximos Passos

1. Testar todas as páginas com a nova estrutura
2. Verificar se todos os recursos estão carregando corretamente
3. Considerar adicionar arquivos de configuração (package.json, etc.)
4. Implementar sistema de build se necessário
