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

  constructor(private vesselRegistrationService: VesselRegistrationService, private router: Router) {

   }

  ngOnInit() {
    this.vesselRegistrationService.societyList().subscribe(data => this.SocietyList = data);    
    this.waterBodyPagination = this.SocietyList && this.SocietyList.length > 5 ? !this.waterBodyPagination : this.waterBodyPagination; 


  }

  addnewSociety() {
    this.router.navigate(['/dashboard/addnew_society']);
  }

  addMember(societyList) {
    this.router.navigate(['/dashboard/addsociety_members', societyList.id]);
  }

  pageChanged(event) {
    this.p = event;
  }

}
