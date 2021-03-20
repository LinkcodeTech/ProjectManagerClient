import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterToProjectmanagerComponent } from './register-to-projectmanager/register-to-projectmanager.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';



@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterToProjectmanagerComponent, ResetPassComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
