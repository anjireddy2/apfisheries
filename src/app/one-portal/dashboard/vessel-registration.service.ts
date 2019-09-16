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
  // apiURL = 'https://safe-wave-93434.herokuapp.com';
    //apiURL = 'http://10.129.9.22:3000';
    
   //apiURL = 'http://192.168.0.100:3000';

  constructor(private _http: HttpClient) {
  }

  public login(loginForm:any) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/user/login/",loginForm);
  }

  public getDist() {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts");
  }

  public getMandal(did:number):any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/flc_mandals/");
  }

  public getFlc(did:number,mid:number):any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/");
  }

  public getPanchyats(did:number,mid:number):any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+'/panchayats/');
  }

  public getVesselDetails(did:number,mid:number,flcid:number):any {
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

  // public getSocietyDetails(did:number,mid:number,flcid:number):any {
  //   return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/"+flcid+"/society_details/");
  // }

  public getSocietyList(did:number,mid:number,flcid:number):any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/society_registrations?districts="+did+"&mandals="+mid+"&fish_landing_centers="+flcid);
  }

  // public addMembers(membersList1)
  // {
  //   return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/add_members",membersList1);
  // }

  public addsocietymember(societymember) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/add_members",societymember);
  }

  public editSocietyMember(society_id,society_member_id) {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/society_registrations/edit_member?society_id="+society_id+"&society_member_id="+society_member_id);
  }

  public updateSocietymember(societymember) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/update_society_member",societymember);
  }


  public forgotPwd(forgotForm) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL + '/user/forgot_pwd', forgotForm);
  }

  public addSociety(societyid) {
    return this._http.get<VesselregistractionModule[]>(this.apiURL + '/society_registrations/'+societyid+'/society_members/');
  }

  // public getsocietmember(vid)
  // {
  //   return this._http.get<VesselregistractionModule[]>(this.apiURL + '/society_registrations/'+societyid+'/society_members/');

  // }

  public deletemember(sid) {
    return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/society_registrations/"+sid+"/delete_member/");
  }

  public deleteSociety(sid1) {
    return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/society_registrations/"+sid1+'/delete_society/');
  }

  public verifyVessel(society) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/society_registrations/verify_vessel",society);
  }

  public getVillages(did:number,mid:number):any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+'/villages/');
  }

  public getWaterbody(did:number, mid:number):any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/water_bodies/");
  }

  public getWaterBodyList(did:number, mid:number) {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/water_bodies/search");
  }

  //Inland Society Registration Services

  public createInlandSociety(registrationData: any) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/inland_society_registrations/create", registrationData);
  }

  public inlandSocietyList(): any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL + "/inland_society_registrations");
  }

  public getInlandSocietyDetails(did:number,mid:number,flcid:number):any {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/districts/"+did+"/mandals/"+mid+"/fish_landing_centers/"+flcid+"/inland_society_details/");
  }

  public deleteInlandSociety(sid1) {
    return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/inland_society_registrations/"+sid1+'/delete_inland_society/');
  }
  
  public addedInlandSocietyMembers(societyid) {
    return this._http.get<VesselregistractionModule[]>(this.apiURL + '/inland_society_registrations/'+societyid+'/inland_society_members/');
  }

  public addInlandsocietymember(societymember) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/inland_society_registrations/add_inland_members",societymember);
  }

  public deleteInlandMember(sid1) {
    return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/inland_society_registrations/"+sid1+'/delete_inland_society/');
  }

  public getInlandSocietyMembers(societyid) {
    return this._http.get<VesselregistractionModule[]>(this.apiURL + '/inland_society_registrations/'+societyid+'/inland_society_member_data/');
  }
  //End Of InlandSociety

  public createCrewMember(registractionData: any) {
    return this._http.post<VesselregistractionModule[]>(this.apiURL+"/vessel_details/create_crew_user/",registractionData);
  }

  public crewMemberList(data: any) {
    return this._http.get<VesselregistractionModule[]>(this.apiURL+"/vessel_details/crew_list?id="+data);
  }

  public deleteCrewMember(vesselId, crewMemberId) {
    return this._http.delete<VesselregistractionModule[]>(this.apiURL+"/vessel_registrations/delete_crew_member?vessel_id="+vesselId+"&crew_member_id"+crewMemberId);
  }
  
}
