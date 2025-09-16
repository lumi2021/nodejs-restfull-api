import { Pessoa } from "../../models/pessoasModel";
import { IPessoasRepository } from "../IPessoasRepository";
import { PessoaEntity, database } from "./memdb";

export class PessoasRepository implements IPessoasRepository {

    constructor() {}

    save(usuario: Pessoa): Pessoa {
        var nextId = database.pessoas.length;
        usuario.id = nextId;

        var entity: PessoaEntity = {
            id: usuario.id,
            name: usuario.nome,
        };
        
        database.pessoas.push(entity);

        return usuario;
    }
    update(id: number, usuario: Pessoa): Pessoa | undefined {
        throw new Error("Method not implemented.");
    }
    remove(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    getAll(): Pessoa[] {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Pessoa | undefined {
        throw new Error("Method not implemented.");
    }

}