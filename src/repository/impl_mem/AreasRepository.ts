import { Area } from "../../models/areasModel";
import { RepositoryError, RepositoryErrorKind } from "../../types/errors/RepositoryError";
import { IAreasRepository } from "../IAreasRepository";
import { AreaEntity, database } from "./memdb";

export class AreasRepository implements IAreasRepository {

    constructor() {}

    save(entry: Area): Area {

        // Checagem de conflito
        if (database.areas.find(e => e?.nome == entry.nome))
            throw new RepositoryError(RepositoryErrorKind.Conflict);
        

        var nextId = database.areas.length + 1;
        entry.id = nextId;

        let entity: AreaEntity = {
            id: entry.id,
            nome: entry.nome,
            tipo: entry.tipo,
            local: entry.local,
        };
        
        database.areas.push(entity);
        return entry;
    }
    update(entry: Area): Area | undefined {

        // Checando se alguma chave é nula
        if (!entry.id) throw new RepositoryError(RepositoryErrorKind.UndefinedData);
        var entry_index = entry.id - 1;

        // checando se as chaves estão dentro dos limites do banco de dados
        if (entry_index < 0 || entry_index > database.areas.length) return;
        
        // checando se alguma chave aponta para uma entrada removida
        if (!database.areas[entry_index]) return;

        let entity: AreaEntity = {
            id: entry.id,
            nome: entry.nome,
            local: entry.local,
            tipo: entry.tipo,
        };
        
        database.areas[entry_index] = entity;
        return entry;
    }
    remove(id: number): boolean {
        let entry_index = id - 1;

        // checando se as chaves estão dentro dos limites do banco de dados
        if (entry_index < 0 || entry_index > database.areas.length) return false;

        if (database.areas[entry_index] == null) return false;

        database.areas[entry_index] = null;
        return true;
    }
    getAll(): Area[] {
        let areaArray: Area[] = [];
        for (var i = 0; i < database.areas.length; i++) {

            var e = database.areas[i];
            if (!e) continue;

            areaArray.push({
                id: e.id,
                nome: e.nome,
                local: e.local,
                tipo: e.tipo,
            });

        }
        return areaArray;
    }
    getById(id: number): Area | undefined {
        // Checando se dentro dos limites do banco
        if (id < 1 || id > database.areas.length) return;
        let index = id - 1;

        let res = database.areas[index];
        if (res == null) return;
        
        return {
            id: res.id,
            nome: res.nome,
            local: res.local,
            tipo: res.tipo,
        };
    }

}