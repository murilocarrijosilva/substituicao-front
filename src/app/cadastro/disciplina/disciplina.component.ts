import { ConfirmationService } from 'primeng/api';
import { CadastroService } from './../cadastro.service';
import { Disciplina } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  disciplina = new Disciplina();
  listaDisciplina: Disciplina[];
  atualizando = false;

  filtro = { nome: '', cargaHoraria: '' };

  constructor(private cadastroServ: CadastroService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.atualizarTabela();
  }

  atualizarTabela() {
    this.cadastroServ.recuperarDisciplina(this.filtro).then(disciplina => this.listaDisciplina = disciplina['content']);
  }

  salvar(atualizando: boolean) {
    if (atualizando) {
      this.cadastroServ.editarDisciplina(this.disciplina).then(() => this.atualizarTabela());
    } else {
      this.cadastroServ.adicionarDisciplina(this.disciplina).then(() => this.atualizarTabela());
    }
    this.disciplina = new Disciplina();
    this.atualizando = false;
  }

  editar(disciplina: Disciplina) {
    this.disciplina.cargaHoraria = disciplina.cargaHoraria;
    this.disciplina.id = disciplina.id;
    this.disciplina.nome = disciplina.nome;
    this.atualizando = true;
  }

  cancelarEdicao() {
    this.disciplina = new Disciplina();
    this.atualizando = false;
  }

  excluir(disciplina: Disciplina) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir?',
      accept: () => {
          this.cadastroServ.deletarDisciplina(disciplina).then(() => this.atualizarTabela());
          this.disciplina = new Disciplina();
          this.atualizando = false;
      }
    });
  }

}
