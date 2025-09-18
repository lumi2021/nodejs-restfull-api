import { Area } from "./areasModel";
import { Pessoa } from "./pessoasModel";

export interface Presenca {
    id?: number;
    pessoa: Pessoa;
    area: Area;
    datetime: Date;
}
