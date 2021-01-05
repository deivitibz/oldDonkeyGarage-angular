import { Component, OnInit, Input } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio.model';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: boolean = false;
  userToken: string;
  bannerImg: string = "../../../assets/img/paralax-3.jpg";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.checkLogged();
  }

  category($event){
    console.log($event);

  }

}
