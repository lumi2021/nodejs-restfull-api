import { Presenca } from "../models/PresencaModel";

export interface IPresencasRepository {
    save(entry: Presenca): Presenca;
    update(entry: Presenca): Presenca | undefined;
    remove(id: number): boolean;

    getRange(start: Date, end: Date): Presenca[];
    getById(id: number): Presenca | undefined;
}