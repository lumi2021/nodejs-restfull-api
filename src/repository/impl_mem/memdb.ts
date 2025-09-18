import { Pessoa } from "../../models/pessoasModel";

export interface PessoaEntity {
    id: number;
    nome: string;
    funcao: string;
}
export interface AreaEntity {
    id: number;
    nome: string;
    tipo: string;
    local: string;
}
export interface PresencaEntity {
    id: number;
    pessoa_id: number;
    area_id: number;
    date_time: Date;
}

interface DatabaseType {
    pessoas: (PessoaEntity | null)[],
    areas: (AreaEntity | null)[],
    presencas: (PresencaEntity | null)[],
};
export const database: DatabaseType = {
    
pessoas: [
    { id: 1,  nome: "Carlos Pinto",       funcao: "Engenheiro de Produção"},
    { id: 2,  nome: "Maria Souza",        funcao: "Operadora de Máquinas"},
    null,
    { id: 4,  nome: "Carlos Oliveira",    funcao: "Técnico de Manutenção"},
    { id: 5,  nome: "Paula Fernandes",    funcao: "Inspetora de Qualidade"},
    { id: 6,  nome: "Ana Lima",           funcao: "Supervisora de Turno"},
    { id: 7,  nome: "João Silva",         funcao: "Estagiário de Produção"},
    null,
    { id: 9,  nome: "Fernanda Costa",     funcao: "Coordenadora"},
    { id: 10, nome: "Ricardo Alves",      funcao: "Almoxarife"},
    { id: 11, nome: "Juliana Martins",    funcao: "Operadora de Máquinas"},
    { id: 12, nome: "Pedro Santos",       funcao: "Eletricista"},
    null,
    { id: 14, nome: "Luciana Ribeiro",    funcao: "Soldadora"},
    { id: 15, nome: "Marcelo Dias",       funcao: "Técnico de Segurança"},
],

areas: [
    { id: 1,  nome: "Linha de Produção", tipo: "Operacional",  local: "Galpão 1" },
    { id: 2,  nome: "Almoxarifado",      tipo: "Logística",    local: "Galpão 2" },
    null,
    { id: 4,  nome: "Qualidade",         tipo: "Controle",     local: "Prédio Administrativo" },
    { id: 5,  nome: "Manutenção",        tipo: "Suporte",      local: "Galpão 3" },
    { id: 6,  nome: "Segurança",         tipo: "Segurança",    local: "Portaria" },
    null,
],

presencas: [
    { id: 1,  pessoa_id: 1,  area_id: 1, date_time: new Date("2025-09-15T08:00:00") },
    { id: 2,  pessoa_id: 2,  area_id: 1, date_time: new Date("2025-09-15T08:05:00") },
    { id: 3,  pessoa_id: 4,  area_id: 2, date_time: new Date("2025-09-15T08:30:00") },
    { id: 4,  pessoa_id: 5,  area_id: 4, date_time: new Date("2025-09-15T09:00:00") },
    { id: 5,  pessoa_id: 6,  area_id: 1, date_time: new Date("2025-09-15T09:15:00") },
    { id: 6,  pessoa_id: 7,  area_id: 3, date_time: new Date("2025-09-15T09:30:00") },
    { id: 7,  pessoa_id: 9,  area_id: 4, date_time: new Date("2025-09-15T10:00:00") },
    { id: 8,  pessoa_id: 10, area_id: 2, date_time: new Date("2025-09-15T10:15:00") },
    { id: 9,  pessoa_id: 11, area_id: 1, date_time: new Date("2025-09-15T10:30:00") },
    { id: 10, pessoa_id: 12, area_id: 3, date_time: new Date("2025-09-15T11:00:00") },
    { id: 11, pessoa_id: 14, area_id: 1, date_time: new Date("2025-09-15T11:30:00") },
    { id: 12, pessoa_id: 15, area_id: 6, date_time: new Date("2025-09-15T12:00:00") },

    { id: 13, pessoa_id: 1,  area_id: 1, date_time: new Date("2025-09-16T08:00:00") },
    { id: 14, pessoa_id: 2,  area_id: 1, date_time: new Date("2025-09-16T08:05:00") },
    { id: 15, pessoa_id: 4,  area_id: 5, date_time: new Date("2025-09-16T08:30:00") },
    { id: 16, pessoa_id: 5,  area_id: 4, date_time: new Date("2025-09-16T09:00:00") },
    { id: 17, pessoa_id: 6,  area_id: 1, date_time: new Date("2025-09-16T09:15:00") },
    { id: 18, pessoa_id: 7,  area_id: 3, date_time: new Date("2025-09-16T09:30:00") },
    { id: 19, pessoa_id: 9,  area_id: 4, date_time: new Date("2025-09-16T10:00:00") },
    { id: 20, pessoa_id: 10, area_id: 2, date_time: new Date("2025-09-16T10:15:00") },
    { id: 21, pessoa_id: 11, area_id: 1, date_time: new Date("2025-09-16T10:30:00") },
    { id: 22, pessoa_id: 12, area_id: 3, date_time: new Date("2025-09-16T11:00:00") },
    { id: 23, pessoa_id: 14, area_id: 1, date_time: new Date("2025-09-16T11:30:00") },
    { id: 24, pessoa_id: 15, area_id: 6, date_time: new Date("2025-09-16T12:00:00") },
],

};
