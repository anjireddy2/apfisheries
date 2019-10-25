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
  // Mandals: any;
  // Flcs: any;
  nodatafound: boolean = false;
  // Dist: any = [];

  constructor(private formBuilder: FormBuilder,private ExcelService: ExcelService, private router : Router,
    private vesselRegistrationService: VesselRegistrationService, 
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    }
    // this.spinner.show();
    this.reportsForm = this.formBuilder.group({
      report_from_date:['', [Validators.required]],
      report_to_date:['', [Validators.required]],
      // district_name:['', [Validators.required]],
      // mandal:[''],
      // flc:[''],
    });
    // this.reportsForm.controls['district_name'].setValue(undefined, {onlySelf: true});
    // this.reportsForm.controls['mandal'].setValue(undefined, {onlySelf: true});
    // this.reportsForm.controls['flc'].setValue(undefined, {onlySelf: true});
    // this.vesselRegistrationService.getDist().subscribe(data => {
    //   this.spinner.hide();
    //   this.Dist = data;
    // },error=>{
    //   this.spinner.hide();
    // });
  }

  exportAsXLSX():void {
    if(this.reports.message) {
      this.ExcelService.exportAsExcelFile(this.reports.message, 'reports');
    }
  }

  // getMandal() {
  //   let  distId1 = this.reportsForm.controls['district_name'].value;
  //   this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
  //   this.reportsForm.controls['mandal'].setValue(undefined);
  //   this.reportsForm.controls['flc'].setValue(undefined);
  // }

  // getFlc() {
  //   let  distId1 = this.reportsForm.controls['district_name'].value;
  //   let mandalId = this.reportsForm.controls['mandal'].value;
  //   this.vesselRegistrationService.getFlc(distId1,mandalId).subscribe(data => this.Flcs = data); 
  //   this.reportsForm.controls['flc'].setValue(undefined);
  // }

  onClickReports() {
    this.submitted = true;
    this.reports = [];
    this.nodatafound = false;
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
       this.nodatafound = data && data['message'] && data['message'].length == 0 ? true : false;
       this.waterBodyPagination = this.reports && this.reports.message && this.reports.message.length > 6 ? true : false;
    },error=>{
      this.nodatafound = true;
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
