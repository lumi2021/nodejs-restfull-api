//
// Injeção de dependência improvisada
//

import { IPessoasController } from "./controllers/core/IPessoasController";
import { PessoasController } from "./controllers/PessoasController";
import { PessoasRepository } from "./repository/impl_mem/PessoasRepository";
import { IPessoasRepository } from "./repository/IPessoasRepository";
import { IPessoasService } from "./services/core/IPessoasService";
import { PessoasService } from "./services/PessoasService";

var pessoasRepository: IPessoasRepository;
var pessoasService: IPessoasService;
var pessoasController: IPessoasController;

export interface Controllers {
    pessoas: IPessoasController,
}
export function setupDependencyInjection(): Controllers {
    pessoasRepository = new PessoasRepository();
    pessoasService = new PessoasService(pessoasRepository);
    pessoasController = new PessoasController(pessoasService);

    return {
        pessoas: pessoasController,
    };
}