import { SelectItem, ConfirmationService } from 'primeng/api';
import { CadastroService } from './../cadastro.service';
import { Matriz, MatrizDisciplina } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matriz-disciplina',
  templateUrl: './matriz-disciplina.component.html',
  styleUrls: ['./matriz-disciplina.component.css']
})
export class MatrizDisciplinaComponent implements OnInit {

  id: number;
  matriz = new Matriz();
  matrizDisciplina = new MatrizDisciplina();
  listaMatrizDisciplina: MatrizDisciplina[];
  disciplinaDrop: SelectItem[];
  atualizando = false;

  constructor(private cadastroServ: CadastroService, private route: ActivatedRoute, private confirmationService: ConfirmationService) {
    this.disciplinaDrop = [];
  }

  ngOnInit() {
    this.atualizarTabela();
    this.route.queryParams.forEach(param => {
      this.id = param.id;
    });
    this.cadastroServ.recuperarMatriz({id: this.id}).then(matriz => {
      this.matriz = matriz as Matriz;
    });
    this.cadastroServ.recuperarDisciplina({}).then(disciplina => {
      for (const d of disciplina['content']) {
        this.disciplinaDrop.push({label: d.nome, value: d});
      }
    });
  }

  salvar(atualizando: boolean) {
    this.matrizDisciplina.matriz = this.matriz;
    if (atualizando) {
      this.cadastroServ.editarMatrizDisciplina(this.matrizDisciplina).then(() => this.atualizarTabela());
    } else {
      this.cadastroServ.adicionarMatrizDisciplina(this.matrizDisciplina).then(() => this.atualizarTabela());
    }
    this.matrizDisciplina = new MatrizDisciplina();
    this.atualizando = false;
  }

  atualizarTabela() {
    this.cadastroServ.recuperarMatrizDisciplina({}).then(matrizDisciplina => {
      this.listaMatrizDisciplina = matrizDisciplina['content'];
    });
  }

  editar(matrizDisciplina: MatrizDisciplina) {
    this.matrizDisciplina.id = matrizDisciplina.id;
    this.matrizDisciplina.matriz = matrizDisciplina.matriz;
    this.matrizDisciplina.disciplina = matrizDisciplina.disciplina;
    this.atualizando = true;
  }

  cancelarEdicao() {
    this.matrizDisciplina = new MatrizDisciplina();
    this.atualizando = false;
  }

  excluir(matrizDisciplina: MatrizDisciplina) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir?',
      accept: () => {
          this.cadastroServ.deletarMatrizDisciplina(matrizDisciplina).then(() => this.atualizarTabela());
          this.matrizDisciplina = new MatrizDisciplina();
          this.atualizando = false;
      }
    });
  }

}
