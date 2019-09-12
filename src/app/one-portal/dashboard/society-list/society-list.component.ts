import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { Observable, Subject  } from 'rxjs-compat';
import { VesselregistractionModule } from '../../vesselregistraction/vesselregistraction.module';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-society-list',
  templateUrl: './society-list.component.html',
  styleUrls: ['./society-list.component.css']
})
export class SocietyListComponent implements OnInit {
  SocietyList: any = [];
  waterBodyPagination = false;
  p: any;
  addSocietyMember: any;
  deleteSociety: any;
  delete_success: boolean;
  delete_error: boolean;
  Dist: VesselregistractionModule[];
  distId: any;
  mandalId: any;
  flcid: any;
  Mandals: any;
  Flcs: any;

  constructor(private vesselRegistrationService: VesselRegistrationService, private router: Router, 
    private spinner: NgxSpinnerService) {

   }

  ngOnInit() {
    this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
    this.vesselRegistrationService.societyList().subscribe(data => {
      this.SocietyList = data;
      this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 6 ? true : false; 
    });
    // this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 5 ? !this.waterBodyPagination : this.waterBodyPagination; 


  }

  getSocietyDetails() {
    //this.spinner.show();
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    let flcId1=this.flcid;
    // this.vesselRegistrationService.getVesselDetails(distId1,mandalId,flcId1).subscribe(data => {
    //   this.spinner.hide();
    //   this.SocietyList = data;
    //   this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 6 ? true : false; 

    // }, error => {
    //   this.spinner.hide();
    // }
    //   ); 
  }
  addnewSociety() {
    this.router.navigate(['/dashboard/addnew_society']);
  }

  addMember(societyList) {
    this.router.navigate(['/dashboard/addsociety_members', societyList.id]);

    this.vesselRegistrationService.addSociety(societyList.id).subscribe(data => {
      this.addSocietyMember = data;
      //console.log(this.addSocietyMember.message);

    });


  }
  getMandal()
  {
    let  distId1 = this.distId;
    this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
    this.mandalId = undefined;
    this.flcid = undefined;
  }

  getFlc()
  {
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    this.vesselRegistrationService.getFlc(distId1,mandalId).subscribe(data => this.Flcs = data); 
    this.flcid = undefined;
  }

  pageChanged(event) {
    this.p = event;
  }

  vesselData(societyList)
  {
    this.delete_success = false;
    this.delete_error = false;

    this.vesselRegistrationService.deleteSociety(societyList.id).subscribe(data => {
      this.deleteSociety = data;
      
      if(this.deleteSociety.success == true)
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
    });
  }

}
