import { Component, OnInit } from '@angular/core';
import {VesselRegistrationService} from '../vessel-registration.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editvessel',
  templateUrl: './editvessel.component.html',
  styleUrls: ['./editvessel.component.css']
})
export class EditvesselComponent implements OnInit {
  updateForm: FormGroup;
  submitted = false;
  successsms = false;
  editVessel:any = []; 
  Dist:any = [];
  Mandals:any = [];
  Flcs:any = [];
  Panchayats:any = [];
  VesselLists: any = [];
  registerData:any = [];
  adharVerify:any =[];
  vesselUpdate:any = [];
  distId:number;
  mandalId:number;
  flcid:number;
  success = false;
  error = false;
  success1 = false;
  error1 = false;
  errMsgs: any;
  a: string | number | Date;
  errorlist: any;
  showVerifyBtn: boolean;
  rationVerifyBtn: boolean;
  rationVerify: any = [];
  reference: any;
  adhar_error: boolean;
  adhar_success: boolean;
  constructor(private formBuilder: FormBuilder,private vesselRegistrationService: VesselRegistrationService, private route: ActivatedRoute, private spinner: NgxSpinnerService)
   {

    }


  ngOnInit() {
    
    this.updateForm = this.formBuilder.group({
      owner_name: ['', Validators.required],
      father_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required,Validators.minLength(12)]],
      mobile_number: ['', [Validators.required,Validators.minLength(10)]],
      bank_account_number: ['', [Validators.required,Validators.minLength(12),Validators.maxLength(20)]],
      ration_card: ['', Validators.required],
      ifsc_code: ['', Validators.required],
      bank_name: ['', Validators.required],
      email_id: [''],
      district_name: ['', [Validators.required]],
      mandal: ['', [Validators.required]],
      flc: ['', [Validators.required]],
      vessltype:['', [Validators.required]],
      vessel_number:['', [Validators.required,Validators.minLength(20)]],
      licence_renewal_date:['', [Validators.required]],
      licence_valid_date:['', [Validators.required]],
      mfid_number:[''],
      gill_net_count:[''],
      drag_net_count:[''],
      cast_net_count:[''],
      trawl_net_count:[''],
      life_bouys_count:[''],
      dat_count:[''],
      gps_count:[''],
      fish_finder_count:[''],
      echo_sounder_count:[''],
      
  }); 
    const vid = +this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
    let  distId1 = this.distId;
    this.vesselRegistrationService.vesselEdit(vid).subscribe(data => {
      this.spinner.hide();
      this.editVessel = data;
      this.updateForm.controls['licence_renewal_date'].setValue(new Date(this.editVessel.license_renewed_date));
      this.updateForm.controls['licence_valid_date'].setValue(new Date(this.editVessel.license_valid_upto));
      
      this.distId=this.editVessel.district_id;
      this.mandalId=this.editVessel.mandal_id;
      this.flcid = this.editVessel.fish_landing_center_id;
      this.vesselRegistrationService.getMandal(this.editVessel.district_id).subscribe(data => this.Mandals = data);
      this.vesselRegistrationService.getFlc(this.editVessel.district_id,this.editVessel.mandal_id).subscribe(data => this.Flcs = data);
      this.vesselRegistrationService.getPanchyats(this.editVessel.district_id,this.editVessel.mandal_id).subscribe(data => this.Panchayats = data);
    });
  }
  get f() { return this.updateForm.controls; }

  getMandal() {
    let  distId1 = this.distId;
    this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
  }

  getFlc() {
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    this.vesselRegistrationService.getFlc(distId1,mandalId).subscribe(data => this.Flcs = data); 
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  onClickUpdate(vesselUpdate) {
    this.spinner.show();
    this.submitted = true;
    this.error = false;
    this.success = false;
    if (this.updateForm.invalid) {
      this.spinner.hide();
      return;
    }    
    const vid = +this.route.snapshot.paramMap.get('id');
    this.vesselRegistrationService.updateVessel(vid,this.updateForm.value).subscribe(data => {
      this.spinner.hide();
      this.vesselUpdate = data;
      if(this.vesselUpdate.success == true) {
        this.success = true;
      } else {
      // this.errorlist = this.vesselUpdate.message.split(",");
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
      if(this.updateForm.controls.aadhaar_number.value && this.updateForm.controls.aadhaar_number.value.length === 12) {
      this.showVerifyBtn = true;
      }
    } else if(inputType === "RationCard") {
      this.rationVerifyBtn = false;
      this.rationVerify.success = false;
      if(this.updateForm.controls.ration_card.value && this.updateForm.controls.ration_card.value.length === 15) {
        this.rationVerifyBtn = true;
      }
    } 
  }

  getadhar() {
    this.spinner.show()
    this.adhar_error = false;
    this.adhar_success = false;
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
      window.scroll(0,0);
    }, error => {
      this.spinner.hide();
    });
  }

  getRation() {
    this.error1 = false;
    this.success1 = false;
    this.spinner.show();
    let  rationNum = this.updateForm.controls.ration_card.value;
    let adhNum = this.updateForm.controls.aadhaar_number.value;
    this.vesselRegistrationService.rationVerify(rationNum,adhNum).subscribe(data => {
      this.spinner.hide();
      this.rationVerify = data;
      if(this.rationVerify && this.rationVerify.success === true) {
        this.updateForm.controls['owner_name'].disable();
        this.updateForm.controls['father_name'].disable();
        this.success1 = true;
        this.rationVerifyBtn = false;
        this.rationVerify.success = true;
      } else {
        this.updateForm.controls['owner_name'].enable();
        this.updateForm.controls['father_name'].enable();
        this.error1 = true;
      }
      window.scroll(0,0);
    }, error => {
       this.spinner.hide();
    });
  }
}