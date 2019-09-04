import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {VesselRegistrationService} from '../../dashboard/vessel-registration.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  validUser1 = false;
  login:any = [];
  validUser = false;
  constructor(private router:Router, private formBuilder: FormBuilder , private vesselRegistrationService : VesselRegistrationService,private spinner: NgxSpinnerService) { }

  ngOnInit() 
    {
      this.loginForm = this.formBuilder.group({
        // vessel_name: ['', Validators.required],
        mobile_number: ['',[Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    }); 
    
  }
    
   

  get f() { return this.loginForm.controls; }
  
  onClickSubmit(loginForm)
  {
    this.spinner.show();
    this.submitted = true;
    this.validUser1 = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
   // this.router.navigate(['/dashboard/vessel_registration']);
   console.log( this.loginForm.value);

    this.vesselRegistrationService.login(this.loginForm.value).subscribe(data => 
      {
        this.spinner.hide();
      this.login = data; 
       if(this.login.success == true) {
        this.vesselRegistrationService.setUserId(this.login.user_id)
        this.router.navigate(['/dashboard/vessel_registration']);

       }else
       {
        this.validUser = true;
       }
      });
    
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  

}