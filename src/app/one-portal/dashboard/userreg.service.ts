import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserregService {
  userregtype = [ 
    {"id":1, "status": "Aqua Lab"},
    {"id":2, "status": "Aquaculture Fresh Water Farm"},
    {"id":3, "status": "Inland Fisherman"},
    {"id":4, "status": "Inland Fisherwoman"},
    {"id":5, "status": "Inland Fishermen Society"},
    {"id":6, "status": "Inland Fisher women Society"},
    {"id":7, "status": "Marine Crew "},
    {"id":8, "status": "Marine Fishermen Society"},
    {"id":9, "status": "Marine Vessel Registration"},
    // {"id":10, "status": "Marine Society Registration"},
   ]
  constructor() { }
  getMyItems()
  {
   return this.userregtype; 
  }
}
