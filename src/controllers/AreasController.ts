import { Request, Response } from 'express';
import { RegisterAreaBody } from '../types/RegisterAreaBody';
import { Area } from '../models/areasModel';
import { IAreasService } from '../services/core/IAreasService';
import { IAreasController } from './core/IAreasController';
import { RepositoryError, RepositoryErrorKind } from '../types/errors/RepositoryError';
import { StatusCode } from '../types/StatusCode';
import { RegisterError, RegisterErrorKind } from '../types/errors/RegisterError';

export class AreasController implements IAreasController {

    constructor(areasService: IAreasService) {
        this.areasService = areasService;
    }
    
    areasService: IAreasService;

    registerArea(req: Request<{}, {}, RegisterAreaBody>, res: Response<Area | object>): void {
        let body: RegisterAreaBody = req.body;

        if (!body.nome || !body.local || !body.tipo) {
            res.status(StatusCode.BadRequest).json({
                message: "Corpo da requisição mal formado.",
                error:   "Corpo da requisição mal formado. Experado: { nome: String, local: String, tipo: String }"
            });
            return;
        }

        try {
            let result = this.areasService.registerNewArea(body);
            res.json(result);
        }
        
        catch (e: any)
        {
            if (e instanceof RepositoryError) {
                let repoError: RepositoryError = e;
                switch (repoError.error) {

                    case RepositoryErrorKind.Conflict:
                        res.status(StatusCode.Conflict).json({
                            error:   "O serviço encontrou um conflito de dados.",
                        });
                        return;
                    
                    default:
                        res.status(StatusCode.InternalServerError).json({
                            message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                            error: e,
                        });
                        return;
                }
            }
            else if (e instanceof RegisterError) {
                let regError: RegisterError = e;
                switch (regError.error) {

                    case RegisterErrorKind.ArgumentNotFound:
                        res.status(StatusCode.NotFound).json({
                            message:    "A Área requisitada não existe.",
                            error:      "A Área requisitada não existe.",
                        });
                        return;

                    default:
                        res.status(StatusCode.InternalServerError).json({
                            message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                            error: e,
                        });
                        return;
                }
            }
            else {
                console.error("Unexpected error:", e);
                res.status(StatusCode.InternalServerError).json({
                    message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                    error: e,
                });
            };
        }
    }

    getAllAreas(req: Request<{}, {}, {}>, res: Response<Area[] | object>): void {

        try {
            let result = this.areasService.getAllAreas();
            res.json(result);
        }

        catch (e: any)
        {
            if (e instanceof RepositoryError) {
                let repoError: RepositoryError = e;
                switch (repoError.error) {

                    case RepositoryErrorKind.Conflict:
                        res.status(StatusCode.Conflict).json({
                            error:   "O serviço encontrou um conflito de dados.",
                        });
                        return;
                    
                    default:
                        console.error("Unexpected error:", e);
                        res.status(StatusCode.InternalServerError).json({
                            message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                            error: e,
                        });
                        return;
                }
            }
            else {
                console.error("Unexpected error:", e);
                res.status(StatusCode.InternalServerError).json({
                    message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                    error: e,
                });
            };
        }
    }

    getByIdArea(req: Request<{ id: number; }, {}, {}>, res: Response<Area | object>): void {

        if (isNaN(Number(req.params.id))) {
            res.status(StatusCode.BadRequest).json({
                message: "Parâmetros da requisição mal formados.",
                error:   "Parâmetros da requisição mal formados."
            });
            return;
        }

        try {
            let result = this.areasService.getByIdArea(req.params.id);
            if (!result) res.sendStatus(StatusCode.NotFound);
            else res.json(result);
        }

        catch (e: any)
        {
            if (e instanceof RepositoryError) {
                let repoError: RepositoryError = e;
                switch (repoError.error) {

                    case RepositoryErrorKind.Conflict:
                        res.status(StatusCode.Conflict).json({
                            error:   "O serviço encontrou um conflito de dados.",
                        });
                        return;
                    
                    default:
                        res.status(StatusCode.InternalServerError).json({
                            error:   "A operação resultou em um erro desconhecido.",
                        });
                        return;
                }
            }
            else {
                console.error("Unexpected error:", e);
                res.status(StatusCode.InternalServerError).json({
                    message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                    error: e,
                });
            };
        }
    }

    removeByIdArea(req: Request<{ id: number; }, {}, {}>, res: Response): void {

        if (isNaN(Number(req.params.id))) {
            res.status(StatusCode.BadRequest).json({
                message: "Parâmetros da requisição mal formados.",
                error:   "Parâmetros da requisição mal formados."
            });
            return;
        }

        try {
            let result = this.areasService.removeByIdArea(req.params.id);
            if (!result) res.sendStatus(StatusCode.NotFound);
            else res.sendStatus(StatusCode.Success);
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
