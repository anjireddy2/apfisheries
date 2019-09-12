import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VesselRegistrationService } from '../vessel-registration.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-society-member',
  templateUrl: './edit-society-member.component.html',
  styleUrls: ['./edit-society-member.component.css']
})
export class EditSocietyMemberComponent implements OnInit {
  editSocietyMembersForm : FormGroup;
  submitted: boolean;
  error: boolean;
  success: boolean;
  fishermanChk: boolean;
  @ViewChild('netting', {static : false}) netting: ElementRef;
  @ViewChild('NetSewing', {static : false}) NetSewing: ElementRef;
  @ViewChild('Swimming', {static : false}) Swimming: ElementRef;
  error1: boolean;
  success1: boolean;
  rationVerify: any = [];
  rationVerifyBtn: boolean;
  adhar_error: boolean;
  adhar_success: boolean;
  adharVerify: any = [];
  showVerifyBtn: boolean;
  reference: any;
  constructor(private route: ActivatedRoute, private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder,  
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.editSocietyMembersForm = this.formBuilder.group({
      vessel_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required, Validators.minLength(12)]],
      ration_card: [''],
      mobile_number: ['', [Validators.required, Validators.minLength(10)]],
      Swimming: [{value:true,disabled: true}],
      netting: [''],
      NetSewing: ['']
   });

   const vid = +this.route.snapshot.paramMap.get('id');
  //  this.vesselRegistrationService.addSociety(vid).subscribe(data => {
  //    this.addSocietMember1 = data;
  //    //alert();
  //    console.log(this.addSocietMember1.message);
  //  });
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
    this.fishermanChk = true;
    if(this.netting.nativeElement.checked || this.NetSewing.nativeElement.checked) {
      this.fishermanChk = false;
    }
    if (this.editSocietyMembersForm.invalid) {
      return;
    }
    this.editSocietyMembersForm.value.society_id = this.route.snapshot.paramMap.get('id');
    this.editSocietyMembersForm.value.Swimming = this.Swimming.nativeElement.checked;
    this.editSocietyMembersForm.value.NetSewing = this.NetSewing.nativeElement.checked;
    this.editSocietyMembersForm.value.netting = this.netting.nativeElement.checked;
  //    this.vesselRegistrationService.addsocietymember(this.editSocietyMembersForm.value).subscribe(data => {
  //      this.spinner.hide();
  //      this.addsocietyMember = data;
  //      if (this.addsocietyMember && this.addsocietyMember.status === true) {
  //        location.reload();
  //        console.log(this.addsocietyMember.message);
  //        this.success = true;
  //        window.scroll(0, 0);
  //      } else {
  //        this.error = true;
  //        window.scroll(0, 0);
  //      }
  //  }, error => {
  //    this.spinner.hide();
  //  });
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
    this.adhar_error = false;
    this.adhar_success = false;
    let  adhNum = ((document.getElementById("adharId") as HTMLInputElement).value);
    this.vesselRegistrationService.adharVerify(adhNum).subscribe(data => {
      this.adharVerify = data;
      if(this.adharVerify && this.adharVerify.success === true) {
        this.adhar_success = true;
        window.scroll(0,0);
        this.showVerifyBtn = false;
        this.reference = this.adharVerify.message;
        this.adharVerify.success = true;
      } else {
        this.adharVerify.error = true;
        this.adhar_error = true;
        window.scroll(0,0);
      
      }
    }, error => {
      this.spinner.hide();
    });
  }

  getRation() {
    this.error1 = false;
    this.success1 = false;
    this.spinner.show();
    let  rationNum = this.editSocietyMembersForm.controls.ration_card.value;
    let adhNum = this.editSocietyMembersForm.controls.aadhaar_number.value;
    this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
      this.spinner.hide();
      this.rationVerify = data;
      if(this.rationVerify && this.rationVerify.success === true) {
        this.editSocietyMembersForm.controls['vessel_name'].disable();
        // this.editSocietyMembersForm.controls['father_name'].disable();
        this.success1 = true;
        window.scroll(0,0);
        this.rationVerifyBtn = false;
        this.rationVerify.success = true;
      } else {
        this.editSocietyMembersForm.controls['vessel_name'].enable();
        // this.editSocietyMembersForm.controls['father_name'].disable();
        this.error1 = true;
        window.scroll(0,0);
      }
    }, error => {
      this.spinner.hide();
    });
  }
}
