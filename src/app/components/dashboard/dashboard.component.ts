import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../servicios/auth.service';
import { anuncioService } from 'src/app/servicios/anuncio.service';
import { Anuncio } from 'src/app/models/anuncio.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  userData: Anuncio[]

  constructor(private authService: AuthService, private anuncioService: anuncioService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  logout(){
    localStorage.removeItem('user-token');
  }

  async loadData(){
    const userId = this.authService.decodeToken()['userId']
    this.userData = await this.anuncioService.getAnunciosById(userId)
    console.log(this.userData);

  }
}
