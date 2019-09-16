import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapsed: boolean = true;

  constructor( @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
  }
  logout() {
    this.storage.remove('user_id');
  }
}
