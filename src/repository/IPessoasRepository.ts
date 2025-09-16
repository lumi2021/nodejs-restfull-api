import { Pessoa } from "../models/pessoasModel";

export interface IPessoasRepository {
    save(entry: Pessoa): Pessoa;
    update(entry: Pessoa): Pessoa | undefined;
    remove(id: number): boolean;

    getAll(): Pessoa[];
    getById(id: number): Pessoa | undefined;
}