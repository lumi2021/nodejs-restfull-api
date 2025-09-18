import { Request, Response } from 'express';
import { PresencaIntervalo } from '../../models/PresencaIntervaloModel';

export interface RegisterPresencaParams {
    pessoaId: number;
    areaId: number;
}
export interface GetPresencasQuery {
    pessoaid: number;
    areaid: number;

    ibeg: Date;
    iend: Date;
}

export interface IPresencasController {
    
    registerPresenca(req: Request<RegisterPresencaParams, {}, {}>, res: Response): void;
    getPresencas(req: Request<{}, {}, {}, GetPresencasQuery>, res: Response<PresencaIntervalo>): void;

}