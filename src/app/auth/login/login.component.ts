import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private readonly router: Router,
    private readonly active: ActivatedRoute
  ) {
    this.loginForm = this.buildLoginForm();
  }

  ngOnInit(): void { }

  private buildLoginForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }


  public onLoginClick(): void {
    this.validate();
    if (this.loginForm.valid) {
      this.login();
    }
  }

  private login() {
    this.auth.login(this.loginForm.value).subscribe((response: User) => {
      localStorage.setItem('userId', response._id);
      localStorage.setItem('role', response.role);
      if (response.isVerified) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['../reset'], { relativeTo: this.active });
      }
    }, (error: HttpErrorResponse) => {

    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  private validate() {
    this.email.markAsTouched();
    this.password.markAsTouched();
  }


}
