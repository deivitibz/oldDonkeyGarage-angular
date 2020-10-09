import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginGuard } from 'src/app/login.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  token;
  showFiller = false;
  constructor(
    private authService: AuthService,
    private guard: LoginGuard,
    public router: Router
    ) {}

  async ngOnInit() {
    //this.authService.decodeToken();
    //this.guard.canActivate();
    this.token = await this.authService.getToken()
    localStorage.setItem('user-token', this.token);


  }

  logout() {
    localStorage.removeItem('user-token');
  }
}
