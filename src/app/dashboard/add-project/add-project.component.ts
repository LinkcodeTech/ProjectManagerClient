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
    console.log('this.addProjectForm', this.addProjectForm);
   }

  ngOnInit(): void {
  }
  private buildAddProjectForm(): FormGroup {
    return this.fb.group({
      projectName: [null, [Validators.required]],
    });
  }
}

