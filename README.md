# EventPass API

API RESTful de agendamento de eventos, desenvolvida para aplicação dos treinamentos do onboarding de 2026.2 da Seed a Bit Tecnologia na trilha de back-end, com aplicação de boas práticas e código limpo.

## Sobre o projeto

A aplicação expõe um CRUD de **usuários** e **eventos**, permitindo que cada usuário agende eventos em um intervalo de data/hora, com validações e regras de negócio para evitar dados inconsistentes:

- E-mail de usuário único (não permite cadastro duplicado).
- Datas de evento sempre no futuro, com término após o início.
- Não é possível criar eventos para usuários inativos.
- Não é possível agendar dois eventos com horários conflitantes para o mesmo usuário.
- Exclusões são "soft delete": usuários são marcados como `INACTIVE` (e seus eventos agendados são cancelados) e eventos são marcados como `CANCELED`, sem remoção definitiva dos dados.

## Stack utilizada

- **NestJS 11** — framework principal (TypeScript).
- **Prisma ORM 7** com adapter `@prisma/adapter-pg` — acesso a dados.
- **PostgreSQL** — banco de dados.
- **class-validator** / **class-transformer** — validação e transformação de DTOs.
- **@nestjs/swagger** — documentação OpenAPI gerada automaticamente.
- **ESLint** + **Prettier** — padronização e qualidade de código.

## Metodologia

- **Arquitetura modular** do Nest: cada domínio (`user`, `events`, `prisma`) é um módulo isolado com `controller`, `service`, `module`, `dto/` e documentação Swagger própria.
- **Validação global** de entrada via `ValidationPipe` (`transform`, `whitelist`, `forbidNonWhitelisted`), configurada em `src/main.ts`.
- **Validadores customizados** (`src/common/date.decorators.ts`): `IsDateInFuture` e `IsGreaterThan(propriedade)`, usados para validar as datas de início/término de um evento.
- **Regras de negócio na camada de serviço**, não em decorators assíncronos — checagens que dependem do banco (e-mail duplicado, usuário ativo, conflito de horário) ficam nos `services`, mantendo os DTOs responsáveis apenas por validação de formato.
- **Soft delete**: nenhum registro é removido fisicamente; status (`ACTIVE`/`INACTIVE`, `SCHEDULED`/`COMPLETED`/`CANCELED`) controla o ciclo de vida.

## Modelo de dados

**User**
| Campo | Tipo | Observação |
|---|---|---|
| id | UUID | gerado automaticamente |
| email | String | único |
| fullName | String | |
| dateBirth | DateTime | |
| phoneNumber | String | |
| status | `ACTIVE` \| `INACTIVE` | padrão `ACTIVE` |
| createdAt / updatedAt | DateTime | automáticos |

**Events**
| Campo | Tipo | Observação |
|---|---|---|
| id | UUID | gerado automaticamente |
| title | String | |
| description | String? | opcional |
| startDateTime / endDateTime | DateTime | término deve ser após o início |
| status | `SCHEDULED` \| `COMPLETED` \| `CANCELED` | padrão `SCHEDULED` |
| userID | UUID | referencia `User` |
| createdAt / updatedAt | DateTime | automáticos |

## Endpoints

### Usuários (`/user`)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/user` | Cria um usuário |
| GET | `/user` | Lista todos os usuários |
| GET | `/user/:id` | Busca um usuário por id |
| PATCH | `/user/:id` | Atualiza um usuário |
| DELETE | `/user/:id` | Inativa um usuário e cancela seus eventos agendados |
| GET | `/user/:id/events` | Lista os eventos de um usuário |

### Eventos (`/events`)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/events` | Cria um evento |
| GET | `/events` | Lista todos os eventos |
| GET | `/events/:id` | Busca um evento por id |
| PATCH | `/events/:id` | Atualiza um evento |
| DELETE | `/events/:id` | Cancela um evento |

## Como rodar o projeto

### Pré-requisitos
- Node.js
- PostgreSQL rodando localmente (não há Docker/docker-compose no projeto)

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Criar um arquivo .env na raiz com as variáveis:
# PORT=3000
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/desafio_nest?schema=public"

# 3. Rodar as migrations do Prisma
npx prisma migrate dev

# 4. Subir a aplicação em modo desenvolvimento (watch)
npm run dev
```

A API sobe em `http://localhost:3000` e a documentação Swagger fica disponível em `http://localhost:3000/api`.