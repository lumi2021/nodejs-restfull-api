import { Presenca } from "./PresencaModel";

export interface PresencaIntervalo {
    comeco: Date;
    fim: Date;
    lista: Presenca[];
}
