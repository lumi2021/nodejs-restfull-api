import { Pessoa } from "../../models/pessoasModel";
import { RepositoryError, RepositoryErrorKind } from "../../types/errors/RepositoryError";
import { IPessoasRepository } from "../IPessoasRepository";
import { PessoaEntity, database } from "./memdb";

export class PessoasRepository implements IPessoasRepository {

    constructor() {}

    save(entry: Pessoa): Pessoa {
        
        var nextId = database.pessoas.length + 1;
        entry.id = nextId;

        let entity: PessoaEntity = {
            id: entry.id,
            nome: entry.nome,
            funcao: entry.funcao,
        };
        
        database.pessoas.push(entity);
        return entry;
    }
    update(entry: Pessoa): Pessoa | undefined {

        // Checando se alguma chave é nula
        if (!entry.id) throw new RepositoryError(RepositoryErrorKind.UndefinedData);
        let entry_index = entry.id - 1;
        // checando se as chaves estão dentro dos limites do banco de dados
        if (entry_index < 0 || entry_index-1 > database.pessoas.length) return;

        // checando se alguma chave aponta para uma entrada removida
        if (!database.pessoas[entry_index]) return;
            

        let entity: PessoaEntity = {
            id: entry.id,
            nome: entry.nome,
            
            funcao: entry.funcao,
        };
        
        database.pessoas[entry_index] = entity;
        return entry;
    }
    remove(id: number): boolean {
        let index = id - 1;

        if (index < 0 || index > database.pessoas.length) return false;
        if (database.pessoas[index] == null) return false;

        database.pessoas[index] = null;
        return true;
    }
    getAll(): Pessoa[] {
        var pessoasArr: Pessoa[] = [];

        for(let i = 0; i < database.pessoas.length; i++) {
            var e = database.pessoas[i];
            if (!e) continue;

            pessoasArr.push({
                id: e.id,
                nome: e.nome,
                funcao: e.funcao,
            });
        }

        return pessoasArr;
    }
    getById(id: number): Pessoa | undefined {
        // Checando se o indice está dentro dos limites do banco
        if (id < 1 || id > database.pessoas.length-1) return;
        let index = id - 1;

        let res = database.pessoas[index];
        if (res == null) return;

        return {
            id: res.id,
            nome: res.nome,
            funcao: res.funcao,
        };
    }

}