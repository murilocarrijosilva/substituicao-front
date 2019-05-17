import { Router } from '@angular/router';
import { CadastroService } from './../cadastro.service';
import { Matriz, Turma } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})

export class MatrizComponent implements OnInit {

  matriz = new Matriz();
  listaMatriz: Matriz[];

  turmaDrop: SelectItem[];

  atualizando = false;

  filtro = { };

  constructor(private cadastroServ: CadastroService, private confirmationService: ConfirmationService, private router: Router) {
    this.turmaDrop = [];
  }

  ngOnInit() {
    this.atualizarTabela();
    this.cadastroServ.recuperarTurma({}).then(turma => {
      for (const t of turma['content']) {
        this.turmaDrop.push({ label: `${t.curso.nome} (${t.ano})`, value: t });
      }
    });
  }

  salvar(atualizando: boolean) {
    this.matriz.curso = this.matriz.turma.curso;
    if (atualizando) {
      this.cadastroServ.editarMatriz(this.matriz).then(() => this.atualizarTabela());
    } else {
      this.cadastroServ.adicionarMatriz(this.matriz).then(() => this.atualizarTabela());
    }
    this.matriz = new Matriz();
    this.atualizando = false;
  }

  atualizarTabela() {
    this.cadastroServ.recuperarMatriz(this.filtro).then(matriz => this.listaMatriz = matriz['content']);
  }

  editar(matriz: Matriz) {
    this.matriz.id = matriz.id;
    this.matriz.ano = matriz.ano;
    this.matriz.curso = matriz.curso;
    this.matriz.turma = matriz.turma;
    this.atualizando = true;
  }

  cancelarEdicao() {
    this.matriz = new Matriz();
    this.atualizando = false;
  }

  excluir(matriz: Matriz) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir?',
      accept: () => {
          this.cadastroServ.deletarMatriz(matriz).then(() => this.atualizarTabela());
          this.matriz = new Matriz();
          this.atualizando = false;
      }
    });
  }

  montar(matriz: Matriz) {
    this.router.navigate(['/principal', {outlets: {principal: 'cadastro/matriz/disciplinas'}}], { queryParams: { id: matriz.id } });
  }

}