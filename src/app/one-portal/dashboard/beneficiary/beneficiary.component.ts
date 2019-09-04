import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../beneficiary.service';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {

  constructor(public beneficiaryService:BeneficiaryService) 
  {

   }

  ngOnInit() {
  }

}
