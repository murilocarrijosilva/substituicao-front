export class Campus {
    id: number;
    instituicao: string;
    nome: string;
    ativo: boolean;
}

export class Curso {
    id: number;
    nome: string;
    modalidade: string;
    ativo: boolean;
    campus = new Campus();
}

export class Disciplina {
    id: number;
    nome: string;
    ativo: boolean;
    cargaHoraria: string;
}

export class Servidor {
    id: number;
    nome: string;
    siape: string;
    categoria: string;
    funcao: string;
    email: string;
    autenticacao: string;
}

export class Turma {
    id: number;
    ano: number;
    ativo: boolean;
    curso = new Curso();
}

export class Matriz {
    id: number;
    ano: number;
    ativo: boolean;
    turma = new Turma();
    curso = new Curso();
}

export class MatrizDisciplina {
    id: number;
    matriz: Matriz;
    disciplina: Disciplina;
}
