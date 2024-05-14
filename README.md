
# Alimentação de planilha Google

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](<https://nodejs.org/en/>)
- [TypeScript](<https://www.typescriptlang.org/>)
- [Prisma](<https://www.prisma.io/>)
- [Fastfy](<https://fastify.dev/>)
- [Vitest](<https://vitest.dev/>)


## Clone este repositório
$ git clone <https://github.com/edsoncoutinho/desafio-edson-alves-coutinho>

## Execute o container com a base de dados
$ docker-compose up -d

## Configure as variáveis de ambiente
$ cp .env.example .env

## Instale as dependências
$ npm install

## Para executar os testes unitários
$ npm run test

## Para executar os testes e2e
$ npm run test:e2e

## Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

## O servidor inciará em <http://localhost:3333>