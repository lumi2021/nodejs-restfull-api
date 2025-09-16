import { Area } from "../models/areasModel";

export interface IAreasRepository {
    save(entry: Area): Area;
    update(entry: Area): Area | undefined;
    remove(id: number): boolean;

    getAll(): Area[];
    getById(id: number): Area | undefined;
}