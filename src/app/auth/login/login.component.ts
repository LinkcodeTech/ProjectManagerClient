import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.loginForm = this.buildLoginForm();
  }

  ngOnInit(): void { }

  private buildLoginForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required,]],
      password: [null, [Validators.required,]]
    });
  }

}
