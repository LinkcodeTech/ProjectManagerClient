import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-project-manager-details',
  templateUrl: './project-manager-details.component.html',
  styleUrls: ['./project-manager-details.component.scss']
})
export class ProjectManagerDetailsComponent implements OnInit {
  isLoading = false;
  projectmanagers: Array<any> = [];
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getdata();
  }


  getdata() {
    this.isLoading = true;
    this.authService.getAllProjectManagers().subscribe((response: any) => {
      this.projectmanagers = response;
      this.isLoading = false;
    });

  }

}
