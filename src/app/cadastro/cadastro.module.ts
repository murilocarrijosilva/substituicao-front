import { AuthService } from './../login/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServidorComponent } from './servidor/servidor.component';
import { CampusComponent } from './campus/campus.component';
import { CursoComponent } from './curso/curso.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { TurmaComponent } from './turma/turma.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MatrizComponent } from './matriz/matriz.component';
import { MatrizDisciplinaComponent } from './matriz-disciplina/matriz-disciplina.component';
import { RouterModule } from '@angular/router';
import { QuadroDocenteComponent } from './quadro-docente/quadro-docente.component';


@NgModule({
  declarations: [
    ServidorComponent,
    CampusComponent,
    CursoComponent,
    DisciplinaComponent,
    TurmaComponent,
    MatrizComponent,
    MatrizDisciplinaComponent,
    QuadroDocenteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    PanelModule,
    ConfirmDialogModule
  ],
  exports: [
    ServidorComponent,
    CampusComponent,
    CursoComponent,
    DisciplinaComponent,
    TurmaComponent
  ], providers: [
    AuthService,
    ConfirmationService
  ]
})
export class CadastroModule { }
