import { ConfirmationService, SelectItem } from 'primeng/api';
import { CadastroService } from './../cadastro.service';
import { Turma, Curso } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  turma = new Turma();
  listaTurma: Turma[];
  listaCurso: Curso[];
  cursoDrop: SelectItem[];
  atualizando = false;

  filtro = { nome: '', cargahoraria: '' };

  constructor(private cadastroServ: CadastroService, private confirmationService: ConfirmationService) {
    this.cursoDrop = [];
  }

  ngOnInit() {
    this.atualizarTabela();
    this.cadastroServ.recuperarCurso({}).then(curso => { this.listaCurso = curso['content']; }).then(() => {
      for (const curso of this.listaCurso) {
        this.cursoDrop.push({ label: curso.nome, value: curso });
      }
    });
  }

  atualizarTabela() {
    this.cadastroServ.recuperarTurma(this.filtro).then(turma => this.listaTurma = turma['content']);
  }

  salvar(atualizando: boolean) {
    if (atualizando) {
      this.cadastroServ.editarTurma(this.turma).then(() => this.atualizarTabela());
    } else {
      this.cadastroServ.adicionarTurma(this.turma).then(() => this.atualizarTabela());
    }
    this.turma = new Turma();
    this.atualizando = false;
  }

  editar(turma: Turma) {
    this.turma.ano = turma.ano;
    this.turma.curso = turma.curso;
    this.turma.id = turma.id;
    this.atualizando = true;
  }

  cancelarEdicao() {
    this.turma = new Turma();
    this.atualizando = false;
  }

  excluir(turma: Turma) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir?',
      accept: () => {
          this.cadastroServ.deletarTurma(turma).then(() => this.atualizarTabela());
          this.turma = new Turma();
          this.atualizando = false;
      }
    });
  }

}
