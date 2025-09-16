import { Pessoa } from "../../models/pessoasModel";

export interface PessoaEntity {
    id: number;
    name: string;
}

interface DatabaseType {
    pessoas: (PessoaEntity | null)[],
};
export const database: DatabaseType = {
    pessoas: [],
};
