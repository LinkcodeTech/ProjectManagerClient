import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  projectId: string;
  isLoading = false;
  project: Project<User>;
  tasks: any[];

  userRole = localStorage.getItem('role');

  constructor(
    private projectDetailsService: ProjectDetailsService,
    private active: ActivatedRoute,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.projectId = this.active.snapshot.paramMap.get('id');
    this.projectDetailsService.getprojectDetails(this.projectId).subscribe((project: Project<User>) => {
      this.project = project;
      this.tasks = project.tasks;
      this.isLoading = false;
    });
  }

  updateStatus(task: any): void {
    this.taskService.updateTask(task._id, task).subscribe((res) => {

    });
  }

}
