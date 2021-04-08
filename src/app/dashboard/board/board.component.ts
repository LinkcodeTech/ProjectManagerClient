
import { User } from './../../../../../ProjectManagerServer/src/user/entities/user.entity';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  userRole=localStorage.getItem('role');
  projectId:string;
  isLoading = false;
  project: Project<User>;
  tasks: any[];
  todo=[];
  inprogress=[]
  done =[];
  progress:number;
  updatedTask:any;

  constructor(private projectservice: ProjectDetailsService ,
    private router : Router,
    private readonly active:ActivatedRoute,
    private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.getData();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('event',event.previousContainer.data[event.previousIndex]);
    this.updatedTask=event.previousContainer.data[event.previousIndex];
    console.log(event.container.id);


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        if(event.container.id=="cdk-drop-list-0")
        {
          this.updatedTask.status="TODO"
        }
        else if(event.container.id=="cdk-drop-list-1")
        {
          this.updatedTask.status="INPROGRESS";
        }
        else if(event.container.id=="cdk-drop-list-2")
        {
          this.updatedTask.status="DONE";
        }
        this.updateStatus(this.updatedTask);

    }
  }

  getData(){
    this.isLoading = true;
    this.projectId = this.active.snapshot.paramMap.get('id');
    this.projectservice.getprojectDetails(this.projectId).subscribe((project: Project<User>) => {
      this.project = project;
      this.tasks = project.tasks;
      this.tasks.forEach(task => {
        if(task.status=='TODO')
        {
          this.todo.push(task);
        }else if(task.status=='INPROGRESS'){
          this.inprogress.push(task);
        }else if(task.status=='DONE'){
          this.done.push(task);
        }
        this.getProgressData();
        this.isLoading = false;
      });
    });

  }

  getProgressData(){
    let doneCount=0;
    this.tasks.forEach(task => {
      if (task.status=='DONE') {
        doneCount++;
      }
      this.progress=(doneCount/this.tasks.length)*100;
      // console.log('this.progress', this.progress)

    })
  }

  updateStatus(task: any): void {
    this.taskService.updateTask(task._id, task).subscribe((res) => {
      console.log('res',res);
      this.getProgressData();
    });
  }

}


