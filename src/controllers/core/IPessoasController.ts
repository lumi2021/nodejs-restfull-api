import { Request, Response } from 'express';
import { Pessoa } from '../../models/pessoasModel';
import { RegisterPessoaBody } from "../../types/RegisterPessoaBody";

export interface IPessoasController {
    
    registerPessoa(req: Request<{}, {}, RegisterPessoaBody>, res: Response<Pessoa>): void;

}
