import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VesselRegistrationService } from '../vessel-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-edit-society-member',
  templateUrl: './edit-society-member.component.html',
  styleUrls: ['./edit-society-member.component.css']
})
export class EditSocietyMemberComponent implements OnInit {
  minDate = new Date(); 
  editSocietyMembersForm : FormGroup;
  submitted: boolean;
  error: boolean;
  success: boolean;
  fishermanChk: boolean;
  @ViewChild('netting', {static : false}) netting: ElementRef;
  @ViewChild('NetSewing', {static : false}) NetSewing: ElementRef;
  @ViewChild('Swimming', {static : false}) Swimming: ElementRef;
  @ViewChild('fishVendor', {static : false}) fishVendor: ElementRef;
  @ViewChild('isPresident', {static : false}) isPresident: ElementRef;
  error1: boolean;
  success1: boolean;
  rationVerify: any = [];
  rationVerifyBtn: boolean;
  adhar_error: boolean;
  adhar_success: boolean;
  adharVerify: any = [];
  showVerifyBtn: boolean;
  reference: any;
  editSocietyMember: any = [];
  updateSocietyMember: any = [];
  verifyGenderMale: boolean;
  verifyGenderFemale: boolean;verifyGender: boolean;
  age_chk: boolean;
  constructor(private router: Router, private route: ActivatedRoute, private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder,  
    private spinner: NgxSpinnerService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.editSocietyMembersForm = this.formBuilder.group({
      member_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required, Validators.minLength(12)]],
      ration_card: [''],
      social_status: [''],
      employment_status: [''],
      gender: ['', Validators.required],
      age: [''],
      date_of_birth: [''],
      mobile_number: ['', [Validators.required, Validators.minLength(10),Validators.pattern('[1-9][0-9]{9}')]],
      Swimming: [{value:true,disabled: true}],
      netting: [''],
      NetSewing: [''],
      is_president: [''],
      fish_vendor: [{value:true,disabled: true}]
   });
    this.spinner.show();
    let society_id = this.route.snapshot.paramMap.get('society_id');
    let society_member_id = this.route.snapshot.paramMap.get('society_member_id');
    this.vesselRegistrationService.editSocietyMember(society_id, society_member_id).subscribe(data => {
      this.spinner.hide();
      this.editSocietyMember = data['message'];
      this.genderSelection(this.editSocietyMember.gender);
      this.changeDetectorRef.detectChanges();
      this.getVerifyBtn('Aadhar');
      this.getVerifyBtn('RationCard');
      this.isPresident.nativeElement.checked = this.editSocietyMember.is_president ? true : false;  
      if(this.editSocietyMember.member_date_of_birth) {  
        this.editSocietyMembersForm.controls['date_of_birth'].setValue(new Date(this.editSocietyMember.member_date_of_birth));
      }
      if(this.netting != undefined) {
        this.netting.nativeElement.checked = this.editSocietyMember.netting ? true : false;
        this.NetSewing.nativeElement.checked = this.editSocietyMember.net_sweing ? true : false;
      }
      if(this.fishVendor != undefined) {
        this.fishVendor.nativeElement.checked = this.fishVendor != undefined && this.editSocietyMember.fish_vendor ? true : false;
      }
    }, error=>{
      this.spinner.hide();
   });
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
  checkZeros(type) {
    if(type == 'age') {
      this.age_chk = this.editSocietyMembersForm.value.age!= '' && /^0*$/.test(this.editSocietyMembersForm.value.age) ? true : false;
    }
  }

  vid(vid: any) {
    throw new Error("Method not implemented.");
  }
  get f() { return this.editSocietyMembersForm.controls; }

  onSubmit(editSocietyMembersForm) {
    this.spinner.show();
    this.submitted = true;
    this.error = false;
    this.success = false;
    this.fishermanChk = this.verifyGenderMale ? true : false;
    if(this.netting != undefined && this.NetSewing != undefined && (this.netting.nativeElement.checked || this.NetSewing.nativeElement.checked)) {
      this.fishermanChk = false;
    }
    if (this.fishermanChk || this.editSocietyMembersForm.invalid || this.age_chk) {
      this.spinner.hide();
      return;
    }
    this.editSocietyMembersForm.value.society_id = this.route.snapshot.paramMap.get('society_id');
    this.editSocietyMembersForm.value.society_member_id = this.route.snapshot.paramMap.get('society_member_id');
    this.editSocietyMembersForm.value.Swimming = this.Swimming && this.Swimming.nativeElement ? this.Swimming.nativeElement.checked : null;
    this.editSocietyMembersForm.value.NetSewing = this.NetSewing && this.NetSewing.nativeElement ? this.NetSewing.nativeElement.checked : null;
    this.editSocietyMembersForm.value.netting = this.netting && this.netting.nativeElement ? this.netting.nativeElement.checked : null;
    this.editSocietyMembersForm.value.fish_vendor = this.fishVendor && this.fishVendor.nativeElement ? this.fishVendor.nativeElement.checked : null;
    this.editSocietyMembersForm.value.is_president = this.isPresident.nativeElement.checked;
    this.editSocietyMembersForm.value.date_of_birth = this.editSocietyMembersForm.value.date_of_birth ? new Date(this.editSocietyMembersForm.value.date_of_birth).toDateString() : null;
    if(this.rationVerify && (this.editSocietyMembersForm.controls['member_name'].status === "DISABLED" ||
    this.editSocietyMembersForm.controls['date_of_birth'].status === "DISABLED" ||
    this.editSocietyMembersForm.controls['age'].status === "DISABLED" ||
    this.editSocietyMembersForm.controls['gender'].status === "DISABLED")) {
      this.editSocietyMembersForm.value.date_of_birth = new Date(this.rationVerify.date_of_birth);
      this.editSocietyMembersForm.value.age =  this.rationVerify.age;
      this.editSocietyMembersForm.value.gender =  this.rationVerify.gender;
      this.editSocietyMembersForm.value.member_name =  this.rationVerify.owner_name;
      }
      this.editSocietyMembersForm.value.reference = this.reference;
      this.editSocietyMembersForm.value.userId = this.storage.get("user_id");
      this.editSocietyMembersForm.value.date_of_birth = new Date(this.editSocietyMembersForm.value.date_of_birth).toDateString();
     this.vesselRegistrationService.updateSocietymember(this.editSocietyMembersForm.value).subscribe(data => {
       this.spinner.hide();
       this.updateSocietyMember = data;
       if (this.updateSocietyMember && this.updateSocietyMember.status === true) {
         this.router.navigate(["dashboard/addsociety_members", this.route.snapshot.paramMap.get('society_id')]);
         this.success = true;
       } else {
         this.error = true;
       }
       window.scroll(0, 0);
       setTimeout(() => {
        this.success = false;
        this.error = false;
        }, 3000);
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
      if(this.editSocietyMembersForm.controls.aadhaar_number.value && this.editSocietyMembersForm.controls.aadhaar_number.value.length === 12) {
      this.showVerifyBtn = true;
      }
    } else if(inputType === "RationCard") {
      this.rationVerifyBtn = false;
      this.rationVerify.success = false;
      if(this.editSocietyMembersForm.controls.ration_card.value && this.editSocietyMembersForm.controls.ration_card.value.length === 15) {
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
      this.adharVerify = data;
      this.spinner.hide();
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
    this.error1 = false;
  this.success1 = false;
  this.verifyGenderMale = false;
  this.verifyGenderFemale = false;
  this.spinner.show();
  let  rationNum = this.editSocietyMembersForm.controls.ration_card.value;
  let adhNum = this.editSocietyMembersForm.controls.aadhaar_number.value;
  this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
    this.spinner.hide();
    this.rationVerify = data;
    if(this.rationVerify && this.rationVerify.success === true) {
      this.editSocietyMembersForm.controls['date_of_birth'].setValue(new Date(this.rationVerify.date_of_birth));
      this.rationVerify && this.rationVerify.age ? this.editSocietyMembersForm.controls['age'].disable() :  this.editSocietyMembersForm.controls['age'].enable();
      this.rationVerify && this.rationVerify.date_of_birth ? this.editSocietyMembersForm.controls['date_of_birth'].disable() :  this.editSocietyMembersForm.controls['date_of_birth'].enable();
      this.rationVerify && this.rationVerify.gender ? this.editSocietyMembersForm.controls['gender'].disable() :  this.editSocietyMembersForm.controls['gender'].enable();
      this.rationVerify && this.rationVerify.owner_name ? this.editSocietyMembersForm.controls['member_name'].disable() :  this.editSocietyMembersForm.controls['member_name'].enable();
      this.editSocietyMember.member_name = this.rationVerify.owner_name;
      this.editSocietyMember.gender = this.rationVerify.gender;
      this.editSocietyMember.age = this.rationVerify.age;
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
    setTimeout(() => {
      this.success1 = false;
      this.error1 = false;
      }, 3000);
  }, error => {
     this.spinner.hide();
     this.enableFiels();
  });
  }

  enableFiels() {
    this.editSocietyMembersForm.controls['age'].enable();
    this.editSocietyMembersForm.controls['gender'].enable();
    this.editSocietyMembersForm.controls['date_of_birth'].enable();
    this.editSocietyMembersForm.controls['member_name'].enable();
  }
}