import { Area } from "../../models/areasModel";
import { Presenca } from "../../models/PresencaModel";
import { RegisterError, RegisterErrorKind } from "../../types/errors/RegisterError";
import { RepositoryError, RepositoryErrorKind } from "../../types/errors/RepositoryError";
import { IPresencasRepository } from "../IPresencasRepository";
import { database, PresencaEntity } from "./memdb";

export class PresencasRepository implements IPresencasRepository {

    constructor() {}

    save(entry: Presenca): Presenca {

        // Checando se dentro dos limites do banco
        if (!entry.pessoa.id || entry.pessoa.id < 1 || entry.pessoa.id >= database.pessoas.length
        || !entry.area.id || entry.area.id < 1 || entry.area.id >= database.areas.length)
            throw new RegisterError(RegisterErrorKind.ArgumentNotFound);
        
        var nextId = database.presencas.length + 1;
        entry.id = nextId;

        let entity: PresencaEntity = {
            id: entry.id,
            area_id: entry.area.id,
            pessoa_id: entry.pessoa.id,
            date_time: entry.datetime,
        };
        
        database.presencas.push(entity);
        return entry;
    }
    update(entry: Presenca): Presenca | undefined {

        // Checando se alguma chave é nula
        if (!entry.id
        || !entry.area || !entry.area.id
        || !entry.pessoa || !entry.pessoa.id)
            throw new RepositoryError(RepositoryErrorKind.UndefinedData);

        var entry_index = entry.id - 1;
        var entry_area_index = entry.area.id - 1;
        var entry_pessoa_index = entry.pessoa.id - 1;

        // checando se as chaves estão dentro dos limites do banco de dados
        if (entry_index < 0 || entry_index > database.areas.length
        || entry_area_index < 0 || entry_area_index > database.areas.length
        || entry_pessoa_index < 0 || entry_pessoa_index > database.pessoas.length) return;
        
        // checando se alguma chave aponta para uma entrada removida
        if (!database.presencas[entry_index]
        || !database.areas[entry_area_index]
        || !database.pessoas[entry_pessoa_index]) return;

        let entity: PresencaEntity = {
            id: entry.id,
            area_id: entry.area.id,
            pessoa_id: entry.pessoa.id,
            date_time: entry.datetime,
        };
        
        database.presencas[entry_index] = entity;
        return entry;
    }
    remove(id: number): boolean {
        let entry_index = id - 1;

        // checando se as chaves estão dentro dos limites do banco de dados
        if (entry_index < 0 || entry_index > database.presencas.length) return false;

        if (database.presencas[entry_index] == null) return false;

        database.presencas[entry_index] = null;
        return true;
    }
    getRange(start: Date, end: Date): Presenca[] {
        let preArr: Presenca[] = [];
        for (var i = 0; i < database.presencas.length; i++) {

            var e = this.loadPresencaModelById(i);
            if (!e) continue;
            
            if (e.datetime < start) continue;
            if (e.datetime > end) break;

            preArr.push(e);

        }
        return preArr;
    }
    getById(id: number): Presenca | undefined {

        // Checando se dentro dos limites do banco
        if (id < 1 || id > database.areas.length) return;
        let index = id - 1;

        return this.loadPresencaModelById(id);
    }


    loadPresencaModelById(index: number): Presenca | undefined {

        var e = database.presencas[index-1];
        if (!e) return;

        var pessoa = database.pessoas[e.pessoa_id-1];
        var area = database.areas[e.area_id-1];
        if (!pessoa || !area) return;

        return {
            id: e.id,
            datetime: e.date_time,

            pessoa: {
                id: pessoa.id,
                nome: pessoa.nome,
                funcao: pessoa.funcao,
            },

            area: {
                id: area.id,
                nome: area.nome,
                local: area.local,
                tipo: area.tipo,
            },
        };

    }
}