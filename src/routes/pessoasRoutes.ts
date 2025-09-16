import { Router } from "express";
import { Controllers } from "../injection";

export function pessoas_setupRoutes(controllers: Controllers): Router {
    const router = Router();

    router.post("/", controllers.pessoas.registerPessoa.bind(controllers.pessoas));

    return router;
}
