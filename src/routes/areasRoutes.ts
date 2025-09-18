import { Router } from "express";
import { Controllers } from "../injection";

export function areas_setupRoutes(controllers: Controllers): Router {
    const router = Router();

    router.post("/", controllers.areas.registerArea.bind(controllers.areas));

    router.get("/:id", controllers.areas.getByIdArea.bind(controllers.areas));
    router.delete("/:id", controllers.areas.removeByIdArea.bind(controllers.areas));

    router.get("/", controllers.areas.getAllAreas.bind(controllers.areas));

    return router;
}
