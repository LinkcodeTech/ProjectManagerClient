import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {

  userRole = localStorage.getItem('role');

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
