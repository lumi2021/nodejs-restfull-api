import { Router } from "express";
import { Controllers } from "../injection";

export function areas_setupRoutes(controllers: Controllers): Router {
    const router = Router();

    // POST  /api/v1/areas       - registra uma nova area
    // GET   /api/v1/areas       - retorna toda a lista de areas
    // GET   /api/v1/areas:id    - retorna uma area por id

    return router;
}
