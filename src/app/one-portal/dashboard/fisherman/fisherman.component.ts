import { Component, OnInit } from '@angular/core';
import {SocialModule} from '../social/social.module';

@Component({
  selector: 'app-fisherman',
  templateUrl: './fisherman.component.html',
  styleUrls: ['./fisherman.component.css']
})
export class FishermanComponent implements OnInit 
{
  selectedDevice;
  certificateNumber = false;
  socialStatus =    false;

  socialstatus1 =  [
    {"id":1, "status": "OC"},
    {"id":2, "status": "BC"},
    {"id":3, "status": "ST"},
    {"id":4, "status": "SC"},
  ];

  constructor() { }

  ngOnInit() {

  }
  onSocialstatus(selectedDevice) 
  {
    if(selectedDevice == 'OC')
    {
      this.certificateNumber = false;
    }
    else
    {
      this.certificateNumber = true;
    }

}

}
