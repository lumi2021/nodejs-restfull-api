import { Pessoa } from "../../models/pessoasModel";
import { IPessoasRepository } from "../IPessoasRepository";
import { PessoaEntity, database } from "./memdb";

export class PessoasRepository implements IPessoasRepository {

    constructor() {}

    save(entry: Pessoa): Pessoa {
        var nextId = database.pessoas.length;
        entry.id = nextId;

        let entity: PessoaEntity = {
            id: entry.id,
            name: entry.nome,
            area_id: entry.area.id!,
        };
        
        database.pessoas.push(entity);
        return entry;
    }
    update(entry: Pessoa): Pessoa | undefined {
        if (!entry.id) return;
        if (!entry.area.id) return;
        if (database.pessoas[entry.id] == null) return;
        if (database.areas[entry.area.id] == null) return;

        let entity: PessoaEntity = {
            id: entry.id,
            name: entry.nome,
            area_id: entry.area.id,
        };
        
        database.areas[entity.id] = entity;
        return entry;
    }
    remove(id: number): boolean {
        if (id >= database.pessoas.length) return false;
        if (database.pessoas[id] == null) return false;
        database.pessoas[id] = null;
        return true;
    }
    getAll(): Pessoa[] {
        var pessoasArr: Pessoa[] = [];

        for(let i = 0; i < database.pessoas.length; i++) {
            var e = database.pessoas[i];
            if (!e) continue;

            var area = database.areas[e.area_id]!;

            pessoasArr.push({
                id: e.id,
                nome: e.name,
                area: {
                    id: area.id,
                    nome: area.name,
                },
            });
        }

        return pessoasArr;
    }
    getById(id: number): Pessoa | undefined {
        if (id >= database.pessoas.length) return;

        let res = database.pessoas[id];
        if (res == null) return;

        let area = database.areas[res.area_id]!;

        return {
            id: res.id,
            nome: res.name,
            area: {
                id: area.id,
                nome: area.name,
            }
        };
    }

}