import { Component, OnInit } from '@angular/core';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthhttpService } from 'src/app/services/auth/authhttp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private authhttp:AuthhttpService
  ) {
    this.loginForm = this.buildLoginForm();
    console.log(this.loginForm);
  }

  ngOnInit(): void { }

  private buildLoginForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
    });
  }


  public onLoginClick():void{
    this.validate();
    if(this.loginForm.valid){
      this.login();
    }
  }

  private login(){

    const reqBody={email: this.loginForm.get('email').value,password: this.loginForm.get('password').value}

    const response=this.authhttp.login("auth-admin",reqBody).subscribe((response:any)=>{
      console.log(response);
    });



    console.log('logged in');
  }

  get email():FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get password():FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  private validate(){
    this.email.markAsTouched();
    this.password.markAsTouched();
  }


}
