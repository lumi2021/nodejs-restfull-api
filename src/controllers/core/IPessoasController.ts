import { Request, Response } from 'express';
import { Pessoa } from '../../models/pessoasModel';
import { RegisterPessoaBody } from "../../types/RegisterPessoaBody";

export interface IPessoasController {
    
    registerPessoa(req: Request<{}, {}, RegisterPessoaBody>, res: Response<Pessoa>): void;
    getAllPessoas(req: Request<{}, {}, {}>, res: Response<Pessoa[]>): void;
    getByIdPessoa(req: Request<{id: number}, {}, {}>, res: Response<Pessoa>): void;
    removeByIdPessoa(req: Request<{id: number}, {}, {}>, res: Response): void;

}