🚀 DIA 4 — CONSTRUÇÃO
📍 CabanaPay – Inclusão Financeira Local com Solana
👩‍💻 Autoras


Maria Eduarda


Izabelly Luize


Isabelle Christinne



🎯 OBJETIVO DO DIA 4
O quarto dia do projeto tem como foco iniciar oficialmente o desenvolvimento do MVP do CabanaPay.
Nesta etapa, será criada a base técnica da aplicação, organizada toda a arquitetura do sistema, definido o repositório do projeto e iniciadas as primeiras integrações com a blockchain Solana.
O principal objetivo do Dia 4 é sair do planejamento e começar efetivamente a construção da plataforma.

🧠 ETAPA 1 — DEFINIR A ARQUITETURA DO SISTEMA
⚙️ Arquitetura Definida
O CabanaPay utilizará uma arquitetura moderna, escalável e organizada, separando claramente:


Front-end;


Componentes;


Serviços blockchain;


APIs;


Banco de dados;


Utilitários;


Hooks;


Contextos globais.



🏗️ Estrutura Arquitetural
/src ├── app ├── components ├── hooks ├── services ├── contexts ├── features ├── lib ├── utils ├── styles ├── store └── types

📌 Objetivos da Arquitetura
A arquitetura deve permitir:
✅ Escalabilidade
✅ Organização do código
✅ Facilidade de manutenção
✅ Componentização
✅ Reutilização de lógica
✅ Integração blockchain segura
✅ Melhor experiência de desenvolvimento

⚙️ ETAPA 2 — ESCOLHER AS TECNOLOGIAS
🎨 Front-end
Tecnologias escolhidas


Next.js 14


React


TypeScript


TailwindCSS


Framer Motion


Shadcn/UI



🔗 Blockchain
Tecnologias blockchain


Solana Web3.js


Phantom Wallet Adapter


Solana Wallet Adapter React UI



🗄️ Banco de Dados
Opções definidas


PostgreSQL
OU


Supabase



☁️ Deploy
Plataforma de deploy


Vercel



🧠 Justificativa Técnica
As tecnologias escolhidas oferecem:


Alta performance;


Segurança;


Escalabilidade;


Desenvolvimento rápido;


Facilidade de integração;


Boa experiência do usuário;


Compatibilidade com Web3.



📂 ETAPA 3 — ORGANIZAR O REPOSITÓRIO
🧱 Estrutura Inicial do Projeto
cabanapay/│├── src/├── public/├── package.json├── tailwind.config.ts├── tsconfig.json├── README.md└── .env.local

📦 Organização de Branches
🌿 Branch principal
main

🌿 Branch de desenvolvimento
develop

🌿 Branches de funcionalidades
feature/dashboardfeature/paymentsfeature/donationsfeature/wallet

📝 Padronização de Commits
Modelo
feat:fix:style:refactor:docs:test:

Exemplos
feat: create payment screenfix: wallet connection bugdocs: update README

👥 ETAPA 4 — DIVIDIR AS TAREFAS
👩‍💻 Desenvolvimento Front-end
Responsável por:


Interfaces;


Responsividade;


Componentes;


Navegação;


UX/UI.



🔗 Integração Blockchain
Responsável por:


Phantom Wallet;


Transações;


Solana;


Verificação de saldo;


Assinatura de transações.



🗄️ Banco de Dados
Responsável por:


Modelagem;


Tabelas;


APIs;


Histórico financeiro;


Persistência de dados.



🧪 Testes
Responsável por:


Testes iniciais;


Correção de bugs;


Validação de fluxos;


Responsividade.



🚀 ETAPA 5 — COMEÇAR O DESENVOLVIMENTO
📱 Desenvolvimento Inicial das Telas
🏠 Landing Page
Criar:


Hero section;


Explicação do projeto;


Benefícios;


Botão conectar carteira.



📊 Dashboard
Criar:


Cards financeiros;


Saldo;


Histórico;


Navegação rápida.



💳 Tela de Pagamento
Criar:


Input de valor;


QR Code;


Confirmação;


Status da transação.



🎁 Tela de Doações
Criar:


Lista de campanhas;


Barra de progresso;


Botão doar.



👤 Perfil
Criar:


Carteira conectada;


Histórico;


Configurações.



🔗 ETAPA 6 — FAZER INTEGRAÇÕES E TESTES INICIAIS
🔌 Integrações Iniciais
Implementar:


Conexão Phantom Wallet;


Solana Devnet;


APIs básicas;


Banco de dados;


Navegação entre páginas.



🧪 Testes Iniciais
Validar:


Conexão da carteira;


Fluxo de pagamento;


Responsividade;


Interface;


Navegação;


Erros básicos.



📦 ENTREGÁVEIS DO DIA 4 — CONSTRUÇÃO
✅ 1. Arquitetura Definida
O que entregar:
Documento explicando a estrutura do sistema.
Deve conter:


Organização das pastas;


Estrutura técnica;


Fluxo da aplicação.


Resultado esperado:
Base sólida para desenvolvimento.

✅ 2. Repositório Organizado
O que entregar:
Repositório GitHub estruturado.
Deve conter:


Estrutura inicial;


Branches;


README;


Configurações do projeto.


Resultado esperado:
Ambiente preparado para desenvolvimento colaborativo.

✅ 3. Tecnologias Configuradas
O que entregar:
Projeto configurado com as tecnologias escolhidas.
Deve conter:


Next.js;


TailwindCSS;


Solana;


Phantom Wallet;


Banco de dados.


Resultado esperado:
Ambiente funcional pronto para codificação.

✅ 4. MVP em Desenvolvimento
O que entregar:
Primeiras telas e funcionalidades do sistema.
Deve conter:


Landing Page;


Dashboard;


Pagamentos;


Doações;


Navegação inicial.


Resultado esperado:
Primeira versão visual do sistema funcionando.

✅ 5. Integrações Iniciais Realizadas
O que entregar:
Primeiras conexões do sistema.
Deve conter:


Wallet Phantom;


Solana Devnet;


APIs básicas;


Navegação.


Resultado esperado:
Sistema iniciando comunicação real com blockchain.

🏁 RESULTADO FINAL DO DIA 4
Ao final do Dia 4, o grupo possuirá:
✅ Arquitetura organizada
✅ Repositório estruturado
✅ Tecnologias configuradas
✅ Front-end iniciado
✅ Integração blockchain inicial
✅ Primeiras telas funcionando
✅ Base técnica sólida
✅ MVP em desenvolvimento

🚀 CONCLUSÃO DETALHADA — DIA 4
A etapa “Construção” marca o início do desenvolvimento real do CabanaPay.
Após os dias anteriores de pesquisa, estruturação e definição do MVP, o projeto passa agora para a fase prática de implementação da aplicação.
Durante esta etapa, foi criada uma arquitetura moderna e organizada, permitindo que o sistema seja escalável, seguro e fácil de manter futuramente.
A organização do repositório e divisão das tarefas ajudaram a estruturar melhor o desenvolvimento em equipe, permitindo maior produtividade e clareza nas responsabilidades.
Além disso, as primeiras integrações com Solana e Phantom Wallet aproximam o projeto de um ambiente funcional real, permitindo validar pagamentos, conexões blockchain e fluxo financeiro.
O início do desenvolvimento das interfaces também possibilitou visualizar o sistema funcionando na prática, criando uma experiência mais concreta do projeto.
Com isso, o CabanaPay passa a possuir:


Estrutura técnica sólida;


Arquitetura moderna;


Front-end em desenvolvimento;


Integração blockchain inicial;


Base pronta para evolução do MVP;


Organização profissional do projeto.


Essa etapa representa a transformação do planejamento em produto real, preparando o CabanaPay para os próximos ciclos de desenvolvimento, testes e validação com usuários da comunidade.
