import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  isCollapsed=false;
  constructor() { }

  ngOnInit(): void {
  }

  public toggleCollapse():void{
    this.isCollapsed=!this.isCollapsed;
  }

}
