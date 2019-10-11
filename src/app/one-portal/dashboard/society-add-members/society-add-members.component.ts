import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-society-add-members',
  templateUrl: './society-add-members.component.html',
  styleUrls: ['./society-add-members.component.css']
})
export class SocietyAddMembersComponent implements OnInit {
  minDate = new Date(); 
  waterBodyPagination = false;
  societyMembersForm: FormGroup;
  submitted = false;
  addsocietyMember: any = [];
  addSocietMember1 :any =[];
  adharVerify:any =[];
  success = false;
  error = false;
  success1 = false;
  error1 = false;
  delete_success= false;
  delete_error= false;
  user: any;
  fishermanChk: boolean;
  @ViewChild('netting', {static : false}) netting: ElementRef;
  @ViewChild('NetSewing', {static : false}) NetSewing: ElementRef;
  @ViewChild('Swimming', {static : false}) Swimming: ElementRef;
  @ViewChild('fishVendor', {static : false}) fishVendor: ElementRef;
  @ViewChild('isPresident', {static : false}) isPresident: ElementRef;
  societyListId: any;
  showVerifyBtn: boolean;
  rationVerifyBtn: boolean;
  rationVerify: any = [];
  reference: any;
  adhar_error: boolean;
  adhar_success: boolean;
  p: any;
  deleteData:any = [] ;
  verifyGenderMale: boolean;
  verifyGenderFemale: boolean;
  society_type: string;
  employment_status: string;
  age_chk: boolean;
  

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private vesselRegistrationService: VesselRegistrationService, 
    private formBuilder: FormBuilder,  private spinner: NgxSpinnerService, 
    private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }



  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.spinner.show();
    this.societyMembersForm = this.formBuilder.group({
      member_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required, Validators.minLength(12)]],
      ration_card: [''],
      social_status: [''],
      employment_status: [''],
      gender: ['', Validators.required],
      age: [''],
      date_of_birth: [''],
    // certificate_number: ['', [Validators.required, Validators.minLength(15)]],
      mobile_number: ['', [Validators.required, Validators.minLength(10),Validators.pattern('[1-9][0-9]{9}')]],
      Swimming: [{value:true,disabled: true}],
      netting: [''],
      NetSewing: [''],
      is_president: [''],
      fish_vendor: [{value:true,disabled: true}]
    });
    this.employment_status = "UnEmployed";
    // this.society_type = this.storage.get('society_type1') == "1" ? "Male" : "Female";
    // if(this.society_type) {
      // this.genderSelection(this.society_type);
      // this.societyMembersForm.controls['gender'].disable();
    // }
    const vid = +this.route.snapshot.paramMap.get('id');
    this.vesselRegistrationService.addSociety(vid).subscribe(data => {
      this.spinner.hide();
      this.addSocietMember1 = data;
      this.waterBodyPagination = this.addSocietMember1 && this.addSocietMember1.length > 6 ? true : false;
    }, error=> {
      this.spinner.hide();
    });
  }
  vid(vid: any) {
    throw new Error("Method not implemented.");
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
      this.age_chk = this.societyMembersForm.value.age!= '' && /^0*$/.test(this.societyMembersForm.value.age) ? true : false;
    }
  }

  get f() { return this.societyMembersForm.controls; }

  onSubmit(societyMembersForm) {
    this.spinner.show();
    this.submitted = true;
    this.error = false;
    this.success = false;
    this.fishermanChk = this.verifyGenderMale ? true : false;
    if(this.netting != undefined && this.NetSewing != undefined && (this.netting.nativeElement.checked || this.NetSewing.nativeElement.checked)) {
      this.fishermanChk = false;
    }
    if (this.fishermanChk || this.societyMembersForm.invalid || this.age_chk) {
      this.spinner.hide();
      return;
    }
    this.societyMembersForm.value.society_id = this.route.snapshot.paramMap.get('id');
    this.societyMembersForm.value.Swimming = this.Swimming && this.Swimming.nativeElement ? this.Swimming.nativeElement.checked : null;
    this.societyMembersForm.value.NetSewing = this.NetSewing && this.NetSewing.nativeElement ? this.NetSewing.nativeElement.checked : null;
    this.societyMembersForm.value.netting = this.netting && this.netting.nativeElement ? this.netting.nativeElement.checked : null;
    this.societyMembersForm.value.fish_vendor = this.fishVendor && this.fishVendor.nativeElement ? this.fishVendor.nativeElement.checked : null;
    this.societyMembersForm.value.is_president = this.isPresident.nativeElement.checked;
    this.societyMembersForm.value.date_of_birth = this.societyMembersForm.value.date_of_birth ? new Date(this.societyMembersForm.value.date_of_birth).toDateString() : null;
    if(this.rationVerify && (this.societyMembersForm.controls['member_name'].status === "DISABLED" ||
    this.societyMembersForm.controls['date_of_birth'].status === "DISABLED" ||
    this.societyMembersForm.controls['age'].status === "DISABLED" ||
    this.societyMembersForm.controls['gender'].status === "DISABLED")) {
      this.societyMembersForm.value.date_of_birth = new Date(this.rationVerify.date_of_birth);
      this.societyMembersForm.value.age =  this.rationVerify.age;
      this.societyMembersForm.value.gender =  this.rationVerify.gender;
      this.societyMembersForm.value.member_name =  this.rationVerify.owner_name;
    }
    this.societyMembersForm.value.reference = this.reference;
    this.societyMembersForm.value.userId = this.storage.get("user_id");
    this.societyMembersForm.value.date_of_birth = new Date(this.societyMembersForm.value.date_of_birth).toDateString();
    this.vesselRegistrationService.addsocietymember(this.societyMembersForm.value).subscribe(data => {
      this.spinner.hide();
      this.addsocietyMember = data;
      if (this.addsocietyMember && this.addsocietyMember.status === true) {
        this.router.navigate(["/dashboard/society_registration"])
        this.success = true;
      } else {
        this.error = true;
      }
      window.scroll(0, 0);
      // this.enableFields();
      // this.submitted = false;
      // this.societyMembersForm.reset({});
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

deleteSmember(societyList, index) {
  //let ind = this.societyMembersForm.findIndex(x=>x.id==this.societyListId.id);
  this.spinner.show();
  this.delete_success = false;
  this.delete_error = false;
  this.societyListId = societyList;
  this.vesselRegistrationService.deletemember(this.societyListId.id).subscribe(data => {
    this.spinner.hide();
     this.deleteData = data;
    if(this.deleteData.success == true) {
      this.delete_success = true;
      window.scroll(0,0);
      this.addSocietMember1.message.splice(index, 1);
    } else {
    // this.errorlist = this.vesselUpdate.message.split(",");
      this.delete_error = true;
      window.scroll(0,0);
    }
  },error=>{
    this.spinner.hide();
  })
}

editSmember(societyMember) {
  this.router.navigate(["dashboard/edit_society_member",this.route.snapshot.paramMap.get('id'),societyMember.id])
}

getVerifyBtn(inputType) {
  if(inputType === "Aadhar") {
    this.showVerifyBtn = false;
    this.adharVerify.success = false;
    if(this.societyMembersForm.controls.aadhaar_number.value && this.societyMembersForm.controls.aadhaar_number.value.length === 12) {
    this.showVerifyBtn = true;
    }
  } else if(inputType === "RationCard") {
    this.rationVerifyBtn = false;
    this.rationVerify.success = false;
    if(this.societyMembersForm.controls.ration_card.value && this.societyMembersForm.controls.ration_card.value.length === 15) {
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
  let  rationNum = this.societyMembersForm.controls.ration_card.value;
  let adhNum = this.societyMembersForm.controls.aadhaar_number.value;
  this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
    this.spinner.hide();
    this.rationVerify = data;
    if(this.rationVerify && this.rationVerify.success === true) {
      this.societyMembersForm.controls['date_of_birth'].setValue(new Date(this.rationVerify.date_of_birth));
      this.rationVerify && this.rationVerify.age ? this.societyMembersForm.controls['age'].disable() :  this.societyMembersForm.controls['age'].enable();
      this.rationVerify && this.rationVerify.owner_name ? this.societyMembersForm.controls['member_name'].disable() :  this.societyMembersForm.controls['member_name'].enable();
      this.rationVerify && this.rationVerify.date_of_birth ? this.societyMembersForm.controls['date_of_birth'].disable() :  this.societyMembersForm.controls['date_of_birth'].enable();
      this.rationVerify && this.rationVerify.gender ? this.societyMembersForm.controls['gender'].disable() :  this.societyMembersForm.controls['gender'].enable();
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
  this.societyMembersForm.controls['age'].enable();
  this.societyMembersForm.controls['gender'].enable();
  this.societyMembersForm.controls['member_name'].enable();
  this.societyMembersForm.controls['date_of_birth'].enable();
}
}


