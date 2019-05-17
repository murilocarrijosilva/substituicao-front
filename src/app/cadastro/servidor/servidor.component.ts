import { CadastroService } from './../cadastro.service';
import { Servidor } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.css']
})
export class ServidorComponent implements OnInit {

  servidor = new Servidor();
  listaServidor: Servidor[];
  categorias: SelectItem[];
  atualizando = false;

  filtro = { nome: '', siape: '', categoria: '', email: '' };

  constructor(private cadastroServ: CadastroService, private confirmationService: ConfirmationService) {
    this.categorias = [
      {label: 'Docente', value: 'DOCENTE'},
      {label: 'Estagiário', value: 'ESTAGIARIO'},
      {label: 'Técnico Administrativo', value: 'TECNICO_ADMINISTRATIVO'},
    ]
  }

  ngOnInit() {
    this.atualizarTabela();
  }

  atualizarTabela() {
    this.cadastroServ.recuperarServidor(this.filtro).then(servidor => this.listaServidor = servidor['content']);
  }

  salvar(atualizando: boolean) {
    if (atualizando) {
      this.cadastroServ.editarServidor(this.servidor).then(() => this.atualizarTabela());
    } else {
      this.cadastroServ.adicionarServidor(this.servidor).then(() => this.atualizarTabela());
    }
    this.servidor = new Servidor();
    this.atualizando = false;
  }

  editar(servidor: Servidor) {
    this.servidor.autenticacao = servidor.autenticacao;
    this.servidor.categoria = servidor.categoria;
    this.servidor.email = servidor.email;
    this.servidor.funcao = servidor.funcao;
    this.servidor.id = servidor.id;
    this.servidor.nome = servidor.nome;
    this.servidor.siape = servidor.siape;
    this.atualizando = true;
  }

  cancelarEdicao() {
    this.servidor = new Servidor();
    this.atualizando = false;
  }

  excluir(servidor: Servidor) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir?',
      accept: () => {
          this.cadastroServ.deletarServidor(servidor).then(() => this.atualizarTabela());
          this.servidor = new Servidor();
          this.atualizando = false;
      }
    });
  }

}
