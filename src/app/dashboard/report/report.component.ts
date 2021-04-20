import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReportService } from 'src/app/services/report-services/report.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  isLoading = false;
  reports: any[] = [];
  userRole = localStorage.getItem('role');
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private reportService:ReportService
  ) { }

  ngOnInit(): void {
    this.getdata();
  }

  private getdata() {
    this.reports=[];
    this.isLoading=true
    this.reportService.getAllReportsByuserId().subscribe((response:any)=>{
      this.reports=response;
      this.isLoading=false;
      // console.log('this.reports',this.reports);
    },(error)=>{
      console.log(error);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
