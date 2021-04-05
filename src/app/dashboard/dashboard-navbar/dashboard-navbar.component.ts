import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
}
