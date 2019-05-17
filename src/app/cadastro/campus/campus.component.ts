import { ConfirmationService } from 'primeng/api';
import { CadastroService } from './../cadastro.service';
import { Component, OnInit } from '@angular/core';
import { Campus } from 'src/app/core/model';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  campus = new Campus();
  listaCampus: Campus[];
  atualizando = false;

  filtro = { nome: '', instituicao: '' };

  constructor(private cadastroServ: CadastroService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.atualizarTabela();
  }

  atualizarTabela() {
    this.cadastroServ.recuperarCampus(this.filtro).then(campus => this.listaCampus = campus['content']);
  }

  salvar(atualizando: boolean) {
    if (atualizando) {
      this.cadastroServ.editarCampus(this.campus).then(() => this.atualizarTabela());
    } else {
      this.cadastroServ.adicionarCampus(this.campus).then(() => this.atualizarTabela());
    }
    this.campus = new Campus();
    this.atualizando = false;
  }

  editar(campus: Campus) {
    this.campus.id = campus.id;
    this.campus.instituicao = campus.instituicao;
    this.campus.nome = campus.nome;
    this.atualizando = true;
  }

  cancelarEdicao() {
    this.campus = new Campus();
    this.atualizando = false;
  }

  excluir(campus: Campus) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir?',
      accept: () => {
          this.cadastroServ.deletarCampus(campus).then(() => this.atualizarTabela());
          this.campus = new Campus();
          this.atualizando = false;
      }
    });
  }

}
