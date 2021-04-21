## API Restful com Node.js, Express, Typescript, TypeORM, Postgres, Redis, Docker, Jest, JWT ...

## :speech_balloon: Sobre

API Vendas, aplicação que permite gestão de vendas. Neste projeto foi utilizada as
melhores práticas na construção do projeto, com o uso das tecnologias TypeScript, Express, TypeORM em cima do Ambiente e execução de javascript, o NodeJS.

## :rocket: Tecnologias

- [TypeScript](https://www.typescriptlang.org/): Linguagem.
- [NodeJs](https://nodejs.org/en/): Ambiente de Execução.
- [Express](https://expressjs.com/): API Framework
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken): Autenticação JWT
- [Multer](https://github.com/expressjs/multer): Upload de Arquivos
- [Postgres](https://www.postgresql.org/): Banco de Dados
- [TypeORM](https://typeorm.io/#/): ORM
- [Eslint](https://eslint.org/): Padronização de código
- [Jest](https://jestjs.io/): Testes
- [tsyringe](https://github.com/microsoft/tsyringe): Lib de injeção de dependencias.
- [uuidv4](https://github.com/thenativeweb/uuidv4#readme): uuid.

:warning: Durante o desenvolvimento irei atualizando a lista de tecnologias
### Base da Aplicação.

Requisitos funcionais:

    [] 100% de cobertura de testes nos services da aplicação.
    [x] Tratamento de exceções global

Requisitos Não Funcionais:
    - Framework da API - Express
    - Linguagem de Programação - TypeScript
    - Banco de dados utilizado na aplicação - Postgres
    - ORM - TypeORM
    - Lib de testes - Jest
    - Utilizar Ethereal Email para testar envios de email em ambiente de desenvolvimento
    - Utilizar Amazon SES para envios de email em ambiente de Produção.
    - Utilizar Eslint, Prettier e EditorConfig para padronizar o código em ambiente de desenvolvimento

### Criação de usuário

    Requisitos Funcionais:
      [x] Criação de conta com (Nome, Email, Senha);
      [x] Envio de email confirmando criação de conta;

    Requisitos Não Funcionais:
      - Envio de email utilizando lib Nodemailer;

    Regras de Negócio:
      [x] Não pode ser criado duas contas com o mesmo email;
      [x] A senha deve ser Hasheada antes de ser gravada no banco de dados;

### Autenticação

    Requisitos Funcionais:
      [x] O usuário deve poder se Autenticar utilizando email e senha;

    Requisitos Não Funcionais:
      - A autenticação deve ser feita com Json Web Token (JWT);

    Regras de Negócio:
      [x] No payload do token deve ser armazenado o ID do usuário;

### Recuperação de Senha

    Requisitos Funcionais:
      [x] O usuário deve poder recuperar sua senha informando o seu email;
      [x] O usuário de receber um email com instruções de recuperação de senha;
      [x] O usuário deve poder resetar sua senha;

    Requisitos Não Funcionais:
      - Envio de email utilizando lib Nodemailer;

    Regras de Negócio:
      [x] O link enviado por email para resetar a senha, deve expirar em 2h;
      [x] O usuário precisa confirmar a nova senha ao resetar sua senha.

### Atualização de Perfil

    Requisitos Funcionais:
      [x] O usuário deve poder atualizar seu perfil (nome, email, senha, Avatar);

    Regras de Negócio:
      [x] O usuário não pode alterar seu email para um email ja em uso na aplicação
      [x] Para atulizar sua senha, o usuário deve informar a senha antiga;
      [x] Para atulizar sua senha, o usuário precisa confirmar a senha;

### Painel de Produtos

    Requisitos Funcionais:
      [x] O usuário pode listar produtos;
      [x] O usuário pode criar novos produtos;
      [x] O usuário pode visualizar as informações de um único produto;
      [x] O usuário pode atualizar as informações de um produto;
      [x] O usuário pode deletar um produto;

    Requisitos Não Funcionais:
      - A listagem de produtos deve ser armazenada em cache.

### Painel de Clientes

    Requisitos Funcionais:
      [x] O usuário pode listar clientes;
      [x] O usuário pode criar novos clientes;
      [x] O usuário pode visualizar as informações de um único cliente;
      [x] O usuário pode atualizar as informações de um cliente;
      [x] O usuário pode deletar um cliente;

### Painel de Ordens/Pedidos

    Requisitos Funcionais:
        [x] O cliente poderá realizar um pedido de produtos;
        [x] O cliente poderá visualizar um pedido específico;

    Regras de Negócio:
        [x] Não pode ser permitido realizar pedidos para cliente que não existe;
        [x] Não pode ser permitido realizar pedidos para produtos que não existem;
        [x] Não pode ser permitido realizar pedidos para produtos que não possuem quantidade suficiente em estoque;
---

## :book: **Guilherme Andrade**

Desafio realizado por Guilherme Alvarenga Andrade.

## tips/scripts

Faça um clone deste repositório e instale no seu ambiente de desenvolvimento usando o seguinte comando no seu terminal (escolha um diretório apropriado):

```
git clone https://github.com/guilhermeaandrade/api-vendas-udemy.git
```

Após clonar o conteúdo do repositório, acesse o diretório criado e efetue a instalação das dependências:

```
cd api-vendas

yarn

# ou

npm install
```

Após essa instalação execute a aplicação com o comando `yarn dev` ou `npm run dev`. O servidor estará em execução no endereço `http://localhost:3333`.

### criar migrations:

- Tem um script no package para auxiliar nisso, uma vez que estamos usando ts.

Terminal: `yarn typeorm migration:create -n CreateAppointments`

- Execugtar migration: `yarn typeorm migration:run`
- Rollback desfazer : `yarn typeorm migration:revert`
