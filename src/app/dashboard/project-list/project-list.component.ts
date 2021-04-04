import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Array<any> = [];
  isLoading = false;

  userRole = localStorage.getItem('role');

  constructor(
    private projectDetailsService: ProjectDetailsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.projectDetailsService.getAllProjects().subscribe((response: any) => {
      this.projects = response;
      this.isLoading = false;
    });
  }

}
