import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  apiURL = 'http://10.129.8.135:3000';
  
  constructor(public _http:HttpClient) 
  {

   }


}
