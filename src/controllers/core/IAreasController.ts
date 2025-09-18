import { Request, Response } from 'express';
import { RegisterAreaBody } from '../../types/RegisterAreaBody';
import { Area } from '../../models/areasModel';

export interface IAreasController {
    
    registerArea(req: Request<{}, {}, RegisterAreaBody>, res: Response<Area>): void;
    getAllAreas(req: Request<{}, {}, {}>, res: Response<Area[]>): void;
    getByIdArea(req: Request<{id: number}, {}, {}>, res: Response<Area>): void;
    removeByIdArea(req: Request<{id: number}, {}, {}>, res: Response): void;

}