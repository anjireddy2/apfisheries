import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VesselregistractionModule } from '../vesselregistraction/vesselregistraction.module';
import { Observable, of } from 'rxjs';
import { Subject } from "rxjs/Subject";
@Injectable({
  providedIn: 'root'
})
export class VesselRegistrationService 
{
  
 
  //  apiURL = 'http://10.129.8.64:3000';
   apiURL = 'http://10.129.9.22:3000';
    //apiURL = 'http://192.168.0.105:3000';
   //apiURL = 'http://192.168.0.100:3000';
  userId: any;

  constructor(private _http: HttpClient) 
  {

  }

  public setUserId(user_id: any) {
   this.userId = user_id;
  }
  public getUserId() {
    return this.userId;
   }
  public login(loginForm:any)
  {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/user/login/",loginForm);
  }
  public getDist()
  {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts");
    
  }
  public getMandal(did:number):any
  {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/");
  }
  public getFlc(did:number,mid:number):any
  {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/");
  }

  public getPanchyats(did:number,mid:number):any
  {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+'/panchayats/');
  }

  public getVesselDetails(did:number,mid:number,flcid:number):any
  {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/"+flcid+"/vessel_details/");
  }

  public vesselDelete(did:number,mid:number,flcid:number,vid:number):any
  {
  return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/"+flcid+"/vessel_details/" +vid+"/destroy/");
  }


  public createVessel(did:number,mid:number,flcid:number,registractionData:any)
  {
    //console.log(registractionData);
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/"+flcid+"/vessel_details/create/",registractionData);
    
  }

  public updateVessel(vid:number,vesselUpdate:any)
  {
    //console.log(registractionData);
    return this._http.put<VesselregistractionModule[]>(this.apiURL+'/vessel_details/'+vid+"/update_vessel/",vesselUpdate);
    
  }
  public vesselEdit(vid:number):any
  {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+'/vessel_details/'+vid+"/edit_vessel/");

  }

  public adharVerify(adhid):any
  {
    //return this._http<VesselregistractionModule[]>(this.apiURL+'/users/verify_aadhar/'+adhid+"/");
  }

  public createSociety(registrationData:any)
  {
    //console.log(registractionData);
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/create",registrationData);
    
  }

  public societyList():any
  {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/society_registrations");
  }

  // public addMembers(membersList1)
  // {
  //   return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/add_members",membersList1);
  // }

  public addsocietymember(societymember)
  {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/add_members",societymember);

  }
}
