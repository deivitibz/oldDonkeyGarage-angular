import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../servicios/auth.service';
import { anuncioService } from 'src/app/servicios/anuncio.service';
import { Anuncio } from 'src/app/models/anuncio.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  userData: Anuncio[]
  userList;

  constructor(
    private authService: AuthService,
    private anuncioService: anuncioService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadData()
    //this.getData()
    this.getImg()

  }

  logout(){
    localStorage.removeItem('user-token');
  }

  getImg(){
    const result = this.http.get('https://reqres.in/api/users')
    let array = result.subscribe(data => {
      return data['data']
    })
    console.log(array)

  }

  async getData(){
    const result = await this.http.get('https://jsonplaceholder.typicode.com/users').toPromise();
    this.userList = result
    console.log(this.userList)
  }

  async loadData(){
    const userId = this.authService.decodeToken()['userId']
    this.userData = await this.anuncioService.getAnunciosById(userId)
    console.log(this.userData);

  }
}
