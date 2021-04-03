import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects:Array<any>=[];
  isLoading:boolean=false;

  userRole = localStorage.getItem('role');

  constructor(
    private authService:AuthService,
    private projectDetailsService:ProjectDetailsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    //console.log("Oninit called!")
    this.getData();
  }

  getData(){
    this.isLoading=true;
    this.projectDetailsService.getAllProjects().subscribe((response:any)=>{
      console.log('response',response);
      this.projects=response;
      this.isLoading=false;
    });
  }

}
