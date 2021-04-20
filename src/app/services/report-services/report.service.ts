import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAllReportsByuserId() {
    const url = localStorage.getItem('role') !== 'ADMIN' ? `/report/${localStorage.getItem('userId')}/devreports` : '/report';
    return this.http.get(environment.hostURL + url);
  }

}
