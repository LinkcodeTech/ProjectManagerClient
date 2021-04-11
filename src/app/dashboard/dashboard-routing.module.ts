import { AddTaskComponent } from './add-task/add-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddDeveloperComponent } from './add-developer/add-developer.component';
import { DeveloperDetailsComponent } from './developer-details/developer-details.component';
import { ProjectManagerDetailsComponent } from './project-manager-details/project-manager-details.component';
import { AddProjectManagerComponent } from './add-project-manager/add-project-manager.component';
import { BoardComponent } from './board/board.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'project', pathMatch: 'full', },
      { path: 'project', component: ProjectListComponent },
      { path: 'project/:id', component: ProjectDetailComponent },
      { path: 'project/:id/board', component: BoardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'report', component: ReportComponent },
      { path: 'add-project', component: AddProjectComponent },
      { path: 'add-developer', component: AddDeveloperComponent },
      { path: 'developer-details', component: DeveloperDetailsComponent },
      { path: 'project-manager-details', component: ProjectManagerDetailsComponent },
      { path: 'add-project-manager', component: AddProjectManagerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
