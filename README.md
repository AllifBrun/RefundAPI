# Refund API

API backend para gerenciamento de reembolsos com autenticação JWT, upload de arquivos e controle de acesso por função.

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma (PostgreSQL)
- JWT / jsonwebtoken
- bcrypt
- multer
- zod
- tsx / tsc-alias

## Estrutura principal

- `src/app.ts` - configurações do Express e middlewares
- `src/server.ts` - inicialização do servidor
- `src/routes/` - definição de rotas por recurso
- `src/controllers/` - lógica de requests/responses
- `src/middlewares/` - autenticação, autorização e erro
- `src/database/prisma.ts` - cliente Prisma
- `src/configs/` - configurações de auth e upload
- `src/providers/` - provider de armazenamento local
- `prisma/schema.prisma` - modelo de dados

## Requisitos

- Node.js 18+ (o projeto usa recursos modernos de TS)
- PostgreSQL

## Instalação

```bash
npm install
```

## Configuração de ambiente

Crie um arquivo `.env` na raiz com as variáveis:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="sua_secret"
PORT=3333
```

> No Render, defina `DATABASE_URL` e `JWT_SECRET` diretamente nas variáveis de ambiente do serviço.

## Comandos

- `npm run dev` - roda em modo desenvolvimento com recarga automática
- `npm run build` - compila o TypeScript e aplica `tsc-alias`
- `npm start` - inicia o servidor a partir do código compilado

## Prisma

Após configurar `DATABASE_URL`, rode:

```bash
npx prisma generate
npx prisma db push
```

> Para deploy no Render, use `npx prisma db push` no build command se quiser sinular o schema direto no banco.

## Endpoints

### Usuários

- `POST /users`
  - Cria novo usuário
  - Campos: `name`, `email`, `password`, `role`

### Sessões

- `POST /sessions`
  - Faz login e retorna um token JWT
  - Campos: `email`, `password`

### Reembolsos

- `POST /refunds`
  - Cria um novo reembolso
  - Requer role `employee`
  - Campos: `name`, `category`, `amount`, `filename`

- `GET /refunds`
  - Lista reembolsos paginados
  - Requer role `manager`
  - Query params: `name`, `page`, `perPage`

- `GET /refunds/:id`
  - Retorna um reembolso por ID
  - Requer role `employee` ou `manager`

### Uploads

- `POST /uploads`
  - Faz upload de arquivo via multipart/form-data
  - Campo do arquivo: `file`
  - Requer role `employee`

## Autenticação e autorização

- `ensureAuthenticated` protege rotas privadas via `Authorization: Bearer <token>`
- `verifyUserAuthorization` valida roles:
  - `employee` para criar reembolsos e uploads
  - `manager` para listar reembolsos

## Observações de deploy

- O armazenamento de uploads é local (`tmp/uploads`) e não é persistente em plataformas como Render. Para produção, use storage externo (S3, Cloudinary, etc.)
- Configure `DATABASE_URL` e `JWT_SECRET` no ambiente de deploy
- Ajuste o build/start do Render para:
  - Build: `npm install && npm run build && npx prisma generate && npx prisma db push`
  - Start: `npm start`

## Estrutura de banco

O schema Prisma define:

- `User` com `role` (`employee` ou `manager`)
- `Refunds` com categoria, valor, arquivo e relação com usuário

---

Projeto criado para gerenciar solicitações de reembolso com controle de acesso e upload de comprovantes.
