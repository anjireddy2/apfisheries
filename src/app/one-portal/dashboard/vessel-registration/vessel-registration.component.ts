import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { Observable, Subject  } from 'rxjs-compat';
import { VesselregistractionModule } from '../../vesselregistraction/vesselregistraction.module';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
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

  constructor(private vesselRegistrationService: VesselRegistrationService,private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.vesselRegistrationService.getDist().subscribe(data => this.Dist = data);
    let userId = this.vesselRegistrationService.getUserId();
  }

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
  }

  

  getVesselDetails()
  {
    this.spinner.show();
    let  distId1 = this.distId;
    let mandalId=this.mandalId;
    let flcId1=this.flcid;
    this.vesselRegistrationService.getVesselDetails(distId1,mandalId,flcId1).subscribe(data => {
      this.spinner.hide();
      this.VesselLists = data;
    }, error => {
      this.spinner.hide();
    }
      ); 
    this.waterBodyPagination = !this.waterBodyPagination;
    // this.waterBodyPagination = this.VesselLists && this.VesselLists.length > 5 ? !this.waterBodyPagination : this.waterBodyPagination; 
  }


  deleteVessel()
  {
    this.spinner.show();
    let  distId1 = this.distId;
    this.errorsms = false;
    this.successsms = false; 
    let mandalId=this.mandalId;
    let flcId1=this.flcid;
    let ind = this.VesselLists.findIndex(x=>x.id==this.vesselDataId.id);
    this.vesselRegistrationService.vesselDelete(distId1,mandalId,flcId1,this.vesselDataId.id).subscribe(data => 
  {
    this.spinner.hide();
  this.deleteMsg = data; 
  // this.successsms = true;
  // window.scroll(0,0);

  //alert(this.deleteMsg.message);
   if(this.deleteMsg.success == true)
   {

    this.successsms = true;
    window.scroll(0,0);
    this.VesselLists.splice(ind,1);
   }else
   {
    this.errorsms = true;
    window.scroll(0,0);
   }
  }, error => {
    this.spinner.hide();
  });
  }

  edidtVessel(vesselList){
    this.router.navigate(['/dashboard/edit_vessel',vesselList.id]);
  }

  addnewVessel()
  {
    this.router.navigate(['/dashboard/addnew_vessel']);
  }

  vesselData(vesselList) {
    this.vesselDataId = vesselList;
  }
pageChanged(event) {
  this.p = event;
}
  

  

}
