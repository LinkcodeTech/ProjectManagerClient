import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {
  isLoading = false;
  addReportForm: FormGroup;
  projects: any[] = [];
  today = new Date().toJSON().slice(0,10).replace(/-/g,'/');

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectDetailsService
  ) { }

  ngOnInit(): void {
    this.addReportForm = this.buildForm();
    this.getdata();
  }

  private buildForm() {
    return this.fb.group({
      projectId: [null, Validators.required],
      comment: [null, Validators.required]
    });
  }

  private getdata() {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe((response: any) => {
      this.projects = response;
      this.isLoading = false;
      // console.log(this.projects);
    }, (error: any) => {
      console.log('error', error);
    })
  }

  onAddClick() {

  }

  validate(){
    // todo
  }


}
