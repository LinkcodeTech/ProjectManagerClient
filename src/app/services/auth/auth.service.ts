import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(reqBody: { email: string, password: string }) {
    return this.http.post(environment.hostURL + '/user/login', reqBody);
  }

  addDeveloper(reqBody:{firstName:string, lastName:string, email:string, password:string,skills:string[],role:string}){
    return this.http.post(environment.hostURL+"/user", reqBody);
  }

  getAllDevelopers(){
    return this.http.get(environment.hostURL+"/user/dev");
  }
  resetPassword(reqBody:{oldPass:string,newPass:string}){
    return this.http.put(environment.hostURL+"/user/"+localStorage.getItem('userId'),reqBody);
  }

}
