import { SelectItem, ConfirmationService } from 'primeng/api';
import { CadastroService } from './../cadastro.service';
import { Curso, Campus } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso = new Curso();
  listaCurso: Curso[];
  listaCampus: Campus[];
  modalidades: SelectItem[];
  campusDrop: SelectItem[];
  atualizando = false;

  filtro = { nome: '', modalidade: '', campus: '' };

  constructor(private cadastroServ: CadastroService, private confirmationService: ConfirmationService) {
    this.modalidades = [
      {label: 'Integrado', value: 'INTEGRADO'},
      {label: 'Subsequente', value: 'SUBSEQUENTE'},
      {label: 'Graduação', value: 'GRADUACAO'},
      {label: 'Especialização', value: 'ESPECIALIZACAO'},
      {label: 'Mestrado', value: 'MESTRADO'},
      {label: 'Doutorado', value: 'DOUTORADO'}
    ];
    this.campusDrop = [];
  }

  ngOnInit() {
    this.atualizarTabela();
    this.cadastroServ.recuperarCampus({}).then(campus => {this.listaCampus = campus['content'];}).then(() => {
      for (const campus of this.listaCampus) {
        this.campusDrop.push({ label: campus.nome, value: campus });
      }
    });
  }

  atualizarTabela() {
    this.cadastroServ.recuperarCurso(this.filtro).then(curso => this.listaCurso = curso['content']);
  }

  salvar(atualizando: boolean) {
    if (atualizando) {
      this.cadastroServ.editarCurso(this.curso).then(() => this.atualizarTabela());
    } else {
      this.cadastroServ.adicionarCurso(this.curso).then(() => this.atualizarTabela());
    }
    this.curso = new Curso();
    this.atualizando = false;
  }

  editar(curso: Curso) {
    this.curso.id = curso.id;
    this.curso.campus = curso.campus;
    this.curso.modalidade = curso.modalidade;
    this.curso.nome = curso.nome;
    this.atualizando = true;
  }

  cancelarEdicao() {
    this.curso = new Curso();
    this.atualizando = false;
  }

  excluir(curso: Curso) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir?',
      accept: () => {
          this.cadastroServ.deletarCurso(curso).then(() => this.atualizarTabela());
          this.curso = new Curso();
          this.atualizando = false;
      }
    });
  }

}
