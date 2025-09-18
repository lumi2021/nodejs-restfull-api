import { Pessoa } from "../models/pessoasModel";
import { IAreasRepository } from "../repository/IAreasRepository";
import { IPessoasRepository } from "../repository/IPessoasRepository";
import { RegisterError, RegisterErrorKind } from "../types/errors/RegisterError";
import { RegisterPessoaBody } from "../types/RegisterPessoaBody";
import { IPessoasService } from "./core/IPessoasService";

export class PessoasService implements IPessoasService {

    constructor(
        pessoasRepo: IPessoasRepository,
        areasRepo: IAreasRepository,
    ) {
        this.pessoaRepository = pessoasRepo;
        this.areasRepository = areasRepo;
    }
    
    pessoaRepository: IPessoasRepository;
    areasRepository: IAreasRepository;

    registerNewPessoa(pessoa: RegisterPessoaBody): Pessoa {

        let pessoaModel: Pessoa = {
            nome: pessoa.nome,
            funcao: pessoa.funcao,
        };

        return this.pessoaRepository.save(pessoaModel);
    }

    getAllPessoa(): Pessoa[] {
        let pessoaArr = this.pessoaRepository.getAll();
        return pessoaArr;
    }

    getByIdPessoa(id: number): Pessoa | undefined {
        return this.pessoaRepository.getById(id);
    }
}
