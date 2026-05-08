# Prompt para GitHub Copilot — Projeto CabanaPay

## Objetivo

Crie um MVP completo chamado "CabanaPay", uma plataforma de inclusão financeira baseada na blockchain Solana.

O sistema deve permitir pagamentos rápidos, baratos e transparentes entre usuários da comunidade, utilizando integração com carteira Phantom.

---

# Tecnologias Obrigatórias

- Frontend: React + Next.js + TailwindCSS
- Backend: Node.js
- Blockchain: Solana Web3.js
- Carteira: Phantom Wallet
- Banco de dados opcional: Firebase ou Supabase
- Deploy preparado para Vercel

---

# Estrutura do Projeto

Organize o projeto nas seguintes pastas:

/src
/components
/pages
/services
/hooks
/styles
/contracts
/utils

---

# Etapa 1 — Criar Interface Inicial

Crie uma tela inicial moderna contendo:

- Logo CabanaPay
- Saldo do usuário
- Botões:
  - Pagar
  - Receber
  - Doar
- Histórico de transações
- Layout responsivo
- Tema moderno usando Tailwind

---

# Etapa 2 — Integração com Phantom Wallet

Implemente:

- Conexão com Phantom Wallet
- Verificação se a carteira está instalada
- Exibição do endereço conectado
- Botão de conectar/desconectar

Utilize Solana Devnet.

---

# Etapa 3 — Sistema de Pagamento

Crie fluxo de pagamento:

1. Usuário informa valor
2. Usuário informa carteira destino
3. Sistema valida saldo
4. Transação é enviada
5. Exibir confirmação

Adicionar:
- Loading
- Tratamento de erros
- Toasts de sucesso

---

# Etapa 4 — QR Code

Adicionar geração e leitura de QR Code:

- Gerar QR para recebimento
- Ler QR para pagamento
- Interface simples

---

# Etapa 5 — Histórico de Transações

Criar tela com:

- Lista de transações
- Valor
- Data
- Tipo:
  - pagamento
  - recebimento
  - doação

Adicionar filtros simples.

---

# Etapa 6 — Sistema de Doações

Criar área específica para doações:

- Botão doar
- Carteiras comunitárias
- Transparência das transações
- Exibir hash da blockchain

---

# Etapa 7 — Segurança

Implementar:

- Validação de inputs
- Tratamento de erros
- Proteção contra valores inválidos
- Mensagens amigáveis

---

# Etapa 8 — UX/UI

O design deve ser:

- Minimalista
- Moderno
- Acessível
- Fácil para usuários iniciantes

Utilizar:
- Cards
- Sombras suaves
- Ícones modernos
- Responsividade mobile-first

---

# Etapa 9 — README

Gerar automaticamente README.md contendo:

- Explicação do projeto
- Tecnologias usadas
- Como rodar localmente
- Como conectar Phantom
- Estrutura do sistema

---

# Etapa 10 — Extras

Se possível adicionar:

- Dark mode
- Internacionalização
- Dashboard administrativo
- Estatísticas comunitárias
- Sistema de autenticação simples

---

# Contexto do Projeto

O CabanaPay busca resolver:

- Falta de acesso financeiro
- Baixa confiança em pagamentos informais
- Necessidade de transparência comunitária

O foco é inclusão financeira local utilizando blockchain Solana.

---

# Resultado Esperado

Gerar:

- Código limpo
- Componentização correta
- Comentários importantes
- Arquitetura escalável
- MVP funcional
- Interface bonita e intuitiva
