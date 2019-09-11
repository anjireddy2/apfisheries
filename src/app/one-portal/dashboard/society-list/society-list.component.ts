import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {VesselRegistrationService} from '../vessel-registration.service';
import { Observable, Subject  } from 'rxjs-compat';
import { VesselregistractionModule } from '../../vesselregistraction/vesselregistraction.module';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
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

  constructor(private vesselRegistrationService: VesselRegistrationService, private router: Router) {

   }

  ngOnInit() {
    this.vesselRegistrationService.societyList().subscribe(data => {
      this.SocietyList = data;
      this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 6 ? true : false; 
    });
    // this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 5 ? !this.waterBodyPagination : this.waterBodyPagination; 


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
