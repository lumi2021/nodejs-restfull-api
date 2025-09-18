import { Request, Response } from "express";
import { GetPresencasQuery, IPresencasController, RegisterPresencaParams } from "./core/IPresencasController";
import { IPresencasService } from "../services/core/IPresencasService";
import { Presenca } from "../models/PresencaModel";
import { StatusCode } from "../types/StatusCode";
import { RepositoryError, RepositoryErrorKind } from "../types/errors/RepositoryError";
import { PresencaIntervalo } from "../models/PresencaIntervaloModel";

export class PresencasController implements IPresencasController {

    constructor (presencasService: IPresencasService) {
        this.presencasService = presencasService;
    }

    presencasService: IPresencasService;

    registerPresenca(req: Request<RegisterPresencaParams, {}, {}>, res: Response): void {

        if (isNaN(req.params.pessoaId) || isNaN(req.params.areaId)) {
            res.sendStatus(StatusCode.BadRequest);
            return;
        }

        try {
            this.presencasService.registerPresenca(req.params.pessoaId, req.params.areaId);
            res.sendStatus(StatusCode.Success);
        }

        catch (e: any)
        {
            console.error("Unexpected error:", e);
            res.status(StatusCode.InternalServerError).json({
                message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                error: e,
            });
        }
    }
    
    getPresencas(req: Request<{}, {}, {}, GetPresencasQuery>, res: Response<PresencaIntervalo | object>): void {
        
        if (req.query.ibeg && req.query.iend && req.query.ibeg >= req.query.iend) {
            res.sendStatus(StatusCode.BadRequest).json({
                message:    "Começo não pode ser maior que fim do intervalo.",
                error:      "Começo não pode ser maior que fim do intervalo.",
            });
        }

        if ((req.query.pessoaid && isNaN(req.query.pessoaid))
        || (req.query.areaid && isNaN(req.query.areaid))) {
            res.status(StatusCode.BadRequest).json({
                message: "Parâmetros da requisição mal formados.",
                error:   "Parâmetros da requisição mal formados."
            });
            return;
        }

        try {
            let result = this.presencasService.getPresenca(
                req.query.pessoaid,
                req.query.areaid,
                req.query.ibeg,
                req.query.iend);
            res.json(result);
        }
        catch (e: any)
        {
            console.error("Unexpected error:", e);
            res.status(StatusCode.InternalServerError).json({
                message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                error: e,
            });
        }

    }

}
