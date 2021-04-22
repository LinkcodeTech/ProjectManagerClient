import { User } from './../../interfaces/user.interface';
import { Project } from './../../interfaces/project.interface';
import { ProjectDetailsService } from './../../services/project-data-services/project-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  editTaskForm: FormGroup;
  developers: any[];
  isLoading = false;
  projectId: string;
  projectName: string;
  constructor(private readonly fb: FormBuilder,
    private readonly projectDataService: ProjectDetailsService,
    private readonly router: Router,
    private active: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDeveloperData();
    this.editTaskForm = this.buildEditTaskForm();
  }

  onEditTaskClick() {

  }

  private buildEditTaskForm(): FormGroup {
    return this.fb.group(
      {
        title: [null, Validators.required],
        description: [null, Validators.required],
        assignedTo: [null, Validators.required]
      }
    );

  }

  private getDeveloperData() {
    this.isLoading = true;
    this.projectId = this.active.snapshot.paramMap.get('id');
    this.projectDataService.getprojectDetails(this.projectId).subscribe((project: Project<User>) => {
      this.developers = project.developers;
      this.projectName = project.name;
      this.isLoading = false;
    }, (error) => {
      console.log('error', error);
    });

  }

}
