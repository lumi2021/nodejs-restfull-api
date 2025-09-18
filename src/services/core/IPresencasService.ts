import { PresencaIntervalo } from "../../models/PresencaIntervaloModel";

export interface IPresencasService {

    registerPresenca(pessoaid: number, areaid: number): void;
    getPresenca(
        pessoa: number | undefined,
        area: number | undefined,
        beg: Date | undefined,
        end: Date | undefined
    ): PresencaIntervalo;

}
