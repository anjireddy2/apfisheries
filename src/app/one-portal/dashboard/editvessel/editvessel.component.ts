import { Component, OnInit } from '@angular/core';
import {VesselRegistrationService} from '../vessel-registration.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editvessel',
  templateUrl: './editvessel.component.html',
  styleUrls: ['./editvessel.component.css']
})
export class EditvesselComponent implements OnInit {
  minDate1 = new Date(); 
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
  vesselUpdate:any = [];
  distId:number;
  mandalId:number;
  flcid:number;
  success = false;
  error = false;
  errMsgs: any;
  a: string | number | Date;
  errorlist: any;
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
      // email_id: ['', [Validators.required, Validators.email]],
      // eligible: ['', [Validators.required]],
      district_name: ['', [Validators.required]],
      mandal: ['', [Validators.required]],
      flc: ['', [Validators.required]],
      // Panchayat:['', [Validators.required]],
      vessltype:['', [Validators.required]],
      vessel_number:['', [Validators.required,Validators.minLength(20)]],
      mfid:['', [Validators.required,Validators.minLength(20)]],
      // remarks:['', [Validators.required,Validators.minLength(200)]],
      licence_renewal_date:['', [Validators.required]],
      licence_valid_date:['', [Validators.required]],
      
  }); 
    const vid = +this.route.snapshot.paramMap.get('id');
    //const  xyz ='12-01-1002';
    //console.log(this.a);
    // let  licence_renewal_date = new  Date(xyz);
   // let licence_renewal_date = new FormControl(new Date(xyz));
     

     //this.updateForm.controls['licence_renewal_date'].setValue(new Date(xyz));
     //debugger
     this.spinner.show();
    this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
    let  distId1 = this.distId;
    this.vesselRegistrationService.vesselEdit(vid).subscribe(data => {
      this.spinner.hide();
      this.editVessel = data;
      console.log( this.editVessel)
     
      
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

getMandal()
  {
    let  distId1 = this.distId;
    // alert(distId1);
    this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
  }

  getFlc()
  {
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    this.vesselRegistrationService.getFlc(distId1,mandalId).subscribe(data => this.Flcs = data); 
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  onClickUpdate(vesselUpdate) 
  {
    this.spinner.show();
       this.submitted = true;
       this.error = false;
       this.success = false;

    if (this.updateForm.invalid) {
      this.spinner.hide();
        return;
    }    const vid = +this.route.snapshot.paramMap.get('id');
    this.vesselRegistrationService.updateVessel(vid,this.updateForm.value).subscribe(data => {
      this.spinner.hide();
       this.vesselUpdate = data;
      if(this.vesselUpdate.success == true)
    {
     this.success = true;
     window.scroll(0,0);
   }
     else
     {
      // this.errorlist = this.vesselUpdate.message.split(",");
       this.error = true;
       window.scroll(0,0);

   
     }
   }, error => {
    this.spinner.hide();
  });
 

  }
}
