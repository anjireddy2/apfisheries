import { Component, OnInit } from '@angular/core';
import { VesselRegistrationService } from '../vessel-registration.service';
import { ExcelService } from '../excel.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  waterBodyPagination = true;
  minDate = new Date(); 
  p: any;
  reports: any = [];
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  reportsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private ExcelService: ExcelService,private vesselRegistrationService: VesselRegistrationService) 
  {

   }

  ngOnInit() {
    this.reportsForm = this.formBuilder.group({
      report_from_date:['', [Validators.required]],
      report_to_date:['', [Validators.required]]
   
  });
  }

  exportAsXLSX():void {
    this.ExcelService.exportAsExcelFile(this.reports, 'reports');
  }

  onClickReports(reportsForm) 
  {
    this.reportsForm.value.report_from_date = new Date(this.reportsForm.value.report_from_date).toDateString();
    this.reportsForm.value.report_to_date = new Date(this.reportsForm.value.report_to_date).toDateString();
    console.log(this.reportsForm);
    this.vesselRegistrationService.getreports(this.reportsForm.value).subscribe(data => 
    {
       this.reports = data;
       
       this.waterBodyPagination = this.reports && this.reports.length > 6 ? true : false;

    });

  }

  pageChanged(event) {
    this.p = event;
  }





  
 

}
