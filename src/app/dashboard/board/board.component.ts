
import { User } from './../../../../../ProjectManagerServer/src/user/entities/user.entity';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  projectId:string;
  isLoading = false;
  project: Project<User>;
  tasks: any[];
  todo=[];
  inprogress=[]
  done =[];
  constructor(private projectservice: ProjectDetailsService ,private router : Router, private readonly active:ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  getData(){
    this.projectId = this.active.snapshot.paramMap.get('id');
    this.projectservice.getprojectDetails(this.projectId).subscribe((project: Project<User>) => {
      this.project = project;
      this.tasks = project.tasks;
      this.isLoading = false;
      this.tasks.forEach(task => {
        if(task.status=='TODO')
        {
          this.todo.push(task);
        }else if(task.status=='INPROGRESS'){
          this.inprogress.push(task);
        }else if(task.status=='DONE'){
          this.done.push(task);
        }
        
      });
    });
    

  }
}


