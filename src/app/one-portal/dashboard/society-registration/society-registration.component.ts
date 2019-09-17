import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { VesselRegistrationService } from '../vessel-registration.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-society-registration',
  templateUrl: './society-registration.component.html',
  styleUrls: ['./society-registration.component.css']
})
export class SocietyRegistrationComponent implements OnInit {
  Dist:any;
  Flcs:any;
  distId: any;
  mandalId:any;
  Mandals: any;
  societyRegistrationForm: FormGroup;
  submitted: boolean = false;
  // fieldArray: Array<any> = [];
  newAttribute: any = {};
  firstField = true;
  firstFieldName = 'First Item name';
  isEditItems: boolean;
  fieldArray: any = {};
  flcid: any;
  societyList : any = [];
  success = false;
  error = false;
  verifyVesseldata: any;
  vsuccess: boolean;
  verror: boolean;

  constructor(private router:Router,private vesselRegistrationService: VesselRegistrationService, 
    private formBuilder: FormBuilder, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.societyRegistrationForm = this.formBuilder.group({
      district_name: ['', [Validators.required]],
       ncdc_reg: ['', [Validators.required]],
      // village: ['', [Validators.required]],
      // area_of_operations: ['', [Validators.required]],
      mandal: ['', [Validators.required]],
      flc: ['', [Validators.required]],
      society_name: ['', [Validators.required]],
      society_reg_no: ['', [Validators.required,Validators.minLength(12),Validators.maxLength(20)]],
      field: this.formBuilder.array([
        this.addvesselRegNo(),
     ])
    });
    this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
  }
  addvesselRegNo() : FormGroup {
    return this.formBuilder.group({
        name : ['']
    });
  }
  get f() { return this.societyRegistrationForm.controls; }
  getMandal() {
    let  distId1 = this.distId;
    this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
  }
  getFlc() {
    let  distId1 = this.distId;
    let mandalId = this.mandalId;
    this.vesselRegistrationService.getFlc(distId1,mandalId).subscribe(data => this.Flcs = data);
  }
  societyRegistration(societyRegistrationForm) {
    this.submitted = true;
    this.success = false;
    this.error=false;
    if (this.societyRegistrationForm.invalid) {
      return;
    }
    this.societyRegistrationForm.value.field = this.fieldArray;
    this.societyRegistrationForm.value.userId = this.storage.get("user_id");
    this.vesselRegistrationService.createSociety(this.societyRegistrationForm.value).subscribe(
      data=>{
      this.societyList = data;
      if(this.societyList && this.societyList.success == true) {
      this.success = true;
      this.router.navigate(['dashboard/society_registration']);
      } else {
        // this.errorlist = this.registerData.message.split(",");
        this.error = true;
      }
      window.scroll(0,0);
    });
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  addFieldValue() {
      const control = <FormArray>this.societyRegistrationForm.controls.field["controls"];
      control.push(this.addvesselRegNo());
  }
  deleteFieldValue(index) {
    // this.fieldArray.splice(index, 1);
    // const control = <FormArray>this.societyRegistrationForm.controls.field['controls'];
    this.societyRegistrationForm.controls.field['controls'].splice(index,1);
  }

  onEditCloseItems() {
    this.vsuccess = false;
    this.verror = false;
    this.fieldArray = {};
    this.fieldArray.elements=[];
    this.societyRegistrationForm.controls.field["controls"].forEach(element => {
      this.fieldArray.elements.push({name:element.value.name});
    });
    this.vesselRegistrationService.verifyVessel(this.fieldArray).subscribe(
      data=>{
      this.verifyVesseldata = data;
      if(this.verifyVesseldata && this.verifyVesseldata.success == true) {
        this.vsuccess = true;
      } else {
        // this.errorlist = this.registerData.message.split(",");
        this.verror = true;
      }
      window.scroll(0,0);
    });
  }
}