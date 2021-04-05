import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../../../../../ProjectManagerServer/src/user/entities/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { copyFileSync } from 'fs';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  resetPasswordForm: FormGroup;
  passwordMatched: boolean;
  constructor(
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private readonly active: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.buldResetForm();
  }
  private buldResetForm(): FormGroup {
    return this.fb.group(
      {
        oldPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]]
      }
    );
  }
  onResetClick() {
    this.validate();
    if (this.resetPasswordForm.valid) {
      if(this.passwordMatched)
      {
        this.resetPassword();
        console.log("password has been reset");
      }
    }
  }
  private resetPassword() {
    const reqBody = {
      oldPass: this.resetPasswordForm.get('oldPassword').value,
      newPass: this.resetPasswordForm.get('newPassword').value,
    };
    this.auth.resetPassword(reqBody).subscribe((Response: User) => {
      if (Response) {
        this.router.navigate(['/dashboard']);
      }

    }, (error: HttpErrorResponse) => {
    });
  }

  get oldpassword(): FormControl {
    return this.resetPasswordForm.get('oldPassword') as FormControl;
  }

  get newpassword(): FormControl {
    return this.resetPasswordForm.get('newPassword') as FormControl;
  }

  get confirmpassword(): FormControl {
    return this.resetPasswordForm.get('confirmPassword') as FormControl;
  }

  private validate() {
    this.oldpassword.markAsTouched();
    this.newpassword.markAsTouched();
    this.confirmpassword.markAsTouched();
    this.matchPasswords();
  }

  matchPasswords() {

    if(this.resetPasswordForm.get('newPassword').touched && this.resetPasswordForm.get('confirmPassword').touched) {
      if (this.resetPasswordForm.get('newPassword').value === this.resetPasswordForm.get('confirmPassword').value) {
        if(this.resetPasswordForm.get('newPassword').value!==null && this.resetPasswordForm.get('newPassword').value!==null){
          this.passwordMatched=true;
        }
        else
          this.passwordMatched=false;
      }
      else
        this.passwordMatched=false;
    }
    else{
      this.passwordMatched = false;
    }
    // console.log('passwordMatched',this.passwordMatched);

  }

}
