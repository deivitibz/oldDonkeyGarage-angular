import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empty: boolean;
  constructor() {
    this.empty = false;
  }

  ngOnInit(): void {}

  logout(){
    localStorage.removeItem('user-token');
  }
}
