import { Request, Response } from 'express';
import { Pessoa } from '../models/pessoasModel';
import { IPessoasService } from '../services/core/IPessoasService';
import { IPessoasController } from './core/IPessoasController';
import { RegisterPessoaBody } from '../types/RegisterPessoaBody';

export class PessoasController implements IPessoasController {

    constructor(pessoasService: IPessoasService) {
        this.pessoasService = pessoasService;
    }
    
    pessoasService: IPessoasService;

    public registerPessoa(req: Request<{}, {}, RegisterPessoaBody>, res: Response<Pessoa>): void {
        let result = this.pessoasService.registerNewPessoa(req.body);
        res.json(result);
    }

    getAllPessoas(req: Request<{}, {}, {}>, res: Response<Pessoa[]>): void {
        let result = this.pessoasService.getAllPessoa();
        res.json(result);
    }

    getByIdPessoas(req: Request<{ id: number; }, {}, {}>, res: Response<Pessoa>): void {
        let result = this.pessoasService.getByIdPessoa(req.params.id);
        if (!result) res.sendStatus(404); // Not found
        else res.json(result);
    }

}
