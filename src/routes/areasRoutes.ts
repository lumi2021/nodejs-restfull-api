import { Router } from "express";
import { Controllers } from "../injection";

export function areas_setupRoutes(controllers: Controllers): Router {
    const router = Router();

    // POST  /api/v1/areas       - registra uma nova area
    router.post("/", controllers.areas.registerArea.bind(controllers.areas));
    // GET   /api/v1/areas       - retorna toda a lista de areas
    router.get("/", controllers.areas.getAllAreas.bind(controllers.areas));
    // GET   /api/v1/areas:id    - retorna uma area por id
    router.get("/:id", controllers.areas.getByIdArea.bind(controllers.areas));

    return router;
}
