# 📦 Backend para E-Commerce com NestJS 📦

Este repositório contém o backend de E-Commerce oferece recursos para criar, gerenciar e integrar plataformas de comércio eletrônico. Ela permite operações de produtos, pedidos, clientes e carrinhos de compras, com autenticação baseada em tokens para segurança.

## 📋 Funcionalidades

- Gerenciamento de Produtos: Criação, atualização e exclusão de produtos, incluindo controle de estoque.

- Carrinho de Compras: Adição e remoção de itens no carrinho com cálculo automático de totais e subtotais.

- Pedidos: Processamento de pedidos com status de pagamento e gerenciamento de etapas de entrega.

- Gestão de Usuários: Registro de clientes, autenticação e autorização com tokens JWT.

- Administração: Permissões específicas para usuários administradores, incluindo operações avançadas de gerenciamento.

## 🛠 Tecnologias Utilizadas

- **🔴 NestJS**: Framework Node.js para a construção de APIs robustas e escaláveis.
- **🔗 Prisma**: ORM para Node.js e JavaScript, facilitando o gerenciamento do banco de dados.
- **🐳 Docker**: Solução para desenvolvimento e execução de aplicativos em contêineres.
- **📦 PostgreSQL**: Banco de dados relacional robusto e eficiente.

## 🚀 Começando

### Pré-requisitos

- Node.js (v20 ou superior)

- Docker Compose (opcional, para rodar o ambiente de forma isolada)

- PostgreSQL (se preferir rodar o banco de dados localmente)

## 💻 Instalação

```bash
# Clone este repositório
$ git clone https://github.com/DeveloperCommunitty/E-commerce-back-end.git

# Acesse a pasta do projeto no terminal/cmd
$ cd E-commerce-back-end

# Instale as dependências
$ npm install

# Configure o banco de dados
# Duplique o arquivo .env.example e renomeie a cópia para .env.
# Em seguida, adicione as credenciais corretas no campo DATABASE_URL:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

# Rode as migrações do banco de dados
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

```

### 🐳 Utilização com Docker

```bash
# Caso prefira rodar com Docker, utilize o comando abaixo para iniciar o ambiente com Docker Compose
$ docker-compose up
```

Abrir [http://localhost:3000/docs](http://localhost:3000/docs) com seu navegador para ver o resultado.

## 🔑 Autenticação e Autorização

Este projeto utiliza autenticação baseada em tokens JWT para proteger as rotas. Abaixo estão os usuários de teste disponíveis

| Tipo de Usuário | Email                 | Senha        |
| :-------------- | :-------------------- | :----------- |
| `Admin`         | `admin@example.com`   | `admin123`   |
| `Cliente`       | `cliente@example.com` | `cliente123` |

## 📄 Licença

Este projeto está licenciado sob a
[licença MIT](./LICENCE).

# 👥 Autores

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/93228404?v=4" width=115><br><sub>Wesley Santos</sub>](https://github.com/PHziinn) |     | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/132831751?v=4" width=115><br><sub>Naelly Vitoria</sub>](https://github.com/NaellyV) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/139777957?v=4" width=115><br><sub>Pedro Gabriel</sub>](https://github.com/LPeter-nm) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/128644543?v=4" width=115><br><sub>Jhoão Pedro</sub>](https://github.com/Jhopn) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/101986070?v=4" width=115><br><sub>Leandro Barbosa</sub>](https://github.com/LeandroBarbosa753) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :-: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
