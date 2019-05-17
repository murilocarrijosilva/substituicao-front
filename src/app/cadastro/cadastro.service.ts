import { AuthService } from './../login/auth.service';
import { Servidor, Campus, Curso, Disciplina, Turma, Matriz, MatrizDisciplina } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {

  lancamentosCampus = 'http://localhost:4200/api/campus';
  lancamentosCurso = 'http://localhost:4200/api/cursos';
  lancamentosDisciplina = 'http://localhost:4200/api/disciplinas';
  lancamentosServidor = 'http://localhost:4200/api/servidores';
  lancamentosTurma = 'http://localhost:4200/api/turmas';
  lancamentosMatriz = 'http://localhost:4200/api/matrizes';
  lancamentosMatrizDisciplina = 'http://localhost:4200/api/matrizesDisciplinas';

  constructor(private http: HttpClient, private auth: AuthService) { }

  // ADICIONAR
  adicionarCampus(campus: Campus) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.post(this.lancamentosCampus, JSON.stringify(campus), options)
      .toPromise();
  }

  adicionarCurso(curso: Curso) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.post(this.lancamentosCurso, JSON.stringify(curso), options)
      .toPromise();
  }

  adicionarDisciplina(disciplina: Disciplina) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.post(this.lancamentosDisciplina, JSON.stringify(disciplina), options)
      .toPromise();
  }

  adicionarServidor(servidor: Servidor) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.post(this.lancamentosServidor, JSON.stringify(servidor), options)
      .toPromise();
  }

  adicionarTurma(turma: Turma) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.post(this.lancamentosTurma, JSON.stringify(turma), options)
      .toPromise();
  }

  adicionarMatriz(matriz: Matriz) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.post(this.lancamentosMatriz, JSON.stringify(matriz), options)
      .toPromise();
  }

  adicionarMatrizDisciplina(matrizDisciplina: MatrizDisciplina) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.post(this.lancamentosMatrizDisciplina, JSON.stringify(matrizDisciplina), options)
      .toPromise();
  }

  // RECUPERAR
  recuperarCampus(filtro: any) {
    const params = new HttpParams();
    const options = { headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`), params: filtro };

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.instituicao) {
      params.set('instituicao', filtro.instituicao);
    }

    return this.http.get(this.lancamentosCampus, options)
      .toPromise();
  }

  recuperarCurso(filtro: any) {
    const params = new HttpParams();
    const options = { headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`), params: filtro };

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.modalidade) {
      params.set('modalidade', filtro.modalidade);
    }

    if (filtro.campus) {
      params.set('campus', filtro.campus);
    }

    return this.http.get(this.lancamentosCurso, options)
      .toPromise();
  }

  recuperarDisciplina(filtro: any) {
    const params = new HttpParams();
    const options = { headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`), params: filtro };

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.cargahoraria) {
      params.set('cargahoraria', filtro.cargahoraria);
    }

    return this.http.get(this.lancamentosDisciplina, options)
      .toPromise();
  }

  recuperarServidor(filtro: any) {
    const params = new HttpParams();
    const options = { headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`), params: filtro };

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.siape) {
      params.set('siape', filtro.siape);
    }

    if (filtro.categoria) {
      params.set('categoria', filtro.categoria);
    }

    if (filtro.email) {
      params.set('email', filtro.email);
    }

    return this.http.get(this.lancamentosServidor, options)
      .toPromise();
  }

  recuperarTurma(filtro: any) {
    const params = new HttpParams();
    const options = { headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`), params: filtro };

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.curso) {
      params.set('curso', filtro.curso);
    }

    return this.http.get(this.lancamentosTurma, options)
      .toPromise();
  }

  recuperarMatriz(filtro: any) {
    const params = new HttpParams();
    const options = { headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`), params: filtro };

    if (filtro.id) {
      return this.http.get(this.lancamentosMatriz + `/${filtro.id}`, options)
      .toPromise();
    }

    if (filtro.ano) {
      params.set('ano', filtro.ano);
    }

    if (filtro.turma) {
      params.set('turma', filtro.turma);
    }

    return this.http.get(this.lancamentosMatriz, options)
      .toPromise();
  }

  recuperarMatrizDisciplina(filtro: any) {
    const params = new HttpParams();
    const options = { headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`), params: filtro };

    if (filtro.matriz) {
      params.set('matriz', filtro.matriz);
    }

    return this.http.get(this.lancamentosMatrizDisciplina, options)
      .toPromise();
  }

  // EDITAR
  editarCampus(campus: Campus) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.put(this.lancamentosCampus + `/${campus.id}`, JSON.stringify(campus), options)
      .toPromise();
  }

  editarCurso(curso: Curso) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.put(this.lancamentosCurso + `/${curso.id}`, JSON.stringify(curso), options)
      .toPromise();
  }

  editarDisciplina(disciplina: Disciplina) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.put(this.lancamentosDisciplina + `/${disciplina.id}`, JSON.stringify(disciplina), options)
      .toPromise();
  }

  editarServidor(servidor: Servidor) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.put(this.lancamentosServidor + `/${servidor.id}`, JSON.stringify(servidor), options)
      .toPromise();
  }

  editarTurma(turma: Turma) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.put(this.lancamentosTurma + `/${turma.id}`, JSON.stringify(turma), options)
      .toPromise();
  }

  editarMatriz(matriz: Matriz) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.put(this.lancamentosMatriz + `/${matriz.id}`, JSON.stringify(matriz), options)
      .toPromise();
  }

  editarMatrizDisciplina(matrizDisciplina: MatrizDisciplina) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };

    return this.http.put(this.lancamentosMatrizDisciplina + `/${matrizDisciplina.id}`, JSON.stringify(matrizDisciplina), options)
      .toPromise();
  }

  // REMOVER
  deletarCampus(campus: Campus) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };
    return this.http.delete(this.lancamentosCampus + `/${campus.id}`, options)
      .toPromise();
  }

  deletarCurso(curso: Curso) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };
    return this.http.delete(this.lancamentosCurso + `/${curso.id}`, options)
      .toPromise();
  }

  deletarDisciplina(disciplina: Disciplina) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };
    return this.http.delete(this.lancamentosDisciplina + `/${disciplina.id}`, options)
      .toPromise();
  }

  deletarServidor(servidor: Servidor) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };
    return this.http.delete(this.lancamentosServidor + `/${servidor.id}`, options)
      .toPromise();
  }

  deletarTurma(turma: Turma) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };
    return this.http.delete(this.lancamentosTurma + `/${turma.id}`, options)
      .toPromise();
  }

  deletarMatriz(matriz: Matriz) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };
    return this.http.delete(this.lancamentosMatriz + `/${matriz.id}`, options)
      .toPromise();
  }

  deletarMatrizDisciplina(matrizDisciplina: MatrizDisciplina) {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                      .set('Authorization', `Bearer ${localStorage.getItem('token')}`) };
    return this.http.delete(this.lancamentosMatrizDisciplina + `/${matrizDisciplina.id}`, options)
      .toPromise();
  }

}
