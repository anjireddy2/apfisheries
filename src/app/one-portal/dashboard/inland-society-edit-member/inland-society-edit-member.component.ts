import { Component, OnInit, ElementRef, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-inland-society-edit-member',
  templateUrl: './inland-society-edit-member.component.html',
  styleUrls: ['./inland-society-edit-member.component.css']
})
export class InlandSocietyEditMemberComponent implements OnInit {
  editInlandSocietyMembersForm: FormGroup;
  editInlandSocietyData: any = [];
  submitted: boolean;
  error: boolean;
  success: boolean;
  fishermanChk: boolean;
  @ViewChild('netting', {static : false}) netting: ElementRef;
  @ViewChild('NetSewing', {static : false}) NetSewing: ElementRef;
  @ViewChild('Swimming', {static : false}) Swimming: ElementRef;
  @ViewChild('activeFishermen', {static : false}) activeFishermen: ElementRef;
  @ViewChild('fishVendor', {static : false}) fishVendor: ElementRef;
  @ViewChild('isPresident', {static : false}) isPresident: ElementRef;
  inlandSocietyListId: any;
  editInlandSocietyMember: any = [];
  showVerifyBtn: boolean;
  adharVerify: any = [];
  rationVerifyBtn: boolean;
  rationVerify: any = [];
  adhar_error: boolean;
  adhar_success: boolean;
  error1: boolean;
  success1: boolean;
  gender: any = 'M';
  certificateMandatory: boolean;
  verifyGenderMale: boolean;
  verifyGenderFemale: boolean;
  reference: any;

  constructor(private route: ActivatedRoute, private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder,  
    private spinner: NgxSpinnerService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private changeDetectorRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.editInlandSocietyMembersForm = this.formBuilder.group({
      member_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required, Validators.minLength(12)]],
      ration_card: [''],
      social_status: ['',[Validators.required]],
      mobile_number: ['', [Validators.required, Validators.minLength(10)]],
      Swimming: [{value:true,disabled: true}],
      netting: [''],
      NetSewing: [''],
      activeFishermen:[''],
      fish_vendor: [''],
      is_president: ['',[Validators.required]],
      certificate_number: [''],
      gender: ['',[Validators.required]],
      date_of_birth: ['',[Validators.required]],
      employment_status: ['',[Validators.required]],
      age: ['',Validators.required]
   });

   const vid = +this.route.snapshot.paramMap.get('id');
   let society_id = this.route.snapshot.paramMap.get('society_id');
   let society_member_id = this.route.snapshot.paramMap.get('society_member_id');
     
   this.vesselRegistrationService.getInlandSocietyMembers(society_id).subscribe(data => {
     this.spinner.hide();
     this.editInlandSocietyData = data['message'];
     this.editInlandSocietyMembersForm.controls['is_president'].disable();
     this.genderSelection(this.editInlandSocietyData.gender);
     this.changeDetectorRef.detectChanges();
     this.isPresident.nativeElement.checked = this.editInlandSocietyData.is_president ? true : false;  
     if(this.editInlandSocietyData.member_date_of_birth) {  
       this.editInlandSocietyMembersForm.controls['date_of_birth'].setValue(new Date(this.editInlandSocietyData.member_date_of_birth));
     }
     if(this.netting != undefined) {
       this.netting.nativeElement.checked = this.editInlandSocietyData.netting ? true : false;
       this.NetSewing.nativeElement.checked = this.editInlandSocietyData.net_sweing ? true : false;
     }
     if(this.fishVendor != undefined) {
       this.fishVendor.nativeElement.checked = this.fishVendor != undefined && this.editInlandSocietyData.fish_vendor ? true : false;
     }
   });
  }
  checkCertificate() {
    this.certificateMandatory = false;
    if(this.editInlandSocietyMembersForm.controls.status.value !== 'OC') {
      this.certificateMandatory = true;
    }
  }

  genderSelection(gender) {
    if(gender) {
      this.verifyGenderMale = false;
      this.verifyGenderFemale = false;
      this.verifyGenderMale = gender === 'Male' ? true : false;
      this.verifyGenderFemale = gender === 'Female' ? true : false;
    }
    // this.verifyGenderMale = this.societyMembersForm.value.gender && this.societyMembersForm.value.gender === 'Male' ? true : false;
    // this.verifyGenderFemale = this.societyMembersForm.value.gender && this.societyMembersForm.value.gender === 'Female' ? true : false;
  }
  get f() { return this.editInlandSocietyMembersForm.controls; }

  onSubmit(inlandSocietyMembersForm) {
    this.spinner.show();
    this.submitted = true;
    this.error = false;
    this.success = false;
    this.fishermanChk = true;
    this.fishermanChk = this.verifyGenderMale ? true : false;
    if(this.netting != undefined && this.NetSewing != undefined && (this.netting.nativeElement.checked || this.NetSewing.nativeElement.checked)) {
      this.fishermanChk = false;
    }
    if (this.fishermanChk || this.editInlandSocietyMembersForm.invalid) {
      this.spinner.hide();
      return;
    }
    this.editInlandSocietyMembersForm.value.society_id = this.route.snapshot.paramMap.get('society_id');
    this.editInlandSocietyMembersForm.value.society_member_id = this.route.snapshot.paramMap.get('society_member_id');
    this.editInlandSocietyMembersForm.value.Swimming = this.Swimming && this.Swimming.nativeElement ? this.Swimming.nativeElement.checked : null;
    this.editInlandSocietyMembersForm.value.NetSewing = this.NetSewing && this.NetSewing.nativeElement ? this.NetSewing.nativeElement.checked : null;
    this.editInlandSocietyMembersForm.value.netting = this.netting && this.netting.nativeElement ? this.netting.nativeElement.checked : null;
    this.editInlandSocietyMembersForm.value.fish_vendor = this.fishVendor && this.fishVendor.nativeElement ? this.fishVendor.nativeElement.checked : null;
    this.editInlandSocietyMembersForm.value.is_president = this.isPresident.nativeElement.checked;
    if(this.rationVerify && (this.editInlandSocietyMembersForm.controls['member_name'].status === "DISABLED" ||
    this.editInlandSocietyMembersForm.controls['date_of_birth'].status === "DISABLED" ||
    this.editInlandSocietyMembersForm.controls['age'].status === "DISABLED" ||
    this.editInlandSocietyMembersForm.controls['gender'].status === "DISABLED")) {
      this.editInlandSocietyMembersForm.value.date_of_birth = new Date(this.rationVerify.date_of_birth);
      this.editInlandSocietyMembersForm.value.age =  this.rationVerify.age;
      this.editInlandSocietyMembersForm.value.gender =  this.rationVerify.gender;
      this.editInlandSocietyMembersForm.value.member_name =  this.rationVerify.owner_name;
      }
      this.editInlandSocietyMembersForm.value.reference = this.reference;
      this.editInlandSocietyMembersForm.value.userId = this.storage.get("user_id");
      this.editInlandSocietyMembersForm.value.date_of_birth = new Date(this.editInlandSocietyMembersForm.value.date_of_birth).toDateString();
    this.vesselRegistrationService.editInlandSocietyMember(this.editInlandSocietyMembersForm.value.society_id, this.editInlandSocietyMembersForm.value).subscribe(data => {
      this.spinner.hide();
      this.editInlandSocietyMember = data;
      if (this.editInlandSocietyMember && this.editInlandSocietyMember.status === true) {
        location.reload();
        console.log(this.editInlandSocietyMember.message);
        this.success = true;
        window.scroll(0, 0);
      } else {
        this.error = true;
        window.scroll(0, 0);
      }
  }, error => {
    this.spinner.hide();
  });
}
  onlyNumberKey(event) {
      return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  toggleChk() {
    this.fishermanChk = true;
    if (this.netting.nativeElement.checked || this.NetSewing.nativeElement.checked) {
      this.fishermanChk = false;
    }
  }


  getVerifyBtn(inputType) {
    if(inputType === "Aadhar") {
      this.showVerifyBtn = false;
      this.adharVerify.success = false;
      if(this.editInlandSocietyMembersForm.controls.aadhaar_number.value && this.editInlandSocietyMembersForm.controls.aadhaar_number.value.length === 12) {
      this.showVerifyBtn = true;
      }
    } else if(inputType === "RationCard") {
      this.rationVerifyBtn = false;
      this.rationVerify.success = false;
      if(this.editInlandSocietyMembersForm.controls.ration_card.value && this.editInlandSocietyMembersForm.controls.ration_card.value.length === 15) {
        this.rationVerifyBtn = true;
      }
    } 
  }

  getadhar() {
    this.spinner.show();
    this.adhar_error = false;
    this.adhar_success = false;
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
    this.error1 = false;
  this.success1 = false;
  this.verifyGenderMale = false;
  this.verifyGenderFemale = false;
  this.spinner.show();
  let  rationNum = this.editInlandSocietyMembersForm.controls.ration_card.value;
  let adhNum = this.editInlandSocietyMembersForm.controls.aadhaar_number.value;
  this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
    this.spinner.hide();
    this.rationVerify = data;
    if(this.rationVerify && this.rationVerify.success === true) {
      this.editInlandSocietyMembersForm.controls['date_of_birth'].setValue(new Date(this.rationVerify.date_of_birth));
      this.rationVerify && this.rationVerify.age ? this.editInlandSocietyMembersForm.controls['age'].disable() :  this.editInlandSocietyMembersForm.controls['age'].enable();
      this.rationVerify && this.rationVerify.date_of_birth ? this.editInlandSocietyMembersForm.controls['date_of_birth'].disable() :  this.editInlandSocietyMembersForm.controls['date_of_birth'].enable();
      this.rationVerify && this.rationVerify.gender ? this.editInlandSocietyMembersForm.controls['gender'].disable() :  this.editInlandSocietyMembersForm.controls['gender'].enable();
      this.rationVerify && this.rationVerify.owner_name ? this.editInlandSocietyMembersForm.controls['member_name'].disable() :  this.editInlandSocietyMembersForm.controls['member_name'].enable();
      this.editInlandSocietyData.member_name = this.rationVerify.owner_name;
      this.editInlandSocietyData.gender = this.rationVerify.gender;
      this.editInlandSocietyData.age = this.rationVerify.age;
      this.success1 = true;
      this.rationVerifyBtn = false;
      this.rationVerify.success = true;
      this.genderSelection(this.rationVerify.gender);
    } else {
      this.error1 = true;
      this.enableFiels();
    }
    // this.verifyGender = this.rationVerify && this.rationVerify.gender && this.rationVerify.gender === "Male" ? true : false;
    window.scroll(0,0);
  }, error => {
     this.spinner.hide();
     this.enableFiels();
  });
  }

  enableFiels() {
    this.editInlandSocietyMembersForm.controls['age'].enable();
    this.editInlandSocietyMembersForm.controls['gender'].enable();
    this.editInlandSocietyMembersForm.controls['date_of_birth'].enable();
    this.editInlandSocietyMembersForm.controls['member_name'].enable();
  }

}
