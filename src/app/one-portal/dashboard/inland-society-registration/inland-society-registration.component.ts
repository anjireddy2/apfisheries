import { Component, OnInit, Inject } from '@angular/core';
import { VesselRegistrationService } from '../vessel-registration.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-inland-society-registration',
  templateUrl: './inland-society-registration.component.html',
  styleUrls: ['./inland-society-registration.component.css']
})
export class InlandSocietyRegistrationComponent implements OnInit {

  inlandSocietyRegistrationForm: FormGroup;
  waterBodyPagination = false;
  Dist:any = [];
  Mandals:any = [];
  // distId:number;
  // mandalId:number;
  gramalId:number;
  Panchayats:number;
  villageId:number;
  Village;
  Waterbody;
  waterbodyName;
  waterbodyType ; any;
  seasonality : any;
  WaterbodyList : any = [];
  submitted: boolean;
  success: boolean;
  inlandSocietyList : any = [];
  error: boolean;


  constructor(private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder, private _http: HttpClient, 
    private spinner: NgxSpinnerService, private router:Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.spinner.show();
    this.inlandSocietyRegistrationForm = this.formBuilder.group({
      district_name: ['', [Validators.required]],
      panchayat: ['', [Validators.required]],
      village: ['', [Validators.required]],
      mandal: ['', [Validators.required]],
      waterbodyType: ['', [Validators.required]],
      waterbodyName: ['', [Validators.required]],
      seasonality: ['', [Validators.required]],
      society_name: ['', [Validators.required]],
      society_reg_no: ['', [Validators.required]],
      society_type: ['',[Validators.required]]
    });
    this.vesselRegistrationService.getDist().subscribe(data => {
      this.spinner.hide();
      this.Dist = data;
    }, error=> {
      this.spinner.hide();
    });
  }
  get f() { 
    return this.inlandSocietyRegistrationForm.controls; 
  }
  getMandal() {
  // let  distId1 = this.distId;
  let  distId1 = this.inlandSocietyRegistrationForm.value.district_name;
  this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
  }
  getPanchayats() {
  let  distId1 = this.inlandSocietyRegistrationForm.value.district_name;
  let  mandalId1 = this.inlandSocietyRegistrationForm.value.mandal;
  // let  mandalId1 = this.mandalId;
  this.vesselRegistrationService.getPanchyats(distId1,mandalId1).subscribe(data => this.Panchayats = data);
  this.vesselRegistrationService.getVillages(distId1,mandalId1).subscribe(data => this.Village = data);
  this.vesselRegistrationService.getWaterbody(distId1,mandalId1).subscribe(data => this.Waterbody = data);
  }
  getWaterBodies() {
  let  distId1 = this.inlandSocietyRegistrationForm.value.district_name;
  let  mandalId1 = this.inlandSocietyRegistrationForm.value.mandal;
  this.vesselRegistrationService.getWaterBodyList(distId1,mandalId1).subscribe(res => this.WaterbodyList = res);
  this.waterBodyPagination = !this.waterBodyPagination; 
  }
  inlandSocietyRegistration() {
    this.spinner.show();
    this.submitted = true;
    this.success = false;
    this.error=false;
    if (this.inlandSocietyRegistrationForm.invalid) {
    this.spinner.hide();
    return;
    }
    this.vesselRegistrationService.createInlandSociety(this.inlandSocietyRegistrationForm.value).subscribe(
      data=> {
    this.spinner.hide();
    this.inlandSocietyList = data;
      if(this.inlandSocietyList && this.inlandSocietyList.success == true) {
        this.success = true;
        window.scroll(0,0);
        this.router.navigate(['dashboard/inland_society_list']);
      } else {
        this.error = true;
        window.scroll(0,0);
      }
    });
  }
}
