import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inland-society-add-member',
  templateUrl: './inland-society-add-member.component.html',
  styleUrls: ['./inland-society-add-member.component.css']
})
export class InlandSocietyAddMemberComponent implements OnInit {
  inlandSocietyMembersForm: FormGroup;
  addedSocietyMembersList: any = [];
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
  delete_success: boolean;
  delete_error: boolean;
  inlandSocietyListId: any;
  deleteData: any = [];
  addInlandSocietyMember: any = [];
  showVerifyBtn: boolean;
  adharVerify: any = [];
  rationVerifyBtn: boolean;
  rationVerify: any = [];
  adhar_error: boolean;
  adhar_success: boolean;
  error1: boolean;
  success1: boolean;
  p: any;
  gender: any = 'M';
  verifyGenderMale : boolean = false;
  verifyGenderFemale : boolean = false;
  certificateMandatory: boolean;
  waterBodyPagination: boolean;
  reference: any;
  employment_status: string;
  society_type: string;
  error_society_type: boolean;

  constructor(private route: ActivatedRoute, private vesselRegistrationService: VesselRegistrationService, 
    private formBuilder: FormBuilder,  private spinner: NgxSpinnerService, private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.inlandSocietyMembersForm = this.formBuilder.group({
      member_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required, Validators.minLength(12)]],
      ration_card: [''],
      gender: ['',[Validators.required]],
      // status: ['',[Validators.required]],
      mobile_number: ['', [Validators.required, Validators.minLength(10)]],
      Swimming: [{value:true,disabled: true}],
      netting: [''],
      NetSewing: [''],
      fish_vendor: [''],
      activeFishermen:[''],
      certificate_number: [''],
      age: ['',[Validators.required]],
      employment_status: ['',[Validators.required]],
      date_of_birth: ['',[Validators.required]],
      social_status: ['',[Validators.required]],
      is_president: ['',[Validators.required]]
    });
    this.employment_status = 'UnEmployed';
    this.society_type = this.storage.get('society_type') === "Inland FisherMen" ? "Male" : "Female";
    this.genderSelection(this.society_type);
  //  this.inlandSocietyMembersForm.controls['gender'].disable();
    const vid = +this.route.snapshot.paramMap.get('id');
    const member_id = 10;
    this.vesselRegistrationService.addedInlandSocietyMembers(vid,member_id).subscribe(data => {
      this.addedSocietyMembersList = data;
      //  var ind = this.addedSocietyMembersList.findIndex(obj=>obj.is_president === true)
      if(this.addedSocietyMembersList.findIndex(obj=>obj.is_president == true) > -1) {
        this.inlandSocietyMembersForm.get('is_president').disable();
      }
      this.waterBodyPagination = this.addedSocietyMembersList && this.addedSocietyMembersList.length > 6 ? true : false; 
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
  checkCertificate() {
    this.certificateMandatory = false;
    if(this.inlandSocietyMembersForm.controls.status.value !== 'OC') {
      this.certificateMandatory = true;
    }
  }

  vid(vid: any) {
    throw new Error("Method not implemented.");
  }
  get f() { return this.inlandSocietyMembersForm.controls; }

  onSubmit(inlandSocietyMembersForm) {
    this.spinner.show();
    this.submitted = true;
    this.error = false;
    this.success = false;
    this.fishermanChk = true;
    if(this.netting != undefined && this.NetSewing != undefined && (this.netting.nativeElement.checked || this.NetSewing.nativeElement.checked)) {
      this.fishermanChk = false;
    }
    if (this.inlandSocietyMembersForm.invalid || this.certificateMandatory || this.fishermanChk) {
      this.spinner.hide();
      return;
    }
    this.inlandSocietyMembersForm.value.society_id = this.route.snapshot.paramMap.get('id');
    this.inlandSocietyMembersForm.value.Swimming = this.Swimming && this.Swimming.nativeElement ? this.Swimming.nativeElement.checked : null;
    this.inlandSocietyMembersForm.value.NetSewing = this.NetSewing && this.NetSewing.nativeElement ? this.NetSewing.nativeElement.checked : null;
    this.inlandSocietyMembersForm.value.netting = this.netting && this.netting.nativeElement ? this.netting.nativeElement.checked : null;
    this.inlandSocietyMembersForm.value.fish_vendor = this.fishVendor && this.fishVendor.nativeElement ? this.fishVendor.nativeElement.checked : null;
    this.inlandSocietyMembersForm.value.is_president = this.isPresident && this.isPresident.nativeElement ? this.isPresident.nativeElement.checked : null;
    if(this.rationVerify && (this.inlandSocietyMembersForm.controls['member_name'].status === "DISABLED" ||
    this.inlandSocietyMembersForm.controls['date_of_birth'].status === "DISABLED" ||
    this.inlandSocietyMembersForm.controls['age'].status === "DISABLED" ||
    this.inlandSocietyMembersForm.controls['gender'].status === "DISABLED")) {
      this.inlandSocietyMembersForm.value.date_of_birth = new Date(this.rationVerify.date_of_birth);
      this.inlandSocietyMembersForm.value.age =  this.rationVerify.age;
      this.inlandSocietyMembersForm.value.gender =  this.rationVerify.gender;
      this.inlandSocietyMembersForm.value.member_name =  this.rationVerify.owner_name;
    }
    this.inlandSocietyMembersForm.value.reference = this.reference;
    this.inlandSocietyMembersForm.value.userId = this.storage.get("user_id");
    this.inlandSocietyMembersForm.value.date_of_birth = new Date(this.inlandSocietyMembersForm.value.date_of_birth).toDateString();
    this.vesselRegistrationService.editInlandSocietyMember(this.inlandSocietyMembersForm.value.society_id, this.inlandSocietyMembersForm.value).subscribe(data => {
      this.spinner.hide();
      this.addInlandSocietyMember = data;
      if (this.addInlandSocietyMember && this.addInlandSocietyMember.status === true) {
        location.reload();
        console.log(this.addInlandSocietyMember.message);
        this.success = true;
      } else {
        this.error = true;
      }
      window.scroll(0, 0);
      this.enableFields();
      this.submitted = false;
      this.inlandSocietyMembersForm.reset({});
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

  deleteSmember(inlandSocietyMember) {
    this.spinner.show();
    this.delete_success = false;
    this.delete_error = false;
    this.inlandSocietyListId = inlandSocietyMember;
    this.vesselRegistrationService.deleteInlandMember(this.inlandSocietyListId.id).subscribe(data => {
      this.spinner.hide();
      this.deleteData = data;
      if(this.deleteData.success == true) {
        this.delete_success = true;
        window.scroll(0,0);
      } else {
      this.delete_error = true;
      window.scroll(0,0);
    }
    },error=>{
      this.spinner.hide();
    });
  }

  editSmember(inlandSocietyMember) {
    this.router.navigate(["dashboard/editinland_society_member", this.route.snapshot.paramMap.get('id'),inlandSocietyMember.id])
  }

  getVerifyBtn(inputType) {
    if(inputType === "Aadhar") {
      this.showVerifyBtn = false;
      this.adharVerify.success = false;
      if(this.inlandSocietyMembersForm.controls.aadhaar_number.value && this.inlandSocietyMembersForm.controls.aadhaar_number.value.length === 12) {
      this.showVerifyBtn = true;
      }
    } else if(inputType === "RationCard") {
      this.rationVerifyBtn = false;
      this.rationVerify.success = false;
      if(this.inlandSocietyMembersForm.controls.ration_card.value && this.inlandSocietyMembersForm.controls.ration_card.value.length === 15) {
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
    this.error_society_type = false;
    this.spinner.show();
    let  rationNum = this.inlandSocietyMembersForm.controls.ration_card.value;
    let adhNum = this.inlandSocietyMembersForm.controls.aadhaar_number.value;
    this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
      this.spinner.hide();
      this.rationVerify = data;
      if(this.rationVerify && this.rationVerify.success === true) {
        this.inlandSocietyMembersForm.controls['date_of_birth'].setValue(new Date(this.rationVerify.date_of_birth));
        this.rationVerify && this.rationVerify.age ? this.inlandSocietyMembersForm.controls['age'].disable() :  this.inlandSocietyMembersForm.controls['age'].enable();
        this.rationVerify && this.rationVerify.owner_name ? this.inlandSocietyMembersForm.controls['member_name'].disable() :  this.inlandSocietyMembersForm.controls['member_name'].enable();
        this.rationVerify && this.rationVerify.date_of_birth ? this.inlandSocietyMembersForm.controls['date_of_birth'].disable() :  this.inlandSocietyMembersForm.controls['date_of_birth'].enable();
        // this.rationVerify && this.rationVerify.gender ? this.inlandSocietyMembersForm.controls['gender'].disable() :  this.inlandSocietyMembersForm.controls['gender'].enable();
       if(this.rationVerify && this.rationVerify.gender == this.society_type) {
        this.inlandSocietyMembersForm.controls['gender'].disable();
       } else {
         this.error_society_type = true;
       }
        // age,employment_status,social_status,dob
        this.success1 = true;
        this.rationVerifyBtn = false;
        this.rationVerify.success = true;
        this.genderSelection(this.rationVerify.gender);
      } else {
        this.error1 = true;
        this.enableFields();
      }
      // this.verifyGender = this.rationVerify && this.rationVerify.gender && this.rationVerify.gender === "Male" ? true : false;
      window.scroll(0,0);
    }, error => {
       this.spinner.hide();
       this.enableFields();
    });
  }
  pageChanged(event) {
    this.p = event;
  }
  enableFields() {
    this.inlandSocietyMembersForm.controls['age'].enable();
    this.inlandSocietyMembersForm.controls['gender'].enable();
    this.inlandSocietyMembersForm.controls['member_name'].enable();
    this.inlandSocietyMembersForm.controls['date_of_birth'].enable();
  }
}
