import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  resetPasswordForm:FormGroup;
  constructor(
    private readonly fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm=this.buldResetForm();
  }
  private buldResetForm():FormGroup{
    return this.fb.group(
      {oldPassword:[null,[Validators.required]],
      newPassword:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]}
    );
  }
  onResetClick(){
    this.validate();
    console.log(this.resetPasswordForm);
  }
  get oldpassword():FormControl{
    return this.resetPasswordForm.get('oldPassword') as FormControl;
  }
  get newpassword():FormControl{
    return this.resetPasswordForm.get('newPassword') as FormControl;
  }
  get confirmpassword():FormControl{
    return this.resetPasswordForm.get('confirmPassword') as FormControl;
  }
  private validate() {
    this.oldpassword.markAsTouched();
    this.newpassword.markAsTouched();
    this.confirmpassword.markAsTouched();
  }

}
