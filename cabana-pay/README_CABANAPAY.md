# CabanaPay - Inclusão Financeira com Solana

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)](https://tailwindcss.com/)
[![Solana](https://img.shields.io/badge/Solana-Web3-9945FF)](https://solana.com/)

## 🎯 Objetivo

CabanaPay é uma plataforma MVP de inclusão financeira construída sobre a blockchain Solana. O sistema permite **pagamentos rápidos, baratos e transparentes** entre usuários da comunidade, utilizando integração com a carteira Phantom e a rede Devnet do Solana.

## ✨ Funcionalidades

### Etapa 1: Interface Inicial
- ✅ Logo e identidade visual CabanaPay
- ✅ Exibição do saldo do usuário em SOL
- ✅ Layout responsivo e moderno
- ✅ Tema dark/light ready
- ✅ Design minimalista com TailwindCSS

### Etapa 2: Integração com Phantom Wallet
- ✅ Conexão com carteira Phantom
- ✅ Verificação de instalação da carteira
- ✅ Exibição do endereço conectado (truncado)
- ✅ Botões de conectar/desconectar
- ✅ Suporte para Solana Devnet

### Etapa 3: Sistema de Pagamento
- ✅ Formulário de pagamento completo
- ✅ Validação de valores
- ✅ Validação de endereços Solana
- ✅ Estados de loading
- ✅ Mensagens de sucesso/erro
- ✅ Toasts informativos

### Etapa 4: QR Code
- ✅ Geração de QR Code para recebimentos
- ✅ Interface QR integrada nos cartões de doação
- ✅ Suporte para leitura futura de QR

### Etapa 5: Histórico de Transações
- ✅ Lista de transações com filtros
- ✅ Tipos: pagamento, recebimento, doação
- ✅ Status: confirmado, pendente, falhou
- ✅ Data e hora formatadas em pt-BR
- ✅ Persistência em localStorage

### Etapa 6: Sistema de Doações
- ✅ Seção de doações comunitárias
- ✅ Carteiras comunitárias mockadas
- ✅ Exibição de transparência (total recebido)
- ✅ Botões de doação com valores predefinidos
- ✅ Integração com histórico

### Etapa 7: Segurança
- ✅ Validação robusta de inputs
- ✅ Proteção contra valores inválidos
- ✅ Tratamento com try-catch
- ✅ Mensagens amigáveis ao usuário
- ✅ Sanitização de endereços

### Etapa 8: UX/UI
- ✅ Design minimalista e moderno
- ✅ Acessibilidade melhorada
- ✅ Cards com sombras suaves
- ✅ Ícones modernos (lucide-react)
- ✅ Mobile-first responsividade
- ✅ Transições suaves

### Etapa 9: README Documentado
- ✅ Documentação completa do projeto
- ✅ Instruções de instalação
- ✅ Guia de uso
- ✅ Estrutura explicada

### Etapa 10: Extras
- 🔧 Dark mode (pronto para implementação)
- 🔧 Dashboard administrativo (pronto para implementação)
- 🔧 Estatísticas comunitárias (pronto para implementação)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca de UI
- **TailwindCSS 3** - Estilização utilitária
- **TypeScript** - Type safety

### Blockchain & Carteira
- **Solana Web3.js** - Integração com blockchain Solana
- **Phantom Wallet Adapter** - Conexão com carteira
- **Devnet** - Rede de testes Solana

### Utilitários & UX
- **react-hot-toast** - Notificações elegantes
- **qrcode.react** - Geração de QR Codes
- **lucide-react** - Ícones modernos

### Desenvolvimento
- **ESLint** - Validação de código
- **TypeScript** - Tipagem estática

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Phantom Wallet instalada (para testar)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/santosmab/Cabana-Conecta-IA.git
cd Cabana-Conecta-IA/cabana-pay
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Abra no navegador**
```
http://localhost:3000
```

## 🚀 Como Usar

### 1. Conectar Carteira
- Clique em "Conectar Carteira" no topo
- Aprove a conexão no Phantom
- Seu saldo será carregado automaticamente

### 2. Fazer Pagamento
- Preencha o formulário de pagamento
- Insira o valor em SOL
- Cole o endereço do destinatário
- Clique em "Enviar Pagamento"
- Confirme na carteira Phantom

### 3. Fazer Doações
- Na seção direita "Apoie a Comunidade"
- Escolha uma instituição
- Selecione um valor ou insira customizado
- Confirme a doação

### 4. Ver Histórico
- Todas as transações aparecem em "Histórico de Transações"
- Veja tipo, valor, data e status
- Dados persistem em localStorage

## 📁 Estrutura do Projeto

```
cabana-pay/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Dashboard
│   │   └── globals.css         # Estilos globais
│   ├── components/
│   │   ├── Header.tsx          # Cabeçalho com saldo
│   │   ├── WalletConnect.tsx    # Conexão de carteira
│   │   ├── PaymentForm.tsx      # Formulário de pagamento
│   │   ├── TransactionHistory.tsx # Histórico
│   │   └── DonationCard.tsx     # Cartões de doação
│   ├── services/
│   │   ├── walletService.ts    # Gerenciamento de carteira
│   │   └── transactionService.ts # Processamento de transações
│   ├── hooks/
│   │   ├── useWallet.ts        # Hook de carteira
│   │   └── useTransactions.ts  # Hook de transações
│   ├── types/
│   │   └── index.ts            # Tipos TypeScript
│   ├── utils/
│   │   └── validators.ts       # Validações e formatação
│   └── styles/
│       └── colors.ts           # Paleta de cores
├── public/                      # Ativos estáticos
├── package.json                 # Dependências
├── tsconfig.json               # Configuração TypeScript
├── tailwind.config.ts          # Configuração TailwindCSS
└── next.config.ts              # Configuração Next.js
```

## 🔑 Conectar Phantom Wallet

1. **Instale o Phantom**
   - Visite [phantom.app](https://phantom.app)
   - Instale a extensão do navegador
   - Crie uma conta ou importe existente

2. **Mude para Devnet**
   - Clique no ícone Phantom
   - Vá em "Settings" → "Network"
   - Selecione "Devnet"

3. **Obtenha SOL de Teste**
   - Copie seu endereço público
   - Visite [solana.com/devnet](https://solana.com/devnet)
   - Use o faucet para obter SOL de teste

## 🧪 Testes

### Testar Pagamento
```typescript
// Endereço de teste disponível
const testAddress = "SysvarC1qosKSrCatNjSvqkTQQPoBkSYRcNMb5iMVP";
const testAmount = 0.1; // SOL
```

### Testar Doação
- As doações mockadas não consomem SOL em desenvolvimento
- O histórico é persistido em localStorage
- Funciona sem assinatura quando em modo de teste

## 📊 Tipos TypeScript

O projeto inclui tipos completos para:
- `Transaction` - Estrutura de transações
- `WalletState` - Estado da carteira
- `PaymentRequest` - Requisição de pagamento
- `CommunityWallet` - Carteiras comunitárias
- E mais...

## 🔐 Segurança

- ✅ Validação de endereços Solana
- ✅ Proteção contra valores inválidos
- ✅ Tratamento seguro de erros
- ✅ Sem armazenamento de chaves privadas
- ✅ Integração segura com Phantom

## 🎨 Customização

### Trocar Cores
Edit em `src/styles/colors.ts`

### Adicionar Nova Instituição de Doação
Edit `COMMUNITY_WALLETS` em `src/app/page.tsx`

### Modificar Rede
Edit `DEVNET_RPC` em `src/services/walletService.ts`

## 🚀 Deploy

### Deploy no Vercel
```bash
npm run build
git push origin main
```

A integração automática do GitHub fará o deploy.

### Variáveis de Ambiente
```env
# .env.local
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
```

## 📚 Recursos Úteis

- [Documentação Solana](https://docs.solana.com)
- [Phantom Wallet Docs](https://docs.phantom.app)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🙏 Agradecimentos

- Comunidade Solana
- Phantom Wallet
- Next.js Team
- TailwindCSS

## 📞 Suporte

Para dúvidas e suporte:
- 📧 Email: [seu-email@example.com]
- 💬 Discord: [link-do-discord]
- 🐙 GitHub Issues: [Abra uma issue](https://github.com/santosmab/Cabana-Conecta-IA/issues)

---

**CabanaPay** - Inclusão financeira para todos! 🌍💰
