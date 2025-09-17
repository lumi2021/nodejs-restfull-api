import { Pessoa } from "../models/pessoasModel";
import { IPessoasRepository } from "../repository/IPessoasRepository";
import { RegisterPessoaBody } from "../types/RegisterPessoaBody";
import { IPessoasService } from "./core/IPessoasService";

export class PessoasService implements IPessoasService {

    constructor(pessoasRepo: IPessoasRepository) {
        this.pessoaRepository = pessoasRepo;
    }
    
    pessoaRepository: IPessoasRepository;

    public registerNewPessoa(pessoa: RegisterPessoaBody): Pessoa {
        let pessoaModel: Pessoa = {
            nome: pessoa.nome,
            area: undefined!,
        };

        this.pessoaRepository.save(pessoaModel);

        return pessoaModel;
    }

    getAllPessoa(): Pessoa[] {
        let pessoaArr = this.pessoaRepository.getAll();
        return pessoaArr;
    }

    getByIdPessoa(id: number): Pessoa | undefined {
        return this.pessoaRepository.getById(id);
    }
}
