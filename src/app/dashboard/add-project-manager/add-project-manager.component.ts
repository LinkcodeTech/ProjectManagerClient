import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-project-manager',
  templateUrl: './add-project-manager.component.html',
  styleUrls: ['./add-project-manager.component.scss']
})
export class AddProjectManagerComponent implements OnInit {
  addProjectManagerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addProjectManagerForm = this.buildAddProjectManagerForm();
  }

  private buildAddProjectManagerForm(): FormGroup {
    return this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null],
      email: [null],
    });
  }

  validate() {

  }


  onAddClick() {
    this.validate();
    if (this.addProjectManagerForm.valid) {
      this.addProjectManager();
    }
  }

  addProjectManager() {
    const reqBody = {
      firstName: this.addProjectManagerForm.get('firstName').value,
      lastName: this.addProjectManagerForm.get('lastName').value,
      email: this.addProjectManagerForm.get('email').value,
      role: 'PM',
      password: this.addProjectManagerForm.get('firstName').value + '@PM' + this.addProjectManagerForm.get('lastName').value
    };

    this.authService.addProjectManager(reqBody).subscribe((response) => {

    });
    this.router.navigate(['dashboard/project-manager-details']);
  }


}
