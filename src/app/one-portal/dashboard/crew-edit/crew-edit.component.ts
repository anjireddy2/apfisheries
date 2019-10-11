import { Component, OnInit,Input, Inject, ChangeDetectorRef  } from '@angular/core';
import {VesselRegistrationService} from '../vessel-registration.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-crew-edit',
  templateUrl: './crew-edit.component.html',
  styleUrls: ['./crew-edit.component.css']
})
export class CrewEditComponent implements OnInit {
  minDate = new Date(); 
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
  EditCrewMember:any = [];
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
  edit_success: boolean;
  edit_error: boolean;
  crewUpdate = true;
  updatedData : any = [];
  bankList: any = [];
  bank_act_chk: boolean;
  ifsc_chk: boolean;
  age_chk: boolean;
 

  constructor(private router:Router,private formBuilder: FormBuilder,private vesselRegistrationService: VesselRegistrationService,private _http: HttpClient, 
    private spinner: NgxSpinnerService, private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.spinner.show();
    this.crewUserRegisterForm = this.formBuilder.group({
      aadhaar_number: ['', [Validators.required,Validators.minLength(12)]],
      bank_account_number: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      ration_card: [''],
      email_id: ['',Validators.email],
      ifsc_code: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
      mobile_number: ['', [Validators.required,Validators.minLength(10),Validators.pattern('[1-9][0-9]{9}')]],
      bank_name: ['', Validators.required],
      father_name: ['', Validators.required],
      owner_name: ['', Validators.required],
      social_status: [''],
      employment_status: [''],
      gender: ['', Validators.required],
      age: [''],
      date_of_birth: [''],
      bank_others_name: ['',[Validators.required]]
  });
  const id =  this.route.snapshot.paramMap.get("id");
  const vesselId =  this.route.snapshot.paramMap.get("vessel_id");
  this.spinner.show();
    this.vesselRegistrationService.editCrewMember(vesselId,id).subscribe(data => {
      this.spinner.hide();
      this.EditCrewMember = data['message'];
      this.changeDetectorRef.detectChanges();
      this.getVerifyBtn('Aadhar');
      this.getVerifyBtn('RationCard');
      this.checkZeros('ifsc_code');
      this.checkZeros('bank_account_number');
      this.checkZeros('age');
      this.EditCrewMember.member_employement_status == "" ? this.crewUserRegisterForm.controls['employment_status'].setValue("undefined"): this.EditCrewMember.member_employment_status;
      this.EditCrewMember.member_social_status == "" ? this.crewUserRegisterForm.controls['social_status'].setValue("undefined") : this.EditCrewMember.member_social_status;
    },error=>{
      this.spinner.hide();
    });
    this.vesselRegistrationService.getBankList().subscribe(data => {
      if(data.success && data.banks.length > 0) {
        data.banks.forEach(element => {
          this.bankList.push({value:element})
        });
      }
    });
}
  
  get f() { return this.crewUserRegisterForm.controls; }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  checkZeros(type) {
    if(type == 'bank_account_number') {
      this.bank_act_chk = this.crewUserRegisterForm.value.bank_account_number != '' && /^0*$/.test(this.crewUserRegisterForm.value.bank_account_number) ? true : false;
    } else if(type == 'ifsc_code') {
      this.ifsc_chk = this.crewUserRegisterForm.value.ifsc_code!= '' && /^0*$/.test(this.crewUserRegisterForm.value.ifsc_code) ? true : false;
    } else if(type == 'age') {
      this.age_chk = this.crewUserRegisterForm.value.age!= '' && /^0*$/.test(this.crewUserRegisterForm.value.age) ? true : false;
    }
  }

  pageChanged(event) {
    this.p = event;
  }

  onClickUpdate(crewUserRegisterForm) {
    this.spinner.show();
    this.error = false;
    this.success = false;
    this.submitted = true;
    let vesselId = this.route.snapshot.paramMap.get("vessel_id");
    if(this.crewUserRegisterForm.value.bank_name != 'others') {
      this.crewUserRegisterForm.controls['bank_others_name'].setErrors(null);
    }
    if (this.crewUserRegisterForm.invalid || this.bank_act_chk || this.ifsc_chk || this.age_chk) {
      this.spinner.hide();
      return;
    }
    if(this.crewUserRegisterForm.controls['owner_name'].status === "DISABLED") {
      this.crewUserRegisterForm.value.father_name =  this.rationVerify.father_name;
      this.crewUserRegisterForm.value.owner_name =  this.rationVerify.owner_name;
      this.crewUserRegisterForm.value.gender =  this.rationVerify.gender;
      this.crewUserRegisterForm.value.age =  this.rationVerify.age;
      this.crewUserRegisterForm.value.date_of_birth =  this.rationVerify.date_of_birth;
    }
    this.crewUserRegisterForm.value.reference = this.adharVerify.ref_no;
    this.crewUserRegisterForm.value.userId = this.storage.get("user_id");
    this.crewUserRegisterForm.value.date_of_birth = this.crewUserRegisterForm.value.date_of_birth ? new Date(this.crewUserRegisterForm.value.date_of_birth).toDateString() : null;

    this.vesselRegistrationService.updateCrewMember(vesselId, this.EditCrewMember.id, this.crewUserRegisterForm.value).subscribe(data => {
      this.spinner.hide();
      this.updatedData = data;
      //  this.crewMemberList = data['message'];
      if(this.updatedData && this.updatedData.success == true) {
        // this.crewUserRegisterForm.reset();
        this.success = true;
        this.router.navigate(['/dashboard/crew_user_vessel',vesselId]);
      } else {
        this.error = true;
      }
      window.scroll(0,0);
      setTimeout(() => {
        this.success = false;
        this.error = false;
        }, 3000); 
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
        this.reference = this.adharVerify.ref_no;
       this.adharVerify.success = true;
      } else {
        this.adharVerify.error = true;
        this.adhar_error = true;
      }
      window.scroll(0,0);
      setTimeout(() => {
        this.adhar_error = false;
        this.adhar_success = false;
        }, 3000); 
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
        this.crewUserRegisterForm.controls['gender'].disable();
        this.crewUserRegisterForm.controls['age'].disable();
        this.crewUserRegisterForm.controls['date_of_birth'].disable();
        this.EditCrewMember.member_name = this.rationVerify.owner_name;
        this.EditCrewMember.memner_father_name = this.rationVerify.father_name;
        this.EditCrewMember.member_gender = this.rationVerify.gender;
        this.EditCrewMember.member_age = this.rationVerify.age;
        this.EditCrewMember.member_date_of_birth = this.rationVerify.date_of_birth;
        this.rsuccess = true;
        this.rationVerifyBtn = false;
        this.rationVerify.success = true;
      } else {
        this.crewUserRegisterForm.controls['owner_name'].enable();
        this.crewUserRegisterForm.controls['father_name'].enable();
        this.crewUserRegisterForm.controls['gender'].enable();
        this.crewUserRegisterForm.controls['age'].enable();
        this.crewUserRegisterForm.controls['date_of_birth'].enable();
        this.rerror = true;
      }
      window.scroll(0,0);
      setTimeout(() => {
        this.rerror = false;
        this.rsuccess = false;
        }, 3000); 
    }, error => {
       this.spinner.hide();
    });
  }
}
