import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './navbar/navbar.component';

import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    PanelMenuModule,
    BrowserAnimationsModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class NavModule { }
