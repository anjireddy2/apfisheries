import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapsed: boolean = true;
  userName: any;
  // usename: any;

  constructor(private router:Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.userName = this.storage.get("user_name");
    if(!this.storage.get("user_id")) {
      this.router.navigate(['/']);
    } 
  }
  logout() {
    this.storage.remove('user_id');
    this.storage.remove('user_name');
  }
}
