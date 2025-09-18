import { AreasController } from "./controllers/AreasController";
import { IAreasController } from "./controllers/core/IAreasController";
import { IPessoasController } from "./controllers/core/IPessoasController";
import { IPresencasController } from "./controllers/core/IPresencasController";
import { PessoasController } from "./controllers/PessoasController";
import { PresencasController } from "./controllers/PresencasController";
import { IAreasRepository } from "./repository/IAreasRepository";
import { AreasRepository } from "./repository/impl_mem/AreasRepository";
import { PessoasRepository } from "./repository/impl_mem/PessoasRepository";
import { PresencasRepository } from "./repository/impl_mem/PresencasRepository";
import { IPessoasRepository } from "./repository/IPessoasRepository";
import { IPresencasRepository } from "./repository/IPresencasRepository";
import { AreasService } from "./services/AreasService";
import { IAreasService } from "./services/core/IAreasService";
import { IPessoasService } from "./services/core/IPessoasService";
import { IPresencasService } from "./services/core/IPresencasService";
import { PessoasService } from "./services/PessoasService";
import { PresencasService } from "./services/PresencasService";

//
// Injeção de dependência improvisada
//

var pessoasRepository: IPessoasRepository;
var areasRepository: IAreasRepository;
var presencasRepository: IPresencasRepository;

var pessoasService: IPessoasService;
var areasService: IAreasService;
var presencasService: IPresencasService;

var pessoasController: IPessoasController;
var areasController: IAreasController;
var presencasController: IPresencasController;

export interface Controllers {
    pessoas: IPessoasController,
    areas: IAreasController,
    presencas: IPresencasController,
}
export function setupDependencyInjection(): Controllers {
    pessoasRepository = new PessoasRepository();
    areasRepository = new AreasRepository();
    presencasRepository = new PresencasRepository();

    pessoasService = new PessoasService(pessoasRepository, areasRepository);
    areasService = new AreasService(areasRepository);
    presencasService = new PresencasService(pessoasRepository, areasRepository, presencasRepository);

    pessoasController = new PessoasController(pessoasService);
    areasController = new AreasController(areasService);
    presencasController = new PresencasController(presencasService);

    return {
        pessoas: pessoasController,
        areas: areasController,
        presencas: presencasController
    };
}