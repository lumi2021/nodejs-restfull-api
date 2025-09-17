import { Pessoa } from "../../models/pessoasModel";
import { RegisterPessoaBody } from "../../types/RegisterPessoaBody";

export interface IPessoasService {

    registerNewPessoa(pessoa: RegisterPessoaBody): Pessoa;
    getAllPessoa(): Pessoa[];
    getByIdPessoa(id: number): Pessoa | undefined;

}
