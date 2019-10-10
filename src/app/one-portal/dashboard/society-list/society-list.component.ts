import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { Observable, Subject  } from 'rxjs-compat';
import { VesselregistractionModule } from '../../vesselregistraction/vesselregistraction.module';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import { NgxSpinnerService } from 'ngx-spinner';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-society-list',
  templateUrl: './society-list.component.html',
  styleUrls: ['./society-list.component.css']
})
export class SocietyListComponent implements OnInit {
  SocietyList: any = [];
  waterBodyPagination = false;
  p: any;
  distman = false;
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
  nodatafound = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private vesselRegistrationService: VesselRegistrationService, private router: Router, 
    private spinner: NgxSpinnerService) {

   }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
    this.spinner.show();
    this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
    this.vesselRegistrationService.societyList().subscribe(data => {
      this.spinner.hide();
      this.SocietyList = data;
      this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 6 ? true : false; 
    }, error=> {
      this.spinner.hide();
    });
  }

  getSocietyDetails() {
    this.distman = false;
    this.SocietyList = [];
    this.nodatafound = false;
    if(this.distId == undefined)
    {
      this.distman = true;
      return;
    }
    //this.spinner.show();
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    let flcId1=this.flcid;
    this.vesselRegistrationService.getSocietyList(distId1,mandalId,flcId1).subscribe(data => {
      this.spinner.hide();
      this.SocietyList = data;
      if (this.SocietyList.length == 0)
      {
        this.nodatafound = true;
      }
      this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 6 ? true : false; 
    }, error => {
      this.spinner.hide();
      this.nodatafound = true;
      this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 6 ? true : false; 
    }); 
  }
  addnewSociety() {
    this.router.navigate(['/dashboard/addnew_society']);
  }

  addMember(societyList) {
    // this.storage.set("society_type1",societyList.society_type);
    this.router.navigate(['/dashboard/addsociety_members', societyList.id]);
    this.vesselRegistrationService.addSociety(societyList.id).subscribe(data => {
      this.addSocietyMember = data;
    });
  }
  
  getMandal() {
    let  distId1 = this.distId;
    this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
    this.mandalId = undefined;
    this.flcid = undefined;
  }

  getFlc() {
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    this.vesselRegistrationService.getFlc(distId1,mandalId).subscribe(data => this.Flcs = data); 
    this.flcid = undefined;
  }

  pageChanged(event) {
    this.p = event;
  }

  vesselData(societyList, index) {
    this.delete_success = false;
    this.delete_error = false;
    this.spinner.show();
    this.vesselRegistrationService.deleteSociety(societyList.id).subscribe(data => {
      this.deleteSociety = data;
      this.SocietyList.splice(index, 1);
      this.spinner.hide();
      if(this.deleteSociety.success == true) {
       this.delete_success = true;
      } else {
        // this.errorlist = this.vesselUpdate.message.split(",");
        this.delete_error = true;
       }
       window.scroll(0,0);
    },error=>{
      this.spinner.hide();
    });
  }

}
