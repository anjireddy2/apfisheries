import { Component, OnInit,Input, Inject  } from '@angular/core';
import {VesselRegistrationService} from '../vessel-registration.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {  Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-addnew-vessel',
  templateUrl: './addnew-vessel.component.html',
  styleUrls: ['./addnew-vessel.component.css']
})
export class AddnewVesselComponent implements OnInit {
  // minDate = new Date(); 
  @Input() private format = 'YYYY/MM/DD';
  registerForm: FormGroup;
  submitted = false;
  verfiy = false;
  Dist:any = [];
  Mandals:any = [];
  Flcs:any = [];
  Panchayats:any = [];
  VesselLists: any = [];
  registerData:any = [];
  adharVerify:any =[];
  distId:number;
  mandalId:number;
  flcid:number;
  success = false;
  error = false;
  rsuccess = false;
  rerror = false;
  errMsgs: any;
  userId: any;
  errorlist: any;
  showVerifyBtn: boolean;
  rationVerifyBtn: boolean;
  rationVerify: any = [];
  reference: any;
  adhar_error: boolean;
  adhar_success: boolean;
  bankList : any = [];
  bank_act_chk: boolean;
  vessel_chk: boolean;
  ifsc_chk: boolean;
 

  constructor(private router:Router,private formBuilder: FormBuilder,private vesselRegistrationService: VesselRegistrationService,private _http: HttpClient, 
    private spinner: NgxSpinnerService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.registerForm = this.formBuilder.group({
      owner_name: ['', Validators.required],
      father_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required,Validators.minLength(12)]],
      mobile_number: ['', [Validators.required,Validators.minLength(10),Validators.pattern('[1-9][0-9]{9}')]],
      bank_account_number: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      ration_card: [''],
      ifsc_code: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
      bank_name: ['', Validators.required],
      email: ['', [Validators.email]],
      district_name: ['', [Validators.required]],
      mandal: ['', [Validators.required]],
      flc: ['', [Validators.required]],
      vessel_name: [''],
      vessltype:['', [Validators.required]],
      vessel_number:['', [Validators.required,Validators.minLength(15),Validators.maxLength(17)]],
       mfid:[''],
       gill_net_count:[''],
       drag_net_count:[''],
       cast_net_count:[''],
       trawl_net_count:[''],
       life_bouys_count:[''],
       dat_count:[''],
       gps_count:[''],
       fish_finder_count:[''],
       echo_sounder:[''],  
      licence_renewal_date:['', [Validators.required]],
      licence_valid_date:['', [Validators.required]],
      bank_others_name : ['',[Validators.required]]
  });
     this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
     this.vesselRegistrationService.getBankList().subscribe(data => {
       if(data.success && data.banks.length > 0) {
         data.banks.forEach(element => {
           this.bankList.push({value:element})
         });
       }
     });
  }
  
  get f() { return this.registerForm.controls; }

  getMandal() {
    let  distId1 = this.distId;
    this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
    this.mandalId = undefined;
    this.flcid = undefined;
  }

  getFlc() {
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    this.vesselRegistrationService.getFlc(distId1,mandalId).subscribe(data => this.Flcs = data); 
    // this.vesselRegistrationService.getPanchyats(distId1,mandalId).subscribe(data => this.Panchayats = data);
    this.flcid = undefined;
  }

  onlyNumberKey(event) {
    // this.bank_act_chk = type == 'bank_account_number' && /^0*$/.test(this.registerForm.value.bank_account_number) ? true : false; 
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  checkZeros(type) {
    if(type == 'bank_account_number') {
      this.bank_act_chk = this.registerForm.value.bank_account_number != '' && /^0*$/.test(this.registerForm.value.bank_account_number) ? true : false;
    } else if(type == 'vessel_number') {
      this.vessel_chk = this.registerForm.value.vessel_number != '' && /^0*$/.test(this.registerForm.value.vessel_number) ? true : false;
    } else if(type == 'ifsc_code') {
      this.ifsc_chk = this.registerForm.value.ifsc_code!= '' && /^0*$/.test(this.registerForm.value.ifsc_code) ? true : false;
    }
  }
  onClickSubmit(registerForm) {
    this.spinner.show();
    this.error = false;
    this.success = false;
    this.submitted = true;
    if(this.registerForm.value.bank_name != 'others') {
      this.registerForm.controls['bank_others_name'].setErrors(null);
    }
    if (this.registerForm.invalid || this.bank_act_chk || this.ifsc_chk || this.vessel_chk) {
      this.spinner.hide();
        return;
    }
    let  distId1 = this.distId;
    let mandalId1 = this.mandalId;
    let flcId1 = this.flcid;
    if(this.registerForm.controls['owner_name'].status === "DISABLED") {
      this.registerForm.value.father_name =  this.rationVerify.father_name;
      this.registerForm.value.owner_name =  this.rationVerify.owner_name;
      }
    this.registerForm.value.userId = this.storage.get("user_id");
    this.registerForm.value.reference = this.reference;
    this.registerForm.value.licence_renewal_date = new Date(this.registerForm.value.licence_renewal_date).toDateString();
    this.registerForm.value.licence_valid_date = new Date(this.registerForm.value.licence_valid_date).toDateString();

    this.vesselRegistrationService.createVessel(distId1, mandalId1 , flcId1, this.registerForm.value).subscribe(data => {
      this.spinner.hide();
      this.registerData = data;
      if(this.registerData && this.registerData.success == true) {
      this.success = true;
      this.router.navigate(['/dashboard/vessel_registration']);
    } else {
      // this.errorlist = this.registerData.message.split(",");
      this.error = true;
    }
    window.scroll(0,0);    
    }, error => {
      this.spinner.hide();
    });
  }
    
  getVerifyBtn(inputType) {
    if(inputType === "Aadhar") {
      this.showVerifyBtn = false;
      this.adharVerify.success = false;
      if(this.registerForm.controls.aadhaar_number.value && this.registerForm.controls.aadhaar_number.value.length === 12) {
        this.showVerifyBtn = true;
      }
    } else if(inputType === "RationCard") {
      this.rationVerifyBtn = false;
      this.rationVerify.success = false;
      if(this.registerForm.controls.ration_card.value && this.registerForm.controls.ration_card.value.length === 15) {
        this.rationVerifyBtn = true;
      }
    } 

    }

  getadhar() {
    this.adhar_error = false;
    this.adhar_success = false;
    this.spinner.show();
    let  adhNum = ((document.getElementById("adharId") as HTMLInputElement).value);
    this.vesselRegistrationService.adharVerify(adhNum).subscribe(data => {
      this.spinner.hide();
      this.adharVerify = data;
      if(this.adharVerify && this.adharVerify.success === true) {
        this.adhar_success = true;
        this.showVerifyBtn = false;
        this.reference = this.adharVerify.ref_no;
        this.adharVerify.success = true;
      } else {
        this.adharVerify.error = true;
        this.adhar_error = true;     
      }
      window.scroll(0,0); 
    }, error => {
      this.spinner.hide();
    });
  }

  getRation() {
    this.rerror = false;
    this.rsuccess = false;
    this.spinner.show();
    let  rationNum = this.registerForm.controls.ration_card.value;
    let adhNum = this.registerForm.controls.aadhaar_number.value;
    this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
      this.spinner.hide();
      this.rationVerify = data;
      if(this.rationVerify && this.rationVerify.success === true) {
        this.registerForm.controls['owner_name'].disable();
        this.registerForm.controls['father_name'].disable();
        this.rsuccess = true;
        this.rationVerifyBtn = false;
        this.rationVerify.success = true;
      } else {
        this.registerForm.controls['owner_name'].enable();
        this.registerForm.controls['father_name'].enable();
        this.rerror = true;
      }
      window.scroll(0,0);
    }, error => {
       this.spinner.hide();
    });
  }
}