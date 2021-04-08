
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  AddTaskForm: FormGroup;
  Developers: any[];
  isLoading = false;
  projectId: string;
  projectName: string;
  constructor(
    private readonly fb: FormBuilder,
    private readonly projectDataService: ProjectDetailsService,
    private readonly router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.AddTaskForm = this.buildTaskForm();
    this.getDeveloperData();

  }
  private buildTaskForm(): FormGroup {
    return this.fb.group(
      {
        title: [null, Validators.required],
        description: [null, Validators.required],
        assignedTo: [null, Validators.required],
        status: ['TODO', Validators.required]
      }
    );

  }
  onAddTaskClick() {
    this.validate();
    if (this.AddTaskForm.valid) {
      this.addtask();
    }

  }
  private addtask() {
    const task = {
      title: this.AddTaskForm.get('title').value,
      description: this.AddTaskForm.get('description').value,
      assignedTo: this.AddTaskForm.get('assignedTo').value,
      status: 'TODO',
      projectId: this.projectId
    };
    this.projectDataService.addProjectTask(task).subscribe((response: any) => {
      const reqBody = {
        taskId: response._id,
      };
      this.projectDataService.putTaskToProject(reqBody, this.projectId).subscribe((response1) => {
      });
      this.router.navigate([`dashboard/project/${this.projectId}/board`]);
    });
  }

  private validate() {
    // to do
  }

  private getDeveloperData() {
    this.isLoading=true;
    this.projectId = this.active.snapshot.paramMap.get('id');
    this.projectDataService.getprojectDetails(this.projectId).subscribe((project: Project<User>) => {
      this.Developers = project.developers;
      this.projectName = project.name;
      this.isLoading=false;
    }, () => {

    });

  }

}
