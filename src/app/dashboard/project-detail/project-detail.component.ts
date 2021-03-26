import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  projectId:string;
  developers:Array<any>=[];
  projectManager:string;
  isLoading:boolean=false;
  constructor(
    private projectDetailsService:ProjectDetailsService,
    private active:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.isLoading=true;
    this.projectId=this.active.snapshot.paramMap.get('id');
    this.projectDetailsService.getprojectDetails(this.projectId).subscribe((response:any)=>{
      //console.log('response',response);
      this.projectManager=response.projectManager;
      this.developers=response.developers;
      this.isLoading=false;
    });
  }

}
