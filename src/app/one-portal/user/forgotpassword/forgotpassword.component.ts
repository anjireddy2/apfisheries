import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VesselRegistrationService } from '../../dashboard/vessel-registration.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted: boolean = false;
  pwd_mismatch: boolean;
  error = false;
  success = false;
  forgotData: any;

  constructor(private router:Router, private vesselRegistrationService: VesselRegistrationService, private formBuilder: FormBuilder,  private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.forgotForm.reset();
    this.forgotForm = this.formBuilder.group({
      my_input: ['', Validators.required],
      new_pwd: ['', [Validators.required,Validators.minLength(6)]],
     confirm_pwd: ['', [Validators.required,Validators.minLength(6)]],
   });
  }

  forgotSubmit() {
    this.submitted = true;
    // this.pwd_mismatch = false;
    this.error = false;
    this.success = false;
    if(this.forgotForm.invalid) {
      return;
    }
    if(this.forgotForm.controls.new_pwd.value !== this.forgotForm.controls.confirm_pwd.value) {
      this.pwd_mismatch = true;
      return;
    }
    // this.success = true;
    this.vesselRegistrationService.forgotPwd(this.forgotForm.value).subscribe(data => {
      this.spinner.hide();
      this.forgotData = data;
      //console.log(this.registerData);
      if(this.forgotData && this.forgotData.success == true)
    {
      this.success = true;
     
      window.scroll(0,0);
      this.router.navigate(['/newlogin/login']);

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

  get f() { return this.forgotForm.controls; }
   
  
  login() {
      this.router.navigate(['/newlogin/login']);
    }

}
