import { Component, OnInit, ViewChild } from '@angular/core';
import { VesselRegistrationService } from '../vessel-registration.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

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
  distId:number;
  mandalId:number;
  private Panchayats;
  private Village;
  private Waterbody;
  private WaterbodyList;
  submitted: boolean;

  constructor(private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder, private _http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.inlandSocietyRegistrationForm = this.formBuilder.group({
      district_name: ['', [Validators.required]],
      panchayat: ['', [Validators.required]],
      village: ['', [Validators.required]],
      mandal: ['', [Validators.required]],
      waterbody: ['', [Validators.required]]
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
  let  distId1 = this.distId;
  this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
  }
  getPanchayats() {
  let  distId1 = this.distId;
  let  mandalId1 = this.mandalId;
  this.vesselRegistrationService.getPanchyats(distId1,mandalId1).subscribe(data => this.Panchayats = data);
  this.vesselRegistrationService.getVillages(distId1,mandalId1).subscribe(data => this.Village = data);
  this.vesselRegistrationService.getWaterbody(distId1,mandalId1).subscribe(data => this.Waterbody = data);
  }
  getWaterBodies() {
  let  distId1 = this.distId;
  let  mandalId1 = this.mandalId;
  this.vesselRegistrationService.getWaterBodyList(distId1,mandalId1).subscribe(res => this.WaterbodyList = res);
  this.waterBodyPagination = !this.waterBodyPagination; 
  }
  inlandSocietyRegistration() {
    this.spinner.show();
    this.submitted = true;
    if(this.inlandSocietyRegistrationForm.invalid) {
      this.spinner.hide();
      return;
    }
  }
 
  edidInlandSociety(WaterbodyList) {

  }
  inlandSocietyData(WaterbodyList) {

  }
  deleteInlandSociety() {

  }
}
