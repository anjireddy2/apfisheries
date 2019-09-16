import { Component, OnInit } from '@angular/core';
import { VesselRegistrationService } from '../vessel-registration.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inland-society-list',
  templateUrl: './inland-society-list.component.html',
  styleUrls: ['./inland-society-list.component.css']
})
export class InlandSocietyListComponent implements OnInit {
  Dist:any = [];
  Mandals:any = [];
  distId:number;
  mandalId:number;
  private Panchayats;
  private Village;
  private Waterbody;
  private WaterbodyList;
  waterBodyPagination = false;
  inlandSocietyList: any = [];
  delete_success: boolean;
  delete_error: boolean;
  deleteSociety: any = [];



  constructor(private vesselRegistrationService: VesselRegistrationService, private _http: HttpClient, 
    private spinner: NgxSpinnerService, private router: Router,) { }

  ngOnInit() {
    this.spinner.show();
    this.vesselRegistrationService.getDist().subscribe(data => {
      this.Dist = data;
    });
    this.vesselRegistrationService.inlandSocietyList().subscribe(data => {
      this.spinner.hide();
      this.inlandSocietyList = data;
      this.waterBodyPagination = this.inlandSocietyList && this.inlandSocietyList.length > 6 ? true : false; 
    }, error=> {
      this.spinner.hide();
    });
  }

  getMandal() {
  let  distId1 = this.distId;
  this.vesselRegistrationService.getMandal(distId1).subscribe(data => this.Mandals = data); 
  }
  getPanchayats() {
  let  distId1 = this.distId;
  let  mandalId1 = this.mandalId;
  this.vesselRegistrationService.getPanchyats(distId1,mandalId1).subscribe(data => this.Panchayats = data);
  this.vesselRegistrationService.getVillages(distId1,mandalId1).subscribe(data => this.Village = data);
  this.vesselRegistrationService.getWaterbody(distId1,mandalId1).subscribe(data => this.Waterbody = data);
  }
  getWaterBodies() {
  let  distId1 = this.distId;
  let  mandalId1 = this.mandalId;
  this.vesselRegistrationService.getWaterBodyList(distId1,mandalId1).subscribe(res => this.WaterbodyList = res);
  this.waterBodyPagination = !this.waterBodyPagination; 
  }
  addnewInlandSociety() {
  this.router.navigate(['/dashboard/addnew_inland_society']);      
  }
  inlandSocietyData(societyList) {
    this.delete_success = false;
    this.delete_error = false;
    this.spinner.show();
    this.vesselRegistrationService.deleteInlandSociety(societyList.id).subscribe(data => {
      this.deleteSociety = data;
      this.spinner.hide();
      if(this.deleteSociety.success == true) {
       this.delete_success = true;
       window.scroll(0,0);
      } else {
        // this.errorlist = this.vesselUpdate.message.split(",");
        this.delete_error = true;
        window.scroll(0,0);
       }
    },error=>{
      this.spinner.hide();
    });
  }
  getInlandSocietyDetails() {
    //this.spinner.show();
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    // let flcId1=this.flcid;
    // this.vesselRegistrationService.getVesselDetails(distId1,mandalId,flcId1).subscribe(data => {
    //   this.spinner.hide();
    //   this.SocietyList = data;
    //   this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 6 ? true : false; 

    // }, error => {
    //   this.spinner.hide();
    // }
    //   ); 
  }
  addInlandSocietyMember(inlandSociety) {
    this.router.navigate(['/dashboard/addinland_society_members', inlandSociety.id]);
    // this.vesselRegistrationService.addSociety(inlandSociety.id).subscribe(data => {
    //   this.addSocietyMember = data;
    // });
  }

}
