import express from 'express';
import { Controllers, setupDependencyInjection } from './injection';
import dotenv from 'dotenv';

import { areas_setupRoutes } from './routes/areasRoutes';
import { pessoas_setupRoutes } from './routes/pessoasRoutes';
import { presencas_setupRoutes } from './routes/presencasRoutes';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
console.clear();

const controllers: Controllers = setupDependencyInjection();

// Insira novas rotas aqui! //
app.use("/api/v1/presencas", presencas_setupRoutes(controllers));
app.use("/api/v1/pessoas", pessoas_setupRoutes(controllers));
app.use("/api/v1/areas", areas_setupRoutes(controllers));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Routes:

// POST   /api/v1/pessoas            - registra uma nova pessoa
// GET    /api/v1/pessoas            - retorna toda a lista de pessoas
// REMOVE /api/v1/pessoas            - remove o registro de uma pessoa
// GET    /api/v1/pessoas:id         - retorna uma pessoa por id
// GET    /api/v1/pessoas:id/areas   - retorna as áreas que uma pessoa passou

// POST   /api/v1/areas              - registra uma nova area
// GET    /api/v1/areas              - retorna toda a lista de areas
// REMOVE /api/v1/areas              - remove o registro de uma area
// GET    /api/v1/areas:id           - retorna uma area por id
// GET    /api/v1/areas:id/pessoas   - retorna pessoas que passaram pela área

// POST   /api/v1/presencas:id/:id    - registra a presença de uma pessoa em uma area
// GET    /api/v1/presencas           - retorna toda a lista de presença das últimas horas de um dia
