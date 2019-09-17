import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'e-pragati';
  newUser_Exist = true;

  constructor(private router:Router,@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    
   }

  ngOnInit() {
    if(!this.storage.get("user_id")) {
      // localStorage.clear();
      this.router.navigate(['/']);

      
    }
    //console.log(this.storage.get("user_id"));
  }

  newUser()
  {
  this.newUser_Exist=!this.newUser_Exist;
  }
  existingUser()
  {
    this.newUser_Exist=!this.newUser_Exist;
  }
}
