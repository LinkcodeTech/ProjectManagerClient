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

}
