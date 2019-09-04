import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {
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
