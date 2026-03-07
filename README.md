KnowHub

Frontend da plataforma KnowHub, desenvolvido com React + TypeScript, que permite aos usuários visualizar e gerenciar seus conhecimentos. Ele se conecta a uma API RESTful externa para realizar login, cadastro, listagem, edição e exclusão de usuários.

🚀 Funcionalidades

Tela de login e cadastro com autenticação via JWT.

Visualização de usuários e seus conhecimentos.

Edição e exclusão do próprio perfil e conhecimentos.

Cards responsivos para exibir usuários e conhecimentos.

Feedback visual com loading spinners durante chamadas à API.


🛠 Tecnologias utilizadas


React.js + TypeScript – Framework moderno e tipado.

Vite – Bundler rápido e eficiente.

Tailwind CSS – Estilização responsiva e consistente.

React Router Dom – Navegação entre páginas.

React Spinners – Feedback visual de carregamento.

Axios – Comunicação com o backend via API RESTful.


🚀Hospedagem e deploy:

Vercel 


💻 Pré-requisitos

Node.js >= 18

npm 

⚡ Instalação e execução

Clone o repositório:

git clone https://github.com/barbara-dsv/desafio-front-avanti-bootcamp-fullstack.git
cd knowhub-frontend

Instale as dependências:

npm install

🎯Para ter acesso ao nosso backend acesse o link do repositório:´

https://github.com/barbara-dsv/desafio-bootcamp-avanti-backend

Inicie o projeto com Vite:

npm run dev

Configure a URL da API no arquivo .env (exemplo):

VITE_API_URL=https://seu-backend.vercel.app

Acesse no navegador: http://localhost:5173

🎨 Estilo e UX

Cards padronizados para usuários e conhecimentos.

Botões com hover e animações suaves.

Layout responsivo para desktop e mobile.

Paleta de cores KnowHub aplicada com Tailwind CSS.

🔐 Segurança

Armazena o token JWT para autenticação.

Usuário só pode visualizar e alterar seus próprios dados.

Rotas protegidas no frontend conforme o token JWT.

📈 Por que usar KnowHub (Frontend)

“O frontend KnowHub oferece uma interface intuitiva e moderna, conectando os usuários de forma eficiente à API, garantindo que cada pessoa possa gerenciar e oferecer seus conhecimentos de forma segura e responsiva.”

👩‍💻 Desenvolvedores

Bárbara Lourenço
Bruna Melo
Raimunda Nonata 

📄 Licença

MIT License