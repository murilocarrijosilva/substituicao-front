import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Cadastrar',
        items: [
          { label: 'Servidor', routerLink: ['/principal', {outlets: {principal: 'cadastro/servidor'}}] },
          { label: 'Campus', routerLink: ['/principal', {outlets: {principal: 'cadastro/campus'}}] },
          { label: 'Curso', routerLink: ['/principal', {outlets: {principal: 'cadastro/curso'}}] },
          { label: 'Disciplina', routerLink: ['/principal', {outlets: {principal: 'cadastro/disciplina'}}] },
          { label: 'Turma', routerLink: ['/principal', {outlets: {principal: 'cadastro/turma'}}] }
        ]
      },
      {
        label: 'Consultar',
        items: [
          { label: 'Servidor', routerLink: 'consultar/servidor' },
          { label: 'Campus', routerLink: 'consultar/campus' },
          { label: 'Curso', routerLink: 'consultar/curso' },
          { label: 'Disciplina', routerLink: 'consultar/disciplina' },
          { label: 'Turma', routerLink: 'consultar/turma' }
        ]
      },
      {
        label: 'Relatórios',
        items: [
          { label: 'Servidor' },
          { label: 'Campus' },
          { label: 'Curso' },
          { label: 'Disciplina' },
          { label: 'Turma' }
        ]
      },
      {
        label: 'Montar Matriz', routerLink: ['/principal', {outlets: {principal: 'cadastro/matriz'}}]
      },
      {
        label: 'Definir Quadro Docente', routerLink: ['/principal', {outlets: {principal: 'cadastro/quadroDocente'}}]
      }
    ];
  }

}
