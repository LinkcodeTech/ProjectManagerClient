import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects:Array<any>=[];
  isLoading:boolean=false;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    //console.log("Oninit called!")
    this.getData();
  }

  getData(){
    this.isLoading=true;
    this.authService.getAllProjects().subscribe((response:any)=>{
      //console.log('response',response);
      this.projects=response;
      this.isLoading=false;
    });
  }

}
