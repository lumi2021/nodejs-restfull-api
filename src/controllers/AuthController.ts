import { Request, Response } from "express";
import { IAuthController } from "./core/IAuthController";

export class AuthController implements IAuthController {

    login(req: Request<{}, {}, {}>, res: Response<string>): void {

        let clientid = process.env.GOOGLE_CLIENT_ID!;
        let clientsecret = process.env.GOOGLE_CLIENT_SECRET!;

        let redirectto = process.env.SERVER_ADDRESS + '/api/v1/auth/login/callback';

        const url: URL = new URL(`https://accounts.google.com/o/oauth2/v2/auth`
        + `?client_id=${encodeURIComponent(clientid)}`
        + `&redirect_uri=${redirectto}`
        + `&response_type=code`
        + `&scope=${encodeURIComponent("profile email")}`
        + `&access_type=offline`
        + `&prompt=consent`);
        res.send(url.toString());
    }
    async loginCallback(req: Request<{}, {}, {}>, res: Response<string>): Promise<void> {
        if (req.query.code) {

            let code: string = req.query.code as string;
            // TODO converter code em token

            res.send("<h1>Autenticado!</h1><p>Você já pode fechar esta janela.</p>");
        } else {
            res.send("<h1>Erro ao autenticar!</h1><p>Por favor, tente novamente.</p>");
        }
    }

}
