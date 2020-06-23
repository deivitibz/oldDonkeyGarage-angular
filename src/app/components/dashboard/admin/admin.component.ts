import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.decodeToken();
  }

  logout() {
    localStorage.removeItem('user-token');
  }
}
