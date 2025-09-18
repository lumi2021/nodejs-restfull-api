import { Request, Response } from 'express';
import { Pessoa } from '../models/pessoasModel';
import { IPessoasService } from '../services/core/IPessoasService';
import { IPessoasController } from './core/IPessoasController';
import { RegisterPessoaBody } from '../types/RegisterPessoaBody';
import { RepositoryError, RepositoryErrorKind } from '../types/errors/RepositoryError';
import { StatusCode } from '../types/StatusCode';

export class PessoasController implements IPessoasController {

    constructor(pessoasService: IPessoasService) {
        this.pessoasService = pessoasService;
    }
    
    pessoasService: IPessoasService;

    registerPessoa(req: Request<{}, {}, RegisterPessoaBody>, res: Response<Pessoa | object>): void {
        let body: RegisterPessoaBody = req.body;

        if (!body.nome || !body.funcao) {
            res.status(StatusCode.BadRequest).json({
                message: "Corpo da requisição mal formado.",
                error:   "Corpo da requisição mal formado. Experado: { nome: String, funcao: String }"
            });
            return;
        }
        
        try {
            let result = this.pessoasService.registerNewPessoa(body);
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
            else {
                console.error("Unexpected error:", e);
                res.status(StatusCode.InternalServerError).json({
                    message:    "Um erro interno inexperado ocorreu, por favor contate o suporte!",
                    error: e,
                });
            }
        }
    }

    getAllPessoas(req: Request<{}, {}, {}>, res: Response<Pessoa[] | object>): void {
        try {
            let result = this.pessoasService.getAllPessoa();
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

    getByIdPessoa(req: Request<{ id: number; }, {}, {}>, res: Response<Pessoa | object>): void {
        
        if (isNaN(Number(req.params.id))) {
            res.status(StatusCode.BadRequest).json({
                message: "Parâmetros da requisição mal formados.",
                error:   "Parâmetros da requisição mal formados."
            });
            return;
        }
        
        try {
            let result = this.pessoasService.getByIdPessoa(req.params.id);
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

    removeByIdPessoa(req: Request<{ id: number; }, {}, {}>, res: Response): void {
        
        if (isNaN(Number(req.params.id))) {
            res.status(StatusCode.BadRequest).json({
                message: "Parâmetros da requisição mal formados.",
                error:   "Parâmetros da requisição mal formados."
            });
            return;
        }
        
        try {
            let result = this.pessoasService.removeByIdPessoa(req.params.id);
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
