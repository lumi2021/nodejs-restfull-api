import { PresencaIntervalo } from "../models/PresencaIntervaloModel";
import { IAreasRepository } from "../repository/IAreasRepository";
import { IPessoasRepository } from "../repository/IPessoasRepository";
import { IPresencasRepository } from "../repository/IPresencasRepository";
import { RegisterError, RegisterErrorKind } from "../types/errors/RegisterError";
import { IPresencasService } from "./core/IPresencasService";

export class PresencasService implements IPresencasService {

    constructor(
        pessoasRepo: IPessoasRepository,
        areasRepo: IAreasRepository,
        presencasRepo: IPresencasRepository
    ) {
        this.pessoasRepository = pessoasRepo;
        this.areasRepository = areasRepo;
        this.presencasRepository = presencasRepo;
    }

    pessoasRepository: IPessoasRepository;
    areasRepository: IAreasRepository;
    presencasRepository: IPresencasRepository;

    registerPresenca(pessoaid: number, areaid: number): void {
        
        var pessoa = this.pessoasRepository.getById(pessoaid);
        var area = this.areasRepository.getById(areaid);
        
        if (!pessoa || !area) throw new RegisterError(RegisterErrorKind.ArgumentNotFound);

        this.presencasRepository.save({
            pessoa: pessoa,
            area: area,
            datetime: new Date()
        });

    }
    getPresenca(
        pessoa: number | undefined,
        area: number | undefined,
        beg: Date | undefined,
        end: Date | undefined
    ): PresencaIntervalo {

        let real_beg: Date;
        let real_end: Date;

        
        if (!beg && !end) {
            real_beg = new Date();
            real_end = new Date();
            real_beg.setDate(real_end.getDate() - 1);
        }
        else if (beg && end) {
            real_beg = new Date(beg);
            real_end = new Date(end);
        }
        else if (!beg && end) {
            real_end = new Date(end);
            real_beg = new Date(end);
            real_beg.setDate(real_end.getDate() - 1);
        }
        else if (beg && !end) {
            real_end = new Date();
            real_beg = new Date(beg);
        }


        let dateStart = new Date(real_beg!);
        let dateEnd = new Date(real_end!);

        let allData = this.presencasRepository.getRange(dateStart, dateEnd);
        if (pessoa) allData = allData.filter(e => e.pessoa.id == pessoa);
        if (area) allData = allData.filter(e => e.area.id == area);
        
        return {
            comeco: dateStart,
            fim: dateEnd,
            lista: allData
        }
    }
    
}
