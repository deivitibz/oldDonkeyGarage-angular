import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.checkLogged();
  }

}
