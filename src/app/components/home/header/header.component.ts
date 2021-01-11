import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isLogged: boolean;
  modal: any;

  constructor(
    private authService: AuthService,
    public router: Router
    ) {

    }

  ngOnInit(): void {
    this.isLogged = this.authService.checkLogged();

  }

  closeSession(){
    localStorage.removeItem('user-token')
    this.router.navigate(['home'])
  }

  openModal(){
    console.log('entra aqui')
    this.modal.modal();
  }



}
