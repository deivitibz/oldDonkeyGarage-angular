import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginGuard } from 'src/app/login.guard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService, private guard: LoginGuard) {}

  ngOnInit() {
    //this.authService.decodeToken();
    //this.guard.canActivate();
  }

  logout() {
    localStorage.removeItem('user-token');
  }
}
