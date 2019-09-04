import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-society-add-members',
  templateUrl: './society-add-members.component.html',
  styleUrls: ['./society-add-members.component.css']
})
export class SocietyAddMembersComponent implements OnInit {
  societyMembersForm: FormGroup;
  submitted = false;
  addsocietyMember: any = [];
  success = false;
  error = false;
  user: any;
  fishermanChk: boolean;
  @ViewChild('netting', {static : false}) netting: ElementRef;
  @ViewChild('NetSewing', {static : false}) NetSewing: ElementRef;
  @ViewChild('Swimming', {static : false}) Swimming: ElementRef;

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder,  private spinner: NgxSpinnerService) { }



  ngOnInit() {
    this.societyMembersForm = this.formBuilder.group({
       vessel_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required, Validators.minLength(12)]],
      status: ['', Validators.required],
      certificate_number: ['', [Validators.required, Validators.minLength(15)]],
       mobile_number: ['', [Validators.required, Validators.minLength(10)]],
       Swimming: [''],
       netting: [''],
       NetSewing: ['']
    });
  }
  get f() { return this.societyMembersForm.controls; }

  onSubmit(societyMembersForm) {
    this.spinner.show();
    this.submitted = true;
    this.error = false;
    this.success = false;
    this.fishermanChk = true;
    if(this.netting.nativeElement.checked || this.NetSewing.nativeElement.checked) {
      this.fishermanChk = false;
    }
    if (this.societyMembersForm.invalid) {
      return;
    }
    this.societyMembersForm.value.society_id = this.route.snapshot.paramMap.get('id');
    this.societyMembersForm.value.Swimming = this.Swimming.nativeElement.checked;
    this.societyMembersForm.value.NetSewing = this.NetSewing.nativeElement.checked;
    this.societyMembersForm.value.netting = this.netting.nativeElement.checked;
    this.vesselRegistrationService.addsocietymember(this.societyMembersForm.value).subscribe(data => {
      this.spinner.hide();
      this.addsocietyMember = data;
      if (this.addsocietyMember && this.addsocietyMember.status === true) {
        console.log(this.addsocietyMember.message);
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
}


