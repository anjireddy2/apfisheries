import { Component, OnInit, Inject } from '@angular/core';
import { VesselRegistrationService } from '../vessel-registration.service';
import { ExcelService } from '../excel.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  waterBodyPagination = false;
  minDate = new Date(); 
  p: any;
  submitted : boolean = false;
  reports: any = [];

  reportsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private ExcelService: ExcelService, private router : Router,
    private vesselRegistrationService: VesselRegistrationService, 
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    }
    this.reportsForm = this.formBuilder.group({
      report_from_date:['', [Validators.required]],
      report_to_date:['', [Validators.required]]
  });
  }

  exportAsXLSX():void {
    if(this.reports.message) {
      this.ExcelService.exportAsExcelFile(this.reports.message, 'reports');
    }
  }

  onClickReports() {
    this.submitted = true;
    this.waterBodyPagination = false;
    if(this.reportsForm.invalid) {
      return;
    }
    this.spinner.show();
    this.reportsForm.value.report_from_date = new Date(this.reportsForm.value.report_from_date).toDateString();
    this.reportsForm.value.report_to_date = new Date(this.reportsForm.value.report_to_date).toDateString();
    this.vesselRegistrationService.getreports(this.reportsForm.value).subscribe(data => {
      this.spinner.hide();
       this.reports = data;
       this.waterBodyPagination = this.reports && this.reports.message && this.reports.message.length > 6 ? true : false;
    },error=>{
      this.spinner.hide();
    });
  }

  get f() { 
    return this.reportsForm.controls; 
  }

  pageChanged(event) {
    this.p = event;
  }
}
