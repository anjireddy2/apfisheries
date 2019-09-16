import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  inlandSocietyListId: any;
  addInlandSocietyMember: any = [];
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

  constructor(private route: ActivatedRoute, private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder,  private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.editInlandSocietyMembersForm = this.formBuilder.group({
      vessel_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required, Validators.minLength(12)]],
      ration_card: [''],
      status: ['',[Validators.required]],
      mobile_number: ['', [Validators.required, Validators.minLength(10)]],
      Swimming: [{value:true,disabled: true}],
      netting: [''],
      NetSewing: [''],
      activeFishermen:[''],
      fishVendor: [''],
      certificate_number: ['']
   });

   const vid = +this.route.snapshot.paramMap.get('id');
   this.vesselRegistrationService.getInlandSocietyMembers(vid).subscribe(data => {
     this.editInlandSocietyData = data;
   });
  }
  checkCertificate() {
    this.certificateMandatory = false;
    if(this.editInlandSocietyMembersForm.controls.status.value !== 'OC') {
      this.certificateMandatory = true;
    }
  }

  vid(vid: any) {
    throw new Error("Method not implemented.");
  }
  get f() { return this.editInlandSocietyMembersForm.controls; }

  onSubmit(inlandSocietyMembersForm) {
    this.spinner.show();
    this.submitted = true;
    this.error = false;
    this.success = false;
    this.fishermanChk = true;
    if(this.netting.nativeElement.checked || this.NetSewing.nativeElement.checked) {
      this.fishermanChk = false;
    }
    if (this.editInlandSocietyMembersForm.invalid || this.certificateMandatory) {
      return;
    }
    this.editInlandSocietyMembersForm.value.inland_society_id = this.route.snapshot.paramMap.get('id');
    this.editInlandSocietyMembersForm.value.Swimming = this.Swimming.nativeElement.checked;
    this.editInlandSocietyMembersForm.value.NetSewing = this.NetSewing.nativeElement.checked;
    this.editInlandSocietyMembersForm.value.netting = this.netting.nativeElement.checked;
    this.editInlandSocietyMembersForm.value.activeFishermen = this.activeFishermen.nativeElement.checked;
    this.vesselRegistrationService.addInlandsocietymember(this.editInlandSocietyMembersForm.value).subscribe(data => {
      this.spinner.hide();
      this.addInlandSocietyMember = data;
      if (this.addInlandSocietyMember && this.addInlandSocietyMember.status === true) {
        location.reload();
        console.log(this.addInlandSocietyMember.message);
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
    this.spinner.show();
    let  rationNum = this.editInlandSocietyMembersForm.controls.ration_card.value;
    let adhNum = this.editInlandSocietyMembersForm.controls.aadhaar_number.value;
    this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
      this.spinner.hide();
      this.rationVerify = data;
      if(this.rationVerify && this.rationVerify.success === true) {
        this.editInlandSocietyMembersForm.controls['vessel_name'].disable();
        this.success1 = true;
        this.rationVerifyBtn = false;
        this.rationVerify.success = true;
      } else {
        this.editInlandSocietyMembersForm.controls['vessel_name'].enable();
        this.error1 = true;
      }
      window.scroll(0,0);
    }, error => {
      this.spinner.hide();
    });
  }

}
