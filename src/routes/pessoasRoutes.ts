import { Router } from "express";
import { Controllers } from "../injection";

export function pessoas_setupRoutes(controllers: Controllers): Router {
    const router = Router();

    router.post("/", controllers.pessoas.registerPessoa.bind(controllers.pessoas));

    router.get("/:id", controllers.pessoas.getByIdPessoa.bind(controllers.pessoas));
    router.delete("/:id", controllers.pessoas.removeByIdPessoa.bind(controllers.pessoas));

    router.get("/", controllers.pessoas.getAllPessoas.bind(controllers.pessoas));

    return router;
}
