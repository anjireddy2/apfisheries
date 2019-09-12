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


  constructor(private vesselRegistrationService: VesselRegistrationService, private _http: HttpClient, 
    private spinner: NgxSpinnerService, private router: Router,) { }

  ngOnInit() {
    this.spinner.show();
    this.vesselRegistrationService.getDist().subscribe(data => {
      this.spinner.hide();
      this.Dist = data;
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

}
