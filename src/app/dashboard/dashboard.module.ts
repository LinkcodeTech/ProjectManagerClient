import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [DashboardComponent,DashboardNavbarComponent, DashboardSidenavComponent, ProjectComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
