import { Router } from "express";
import { Controllers } from "../injection";

export function presencas_setupRoutes(controllers: Controllers): Router {
    const router = Router();

    // POST /api/v1/presencas:id/:id    - registra a presença de uma pessoa em uma area
    router.post("/:pessoa_id/:area_id", controllers.presencas.registerPresenca.bind(controllers.presencas));
    // GET  /api/v1/presencas           - retorna toda a lista de presença das últimas horas de um dia
    router.get("/", controllers.presencas.getPresencas.bind(controllers.presencas));

    return router;
}