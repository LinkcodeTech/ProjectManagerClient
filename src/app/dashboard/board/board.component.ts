
import { User } from './../../../../../ProjectManagerServer/src/user/entities/user.entity';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';
import { TaskService } from 'src/app/services/task/task.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  userRole = localStorage.getItem('role');
  projectId: string;
  isLoading = false;
  project: Project<User>;
  tasks: any[];
  todo = [];
  inprogress = [];
  done = [];
  progress: number;
  updatedTask: any;
  modalRef: BsModalRef;

  constructor(
    private projectservice: ProjectDetailsService,
    private readonly active: ActivatedRoute,
    private taskService: TaskService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('event', event.previousContainer.data[event.previousIndex]);
    this.updatedTask = event.previousContainer.data[event.previousIndex];
    console.log(event.container.id);


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      if (event.container.id === 'todo') {
        this.updatedTask.status = 'TODO';
        this.updateStatus(this.updatedTask);
      }
      else if (event.container.id === 'inprogress') {
        this.updatedTask.status = 'INPROGRESS';
        this.updateStatus(this.updatedTask);
      }
      else if (event.container.id === 'done') {
        this.updatedTask.status = 'DONE';
        this.updateStatus(this.updatedTask);
      }


    }
  }

  getData() {
    this.isLoading = true;
    this.projectId = this.active.snapshot.paramMap.get('id');
    this.projectservice.getprojectDetails(this.projectId).subscribe((project: Project<User>) => {
      this.project = project;
      this.todo=[];
      this.inprogress=[];
      this.done=[];
      this.tasks = project.tasks;
      this.tasks.forEach(task => {
        if (task.status === 'TODO') {
          this.todo.push(task);
        } else if (task.status === 'INPROGRESS') {
          this.inprogress.push(task);
        } else if (task.status === 'DONE') {
          this.done.push(task);
        }
        this.getProgressData();
      });
      this.isLoading = false;
    },
      (error: any) => {
        console.log('error', error);
      });

  }

  getProgressData() {
    let doneCount = 0;
    this.tasks.forEach(task => {
      if (task.status === 'DONE') {
        doneCount++;
      }
      this.progress = (doneCount / this.tasks.length) * 100;
      // console.log('this.progress', this.progress)

    });
  }

  updateStatus(task: any): void {
    this.taskService.updateTask(task._id, task).subscribe((res) => {
      console.log('res', res);
      this.getProgressData();
    });
  }

  deleteAlert(id:string){
    Swal.fire({
      icon: 'warning',
      title: 'Are You Sure?',
      text: 'Selected task will be deleted',
      showCancelButton: true,
      confirmButtonText: `delete`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if(result.value){
        this.deleteTask(id)
      }
    })
  }


  deleteTask(id:string){
    this.taskService.deleteTask(id).subscribe((response)=>{
      this.getData();
      Swal.fire({
        icon: 'success',
        title: 'task has been successfully deleted..',
      });
    },(error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "We had an error in deletion..",
      });
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


}


