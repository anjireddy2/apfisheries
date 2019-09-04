import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'e-pragati';
  newUser_Exist = true;

  constructor() {
    
   }

  ngOnInit() {
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
