import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { DeveloperDetailsComponent } from './developer-details/developer-details.component';
import { LoaderComponent } from './loader/loader.component';
import { ProjectManagerDetailsComponent } from './project-manager-details/project-manager-details.component';
import { AddProjectManagerComponent } from './add-project-manager/add-project-manager.component';
import { BoardComponent } from './board/board.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardSidenavComponent,
    ProjectListComponent,
    ReportComponent,
    ProfileComponent,
    ProjectDetailComponent,
    AddProjectComponent,
    AddDeveloperComponent,
    DeveloperDetailsComponent,
    LoaderComponent,
    ProjectManagerDetailsComponent,
    AddProjectManagerComponent,
    BoardComponent
  ],
  imports: [
    NgMultiSelectDropDownModule,
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
  
})
export class DashboardModule { }
