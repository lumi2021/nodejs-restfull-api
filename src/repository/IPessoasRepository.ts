import { Pessoa } from "../models/pessoasModel";

export interface IPessoasRepository {
    save(usuario: Pessoa): Pessoa;
    update(id: number, usuario: Pessoa): Pessoa | undefined;
    remove(id: number): boolean;

    getAll(): Pessoa[];
    getById(id: number): Pessoa | undefined;
}