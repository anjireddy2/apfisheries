import { Component,ElementRef, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserregService } from '../userreg.service';


@Component({
  selector: 'app-userreg',
  templateUrl: './userreg.component.html',
  styleUrls: ['./userreg.component.css']
})
export class UserregComponent implements OnInit {
 
  userregtype = [];

  constructor(private router: Router,userregService : UserregService) 
  {
    this.userregtype = userregService.getMyItems();
   }

  ngOnInit() {
    
  }

  onSubmit()
  {
    this.router.navigate(['dashboard/fisherman']);
  }
}
