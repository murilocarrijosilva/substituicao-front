import { QuadroDocenteComponent } from './cadastro/quadro-docente/quadro-docente.component';
import { MatrizDisciplinaComponent } from './cadastro/matriz-disciplina/matriz-disciplina.component';
import { LoginComponent } from './login/login/login.component';
import { AuthService } from './login/auth.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module';
import { CadastroModule } from './cadastro/cadastro.module';

import { TurmaComponent } from './cadastro/turma/turma.component';
import { ServidorComponent } from './cadastro/servidor/servidor.component';
import { DisciplinaComponent } from './cadastro/disciplina/disciplina.component';
import { CursoComponent } from './cadastro/curso/curso.component';
import { CampusComponent } from './cadastro/campus/campus.component';
import { LoginModule } from './login/login.module';
import { MatrizComponent } from './cadastro/matriz/matriz.component';

import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import { CadastroService } from './cadastro/cadastro.service';
import { PrincipalComponent } from './principal/principal.component';

const appRoutes: Routes = [
  { path: '', component:  LoginComponent },
  { path: 'principal', component: PrincipalComponent, children: [
    { path: 'cadastro/campus', component:  CampusComponent, outlet: 'principal' },
    { path: 'cadastro/curso', component:  CursoComponent, outlet: 'principal' },
    { path: 'cadastro/disciplina', component:  DisciplinaComponent, outlet: 'principal' },
    { path: 'cadastro/servidor', component:  ServidorComponent, outlet: 'principal' },
    { path: 'cadastro/turma', component:  TurmaComponent, outlet: 'principal' },
    { path: 'cadastro/matriz', component:  MatrizComponent, outlet: 'principal' },
    { path: 'cadastro/matriz/disciplinas', component:  MatrizDisciplinaComponent, outlet: 'principal' },
    { path: 'cadastro/quadroDocente', component: QuadroDocenteComponent, outlet: 'principal' }
  ] },
];

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NavModule,
    CadastroModule,
    LoginModule,

    InputTextModule,
    CardModule,
    PanelModule,
    TabViewModule,
    ButtonModule,

    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    CadastroService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
