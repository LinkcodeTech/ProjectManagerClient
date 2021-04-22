import { User } from './../../interfaces/user.interface';
import { Project } from './../../interfaces/project.interface';
import { ProjectDetailsService } from './../../services/project-data-services/project-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { TaskService } from 'src/app/services/task/task.service';


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
  isInvalid=false;


  @Input() task;
  // defaultEmail=this.task.assignedTo.email;
  @Output() updated= new EventEmitter<boolean>();

  constructor(private readonly fb: FormBuilder,
    private readonly projectDataService: ProjectDetailsService,
    private active: ActivatedRoute,
    private taskService:TaskService) { }

  ngOnInit(): void {
    this.getDeveloperData();
    this.editTaskForm = this.buildEditTaskForm();
  }

  onEditTaskClick() {
    if(this.editTaskForm.valid)
    {
      this.updateTask();
    }
    else{
      this.isInvalid=true;
    }
  }

  private buildEditTaskForm(): FormGroup {
    return this.fb.group(
      {
        title: [this.task.title, Validators.required],
        description: [this.task.description, Validators.required],
        assignedTo: [this.task.assignedTo, Validators.required]
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


  updateTask(){
    const task = {
      title: this.editTaskForm.get('title').value,
      description: this.editTaskForm.get('description').value,
      assignedTo: this.editTaskForm.get('assignedTo').value,
      status: this.task.status,
      projectId: this.projectId
    };

    this.taskService.updateTask(this.task._id,task).subscribe((response:any)=>{
      this.updated.emit(true);
      Swal.fire({
        icon: 'success',
        title: 'Task has been successfully updated',
      });
    },(error:any)=>{
      this.updated.emit(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops..!',
        text : "update failed"
      });
    })

  }

}
