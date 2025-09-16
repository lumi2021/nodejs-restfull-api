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
        console.log(req.body);
        let result = this.pessoasService.registerNewPessoa(req.body);
        res.json(result);
    }

}
