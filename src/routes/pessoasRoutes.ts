import { Router } from "express";
import { Controllers } from "../injection";

export function pessoas_setupRoutes(controllers: Controllers): Router {
    const router = Router();

    // POST  /api/v1/pessoas     - registra uma nova pessoa
    router.post("/", controllers.pessoas.registerPessoa.bind(controllers.pessoas));
    // GET   /api/v1/pessoas     - retorna toda a lista de pessoas
    router.get("/", controllers.pessoas.getAllPessoas.bind(controllers.pessoas));
    // GET   /api/v1/pessoas:id  - retorna uma pessoa por id
    router.get("/:id", controllers.pessoas.getByIdPessoas.bind(controllers.pessoas));

    return router;
}
