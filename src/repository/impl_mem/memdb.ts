import { Pessoa } from "../../models/pessoasModel";

export interface PessoaEntity {
    id: number;
    name: string;
    area_id: number;
}
export interface AreaEntity {
    id: number;
    name: string;
}

interface DatabaseType {
    pessoas: (PessoaEntity | null)[],
    areas: (AreaEntity | null)[],
};
export const database: DatabaseType = {
    pessoas: [],
    areas: [],
};
