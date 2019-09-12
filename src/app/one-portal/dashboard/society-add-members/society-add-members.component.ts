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
  societyListId: any;
  showVerifyBtn: boolean;
  rationVerifyBtn: boolean;
  rationVerify: any = [];
  reference: any;
  adhar_error: boolean;
  adhar_success: boolean;
  p: any;
  deleteData:any = [] ;
  reloadiv = false;
  

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder,  private spinner: NgxSpinnerService) { }



  ngOnInit() {

  

    this.societyMembersForm = this.formBuilder.group({
       vessel_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required, Validators.minLength(12)]],
      // status: ['', Validators.required],
      ration_card: [''],
      // certificate_number: ['', [Validators.required, Validators.minLength(15)]],
       mobile_number: ['', [Validators.required, Validators.minLength(10)]],
       Swimming: [{value:true,disabled: true}],
       netting: [''],
       NetSewing: ['']
    });

    const vid = +this.route.snapshot.paramMap.get('id');
    this.vesselRegistrationService.addSociety(vid).subscribe(data => {
      this.addSocietMember1 = data;
      //alert();
      console.log(this.addSocietMember1.message);
    });
  }
  vid(vid: any) {
    throw new Error("Method not implemented.");
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
        location.reload();
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

deleteSmember(societyList)
{
  //let ind = this.societyMembersForm.findIndex(x=>x.id==this.societyListId.id);
  this.delete_success = false;
  this.delete_error = false;
  this.societyListId = societyList;
  // console.log(this.societyListId.id);
  this.vesselRegistrationService.deletemember(this.societyListId.id).subscribe(data => {
    this.spinner.hide();
     this.deleteData = data;
    if(this.deleteData.success == true)
  {
   this.delete_success = true;
   window.scroll(0,0);
   //this.reloadiv = true;
  //  location.reload();
 }
   else
   {
    // this.errorlist = this.vesselUpdate.message.split(",");
     this.delete_error = true;
     window.scroll(0,0);

 
   }
  })
}

editSmember(societyMember) {
  // this.route.navigate("dashboard/edit-society-member")
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

getadhar()
{
  // alert();
  this.adhar_error = false;
  this.adhar_success = false;
  let  adhNum = ((document.getElementById("adharId") as HTMLInputElement).value);
//  alert(adhNum);
  this.vesselRegistrationService.adharVerify(adhNum).subscribe(data => {
    this.adharVerify = data;
    if(this.adharVerify && this.adharVerify.success === true)
    {
      this.adhar_success = true;
      window.scroll(0,0);
      this.showVerifyBtn = false;
      this.reference = this.adharVerify.message;
      this.adharVerify.success = true;
    }
    else
    {
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
  let  rationNum = this.societyMembersForm.controls.ration_card.value;
  let adhNum = this.societyMembersForm.controls.aadhaar_number.value;
  this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
     this.spinner.hide();
    this.rationVerify = data;
    if(this.rationVerify && this.rationVerify.success === true)
    {
      this.societyMembersForm.controls['vessel_name'].disable();
      // this.societyMembersForm.controls['father_name'].disable();

      this.success1 = true;
    window.scroll(0,0);
      this.rationVerifyBtn = false;
      this.rationVerify.success = true;
    }
    else
    {
      this.societyMembersForm.controls['vessel_name'].enable();
      // this.societyMembersForm.controls['father_name'].disable();

      this.error1 = true;
      window.scroll(0,0);
     
    }
  }, error => {
     this.spinner.hide();
  });
}
pageChanged(event) {
  this.p = event;
}
}


