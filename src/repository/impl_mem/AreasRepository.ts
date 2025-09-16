import { Area } from "../../models/areasModel";
import { IAreasRepository } from "../IAreasRepository";
import { AreaEntity, database } from "./memdb";

export class AreasRepository implements IAreasRepository {

    constructor() {}

    save(entry: Area): Area {
        var nextId = database.areas.length;
        entry.id = nextId;

        let entity: AreaEntity = {
            id: entry.id,
            name: entry.nome,
        };
        
        database.areas.push(entity);
        return entry;
    }
    update(entry: Area): Area | undefined {
        if (!entry.id) return;
        if (database.areas[entry.id] == null) return;

        let entity: AreaEntity = {
            id: entry.id,
            name: entry.nome,
        };
        
        database.areas[entity.id] = entity;
        return entry;
    }
    remove(id: number): boolean {
        if (database.areas[id] == null) return false;
        database.areas[id] = null;
        return true;
    }
    getAll(): Area[] {
        let areaArray: Area[] = [];
        for (var i = 0; i < database.areas.length; i++) {
            var e = database.areas[i];
            if (!e) continue;

            areaArray.push({
                id: e.id,
                nome: e.name,
            });
        }
        return areaArray;
    }
    getById(id: number): Area | undefined {
        let res = database.areas[id];
        if (res == null) return;
        return {
            id: res.id,
            nome: res.name
        };
    }

}