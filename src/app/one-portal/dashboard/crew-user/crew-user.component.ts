import { Component, OnInit,Input, Inject  } from '@angular/core';
import {VesselRegistrationService} from '../vessel-registration.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { $ } from 'protractor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-crew-user',
  templateUrl: './crew-user.component.html',
  styleUrls: ['./crew-user.component.css']
})
export class CrewUserComponent implements OnInit {

  // minDate = new Date(); 
  @Input() private format = 'YYYY/MM/DD';
  crewUserRegisterForm: FormGroup;
  submitted = false;
  verfiy = false;
  Dist:any = [];
  Mandals:any = [];
  Flcs:any = [];
  Panchayats:any = [];
  VesselLists: any = [];
  registerData:any = [];
  adharVerify:any =[];
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
  p: any;
  crewMemberList: any = [];
  waterBodyPagination: boolean;
  delete_success: boolean;
  delete_error: boolean;
  deleteCrewMember: 
  any = [];
 

  constructor(private router:Router,private formBuilder: FormBuilder,private vesselRegistrationService: VesselRegistrationService,private _http: HttpClient, 
    private spinner: NgxSpinnerService, private route: ActivatedRoute, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.spinner.show();
    this.crewUserRegisterForm = this.formBuilder.group({
      aadhaar_number: ['', [Validators.required,Validators.minLength(12)]],
      bank_account_number: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      ration_card: [''],
      email_id: [''],
      ifsc_code: ['', Validators.required],
      mobile_number: ['', Validators.required],
      bank_name: ['', Validators.required],
      father_name: ['', Validators.required],
      owner_name: ['', Validators.required]
  });
  const id =  this.route.snapshot.paramMap.get("id");
  this.vesselRegistrationService.crewMemberList(id).subscribe(data => {
    this.spinner.hide();
    this.crewMemberList = data;
    this.waterBodyPagination = this.crewMemberList && this.crewMemberList.length > 6 ? true : false; 
  }, error=> {
    this.spinner.hide();
  });
}
  
  get f() { return this.crewUserRegisterForm.controls; }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  pageChanged(event) {
    this.p = event;
  }

  onClickSubmit(crewUserRegisterForm) {
    this.spinner.show();
    this.error = false;
    this.success = false;
    this.submitted = true;
    if (this.crewUserRegisterForm.invalid) {
      this.spinner.hide();
      return;
    }
    if(this.crewUserRegisterForm.controls['owner_name'].status === "DISABLED") {
      this.crewUserRegisterForm.value.father_name =  this.rationVerify.father_name;
      this.crewUserRegisterForm.value.owner_name =  this.rationVerify.owner_name;
    }
    this.vesselRegistrationService.createCrewMember(this.crewUserRegisterForm.value).subscribe(data => {
      this.spinner.hide();
      this.registerData = data;
      if(this.registerData && this.registerData.success == true) {
        this.success = true;
        this.router.navigate(['/dashboard/vessel_registration']);
      } else {
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
      if(this.crewUserRegisterForm.controls.aadhaar_number.value && this.crewUserRegisterForm.controls.aadhaar_number.value.length === 12) {
      this.showVerifyBtn = true;
      }
    } else if(inputType === "RationCard") {
      this.rationVerifyBtn = false;
      this.rationVerify.success = false;
      if(this.crewUserRegisterForm.controls.ration_card.value && this.crewUserRegisterForm.controls.ration_card.value.length === 15) {
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
        this.reference = this.adharVerify.message;
        this.adharVerify.success = true;
      } else {
        this.adharVerify.error = true;
        this.adhar_error = true;
      }
    }, error => {
      this.spinner.hide();
    });
  }

  getRation() {
    this.rerror = false;
    this.rsuccess = false;
    this.spinner.show();
    let  rationNum = this.crewUserRegisterForm.controls.ration_card.value;
    let adhNum = this.crewUserRegisterForm.controls.aadhaar_number.value;
    this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
      this.spinner.hide();
      this.rationVerify = data;
      if(this.rationVerify && this.rationVerify.success === true) {
        this.crewUserRegisterForm.controls['owner_name'].disable();
        this.crewUserRegisterForm.controls['father_name'].disable();
        this.rsuccess = true;
        this.rationVerifyBtn = false;
        this.rationVerify.success = true;
      } else {
        this.crewUserRegisterForm.controls['owner_name'].enable();
        this.crewUserRegisterForm.controls['father_name'].enable();
        this.rerror = true;
      }
      window.scroll(0,0);
    }, error => {
       this.spinner.hide();
    });
  }

  deleteCrewUser(crewMemberId, index) {
    this.delete_success = false;
    this.delete_error = false;
    let vesselId = this.route.snapshot.paramMap.get("id");
    this.spinner.show();
    this.vesselRegistrationService.deleteCrewMember(vesselId,crewMemberId).subscribe(data => {
      this.deleteCrewMember = data;
      this.spinner.hide();
      this.crewMemberList.splice(index, 1);
      if(this.deleteCrewMember.success == true) {
        this.delete_success = true;
       } else {
         this.delete_error = true;
      }
      window.scroll(0,0);
    },error=>{
      this.spinner.hide();
    });
  }
}
