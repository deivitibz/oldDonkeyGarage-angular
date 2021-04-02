import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../servicios/auth.service';
import { anuncioService } from 'src/app/servicios/anuncio.service';
import { Anuncio } from 'src/app/models/anuncio.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;

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
    private http: HttpClient,
    public router: Router) {



  }

  async ngOnInit() {
    await this.getData();
    this.datatableInit(this.userList);


    //this.confDtOptions();
    //this.loadData()
    //this.getImg()

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
    this.userList = await this.http.get('https://jsonplaceholder.typicode.com/users').toPromise();

  }

  async loadData(){
    const userId = this.authService.decodeToken()['userId']
    //this.userData = await this.anuncioService.getAnunciosById(userId)
    //console.log(this.userData);

  }

  datatableInit(data){

    const options = {
      pageLength: 5,
      data: data,
      columns: [
        { data: 'id'},
        { data: 'email'},
        { data: 'username'},
        { data: 'name'},
        { data: 'website'},
        { data: 'phone'}
      ]
    }

    $('#table_id').DataTable(options);
  }

}
