import { Router } from "express";
import { Controllers } from "../injection";

export function auth_setupRoutes(controllers: Controllers): Router {
    const router = Router();

    router.get("/login", controllers.auth.login.bind(controllers.auth));
    router.get("/login/callback", controllers.auth.loginCallback.bind(controllers.auth));

    return router;
}
