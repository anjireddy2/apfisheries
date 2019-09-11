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
  
 
   apiURL = 'http://10.129.8.64:3000';
   //apiURL = 'https://safe-wave-93434.herokuapp.com';
    //apiURL = 'http://10.129.9.22:3000';
    
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
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/flc_mandals/");
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

  public vesselDelete(did: number,mid: number,flcid: number,vid: number): any {
  return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/"+flcid+"/vessel_details/" +vid+"/destroy/");
  }


  public createVessel(did: number, mid: number, flcid: number, registractionData: any) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/"+flcid+"/vessel_details/create/",registractionData);
  }

  public updateVessel(vid: number, vesselUpdate: any) {
    return this._http.put<VesselregistractionModule[]>(this.apiURL+'/vessel_details/'+vid+"/update_vessel/",vesselUpdate);
  }
  public vesselEdit(vid: number): any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+'/vessel_details/'+vid+"/edit_vessel/");

  }

  public adharVerify(adhid): any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+'/vessel_details/verify_aadhaar?adhid='+adhid);
  }

  public rationVerify(rationId,adharId): any {
    // tslint:disable-next-line: max-line-length
    return this._http.get<VesselregistractionModule[]>(this.apiURL+'/vessel_details/verify_ration_card?rationid='+rationId+'&adhar_no='+adharId);
  }

  public createSociety(registrationData: any) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/create", registrationData);
  }

  public societyList(): any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL + "/society_registrations");
  }

  // public addMembers(membersList1)
  // {
  //   return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/add_members",membersList1);
  // }

  public addsocietymember(societymember) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/add_members",societymember);

  }
  public forgotPwd(forgotForm) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL + '/user/forgot_pwd', forgotForm);

  }
  public addSociety(societyid)
  {
    return this._http.get<VesselregistractionModule[]>(this.apiURL + '/society_registrations/'+societyid+'/society_members/');

  }

  // public getsocietmember(vid)
  // {
  //   return this._http.get<VesselregistractionModule[]>(this.apiURL + '/society_registrations/'+societyid+'/society_members/');

  // }

  public deletemember(sid)
  {
    return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/society_registrations/"+sid+"/delete_member/");

  }
  public deleteSociety(sid1)
  {
    return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/society_registrations/"+sid1+'/delete_society/');

  }
  public verifyVessel(society)
  {
    debugger

    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/verify_vessel",society);

  }
}
