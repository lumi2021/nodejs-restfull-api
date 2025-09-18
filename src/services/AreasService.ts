import { Area } from "../models/areasModel";
import { IAreasRepository } from "../repository/IAreasRepository";
import { RegisterAreaBody } from "../types/RegisterAreaBody";
import { IAreasService } from "./core/IAreasService";

export class AreasService implements IAreasService {

    constructor(areasRepo: IAreasRepository) {
        this.areasRepository = areasRepo;
    }
    
    areasRepository: IAreasRepository;

    registerNewArea(area: RegisterAreaBody): Area {
        let areaModel: Area = {
            nome: area.nome,
            local: area.local,
            tipo: area.tipo,
        };

        return this.areasRepository.save(areaModel);
    }

    getAllAreas(): Area[] {
        let areaArr = this.areasRepository.getAll();
        return areaArr;
    }

    getByIdArea(id: number): Area | undefined {
        return this.areasRepository.getById(id);
    }

    removeByIdArea(id: number): boolean {
        return this.areasRepository.remove(id);
    }
}
