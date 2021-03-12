import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-to-projectmanager',
  templateUrl: './register-to-projectmanager.component.html',
  styleUrls: ['./register-to-projectmanager.component.scss']
})
export class RegisterToProjectmanagerComponent implements OnInit {

  registerForm : FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm=this.buildRegisterForm();
  }
  private buildRegisterForm():FormGroup{
    return this.fb.group(
      {email:[null,Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')],
      password:[null,Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')],
      confirmPassword:[null,Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')],
      }

    );
  }
  public onRegisterClick(){
    this.validate();
    if(this.registerForm.valid){
      this.register();
    }
  }
  private register(){
    
  }

  get email():FormControl{
    return this.registerForm.get('email') as FormControl;
  }
  get password():FormControl{
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword():FormControl{
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  private validate(){
    this.email.markAsTouched();
    this.password.markAsTouched();
    this.confirmPassword.markAsTouched();
  }

}
