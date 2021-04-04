import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private readonly http: HttpClient
  ) { }

  updateTask(id: string, task: any) {
    return this.http.put(environment.hostURL + `/task/${id}`, task);
  }
}
