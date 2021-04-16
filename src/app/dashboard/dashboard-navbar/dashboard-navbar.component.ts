import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  isCollapsed=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public toggleCollapse():void{
    this.isCollapsed=!this.isCollapsed;
  }
  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  logoutAlert():void{
    Swal.fire({
      icon: 'warning',
      title: 'Are You Sure?',
      text: 'You will be logged out of the system',
      showCancelButton: true,
      confirmButtonText: `logout`,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if(result.value){
        this.logout();
      }
    })
   }

}
