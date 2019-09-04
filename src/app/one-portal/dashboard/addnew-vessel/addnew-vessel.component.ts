import { Component, OnInit,Input  } from '@angular/core';
import {VesselRegistrationService} from '../vessel-registration.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { $ } from 'protractor';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-addnew-vessel',
  templateUrl: './addnew-vessel.component.html',
  styleUrls: ['./addnew-vessel.component.css']
})
export class AddnewVesselComponent implements OnInit {
  minDate = new Date(); 
  @Input() private format = 'YYYY/MM/DD';
  registerForm: FormGroup;
  submitted = false;
  verfiy = false;
  Dist:any = [];
  Mandals:any = [];
  Flcs:any = [];
  Panchayats:any = [];
  VesselLists: any = [];
  registerData:any = [];
  adharVerify:any =[];
  distId:number;
  mandalId:number;
  flcid:number;
  success = false;
  error = false;
  errMsgs: any;
  userId: any;
  errorlist: any;

  constructor(private formBuilder: FormBuilder,private vesselRegistrationService: VesselRegistrationService,private _http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit() 
  {
    this.registerForm = this.formBuilder.group({
      vessel_name: ['', Validators.required],
      father_name: ['', Validators.required],
      aadhaar_number: ['', [Validators.required,Validators.minLength(12)]],
      mobile_number: ['', [Validators.required,Validators.minLength(10)]],
      bank_account_number: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      // ration_card: ['', Validators.required],
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
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required]
  }); 
  
     this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
    //  console.log(this.Dist);
     this.userId = this.vesselRegistrationService.getUserId();
     console.log(this.userId);
     // f();
  }
  
  get f() { return this.registerForm.controls; }

  getMandal()
  {
    let  distId1 = this.distId;
    this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
  }

  getFlc()
  {
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    this.vesselRegistrationService.getFlc(distId1,mandalId).subscribe(data => this.Flcs = data); 
    this.vesselRegistrationService.getPanchyats(distId1,mandalId).subscribe(data => this.Panchayats = data);

  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  onClickSubmit(registerForm) 
  {
    this.spinner.show();
    this.error = false;
    this.success = false;
     this.submitted = true;

    if (this.registerForm.invalid) {
      this.spinner.hide();
        return;
    }
    let  distId1 = this.distId;
    let mandalId1 = this.mandalId;
    let flcId1 = this.flcid;
    this.registerForm.value.userId=this.userId;
    // console.log(this.registerForm.value.userId);
    this.vesselRegistrationService.createVessel(distId1, mandalId1 , flcId1, this.registerForm.value).subscribe(data => {
      this.spinner.hide();
      this.registerData = data;
      //console.log(this.registerData);
      if(this.registerData && this.registerData.success == true)
    {
      this.success = true;
      window.scroll(0,0);
    }
    else
    {
      // this.errorlist = this.registerData.message.split(",");
      this.error = true;
      window.scroll(0,0);
     
    }
    }, error => {
      this.spinner.hide();
    });
   
 

    
  }
    
  getadhar()
  {
    let  adhNum = ((document.getElementById("adharId") as HTMLInputElement).value);
   
    this.vesselRegistrationService.adharVerify(adhNum).subscribe(data => {
      this.adharVerify = data;
      if(this.adharVerify && this.adharVerify.success == true)
      {
       
      }
      else
      {
      
       
      }
    }, error => {
      this.spinner.hide();
    });
  }
  

 
}