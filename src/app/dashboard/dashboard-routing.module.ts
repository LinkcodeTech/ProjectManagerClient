import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'project', pathMatch: 'full', },
      { path: 'project', component: ProjectListComponent },
      { path: 'project/:id', component: ProjectDetailComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'report', component: ReportComponent },
      { path: 'add-project', component: AddProjectComponent },
      { path: 'add-developer', component: AddDeveloperComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
