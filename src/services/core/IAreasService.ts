import { Area } from "../../models/areasModel";
import { RegisterAreaBody } from "../../types/RegisterAreaBody";

export interface IAreasService {

    registerNewArea(pessoa: RegisterAreaBody): Area;
    getAllAreas(): Area[];
    getByIdArea(id: number): Area | undefined;

}
