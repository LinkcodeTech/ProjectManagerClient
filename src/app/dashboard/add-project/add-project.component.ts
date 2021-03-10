import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  addProjectForm:FormGroup;
  constructor(
    private readonly fb: FormBuilder
  ) {
    this.addProjectForm = this.buildAddProjectForm();
   }

  ngOnInit(): void {
  }
  private buildAddProjectForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required,Validators.pattern('')]]
    });
  }
}

