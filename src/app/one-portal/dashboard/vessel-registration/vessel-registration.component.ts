import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vessel-registration',
  templateUrl: './vessel-registration.component.html',
  styleUrls: ['./vessel-registration.component.css']
})
export class VesselRegistrationComponent implements OnInit {
  
  waterBodyPagination = false;
  successsms = false;
  errorsms = false;
  Dist:any = [];
  Mandals:any = [];
  Flcs:any = [];
  
  VesselLists: any = [];
  deleteMsg: any = [];
  editMsg : any = [];
  distId:number;
  mandalId:number;
  flcid:number;
  vId : number;
  vessel_reg_no: any;
  vesselDataId: any;
  p: any;
  nodatafound =false;
  distman = false;
  obj: any;

  constructor(private vesselRegistrationService: VesselRegistrationService,private router:Router,
    private spinner: NgxSpinnerService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } else {
      this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
    }
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

  getVesselDetails() {
    this.distman = false;
    this.VesselLists = [];
    this.nodatafound = false;
    if(this.distId == undefined) {
      this.distman = true;
      return;
    }
    this.spinner.show();
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    let flcId1=this.flcid;
    this.vesselRegistrationService.getVesselDetails(distId1,mandalId,flcId1).subscribe(data => {
      this.spinner.hide();
      this.obj = data[data.length - 1];
      data.splice(data.length-1,1);
      this.VesselLists = data;
      if (this.VesselLists.length == 0) {
        this.nodatafound = true;
      }
      this.waterBodyPagination = this.VesselLists && this.VesselLists.length > 6 ? true : false; 
    }, error => {
      this.spinner.hide();
      this.nodatafound = true;
      this.waterBodyPagination = this.VesselLists && this.VesselLists.length > 6 ? true : false;
    }); 

  }


  deleteVessel() {
    this.spinner.show();
    let  distId1 = this.distId;
    this.errorsms = false;
    this.successsms = false; 
    let mandalId=this.mandalId;
    let flcId1=this.flcid;
    let ind = this.VesselLists.findIndex(x=>x.id==this.vesselDataId.id);
    this.vesselRegistrationService.vesselDelete(distId1,mandalId,flcId1,this.vesselDataId.id).subscribe(data => {
      this.spinner.hide();
      this.deleteMsg = data; 
      if(this.deleteMsg.success == true) {
        this.successsms = true;
        this.VesselLists.splice(ind,1);
      } else {
        this.errorsms = true;
      }
      window.scroll(0,0);
      setTimeout(() => {
        this.errorsms = false;
        this.successsms = false;
        }, 3000);
    }, error => {
        this.spinner.hide();
    });
  }

  edidtVessel(vesselList) {
    this.router.navigate(['/dashboard/edit_vessel',vesselList.id]);
  }

  addnewVessel() {
    this.router.navigate(['/dashboard/addnew_vessel']);
  }

  crewUser(vesselList) {
    this.router.navigate(['/dashboard/crew_user_vessel',vesselList.id]);
  }

  vesselData(vesselList) {
    this.vesselDataId = vesselList;
  }

  pageChanged(event) {
    this.p = event;
  }
}
