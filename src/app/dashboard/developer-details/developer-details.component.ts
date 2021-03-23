import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-developer-details',
  templateUrl: './developer-details.component.html',
  styleUrls: ['./developer-details.component.scss']
})
export class DeveloperDetailsComponent implements OnInit {

  developers:Array<any>=[];
  isLoading:boolean=false;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getdata();
  }


  getdata(){
    this.isLoading=true;
    this.authService.getAllDevelopers().subscribe((response:any)=>{
      // console.log('response',response);
      this.developers=response;
      this.isLoading=false;
    });

  }



}
