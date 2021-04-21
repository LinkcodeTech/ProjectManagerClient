import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectDetailsService } from 'src/app/services/project-data-services/project-details.service';
import { ReportService } from 'src/app/services/report-services/report.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {
  isLoading = false;
  addReportForm: FormGroup;
  projects: any[] = [];
  developers:any[]=[];
  today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  @Output() added = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectDetailsService,
    private reportService: ReportService
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

  validate() {
    // todo
  }

  onAddClick() {
    this.validate();
    if (this.addReportForm.valid) {
      this.submitReport();
    }
  }

  submitReport() {
    this.projects.forEach(project=>{
      if(project._id===this.addReportForm.get('projectId').value){
        project.developers.forEach(developer => {
          this.developers.push(developer._id);
        });
        // this.developers.push(project.projectManager._id);
      }
    });
    // console.log(this.addReportForm.get('projectId').value)
    console.log('projects',this.projects)
    console.log(this.developers);
    const reqBody = {
      userId: localStorage.getItem('userId'),
      date: this.today,
      developers: this.developers,
      projectId: this.addReportForm.get('projectId').value,
      comment: this.addReportForm.get('comment').value
    }
    this.reportService.submitReport(reqBody).subscribe((response:any)=>{
      this.added.emit(true);
      console.log('response',response);
    },(error)=>{
      this.added.emit(false);
    })
  }



}
