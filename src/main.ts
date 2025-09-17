import express, { Request, Response } from 'express';
import presencasRoutes from './routes/presencasRoutes';
import areasRoutes, { areas_setupRoutes } from './routes/areasRoutes';
import relatorioRoutes from './routes/relatorioRoutes';
import { Controllers, setupDependencyInjection } from './injection';
import { pessoas_setupRoutes } from './routes/pessoasRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
console.clear();

const controllers: Controllers = setupDependencyInjection();

// Insira novas rotas aqui! //
app.use("/api/v1/presencas", presencasRoutes);
app.use("/api/v1/relatorio", relatorioRoutes);
app.use("/api/v1/pessoas", pessoas_setupRoutes(controllers));
app.use("/api/v1/areas", areas_setupRoutes(controllers));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Routes:

// POST  /api/v1/pessoas     - registra uma nova pessoa
// GET   /api/v1/pessoas     - retorna toda a lista de pessoas
// GET   /api/v1/pessoas:id  - retorna uma pessoa por id

// POST  /api/v1/areas       - registra uma nova area
// GET   /api/v1/areas       - retorna toda a lista de areas
// GET   /api/v1/areas:id    - retorna uma area por id


