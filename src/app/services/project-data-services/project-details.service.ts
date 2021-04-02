import { title } from 'process';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {
  projectId:string;
  constructor(
    private http:HttpClient
  ) { }

  getAllProjects(){
    return this.http.get(environment.hostURL+"/project");
  }

  getprojectDetails(id:string){
    return this.http.get(environment.hostURL+"/project/"+id);
  }

addProjectTask(reqBody:{title:string,description:string,assignedTo:string,status:string}){
  return this.http.post(environment.hostURL+"/task", reqBody);
}
putTaskToProject(reqBody:{taskId:string},projectId:string){
  return this.http.put(environment.hostURL+"/project/"+projectId+"/task",reqBody);

}



}
