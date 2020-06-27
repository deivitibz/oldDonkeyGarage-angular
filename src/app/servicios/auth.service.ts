import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Usuario } from './../models/usuario_perfil.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarioActivo: Usuario;
  baseUrl = 'http://localhost:3000/api/check';
  constructor(private http: HttpClient,private router: Router) {}

  decodeToken() {
    let token = localStorage.getItem('user-token');
    let decoded = jwt_decode(token);
    return decoded;
  }

  checkToken(response) {
    /* return this.http.get(this.baseUrl).toPromise(); */
    if(!localStorage.getItem('user-token')){
      console.log('no hay token');

    } else {
      // console.log(response);

      if(response['error']){
        localStorage.removeItem('user-token');
        this.router.navigate(['home']);

      }
    }
  }

  isAdmin() {
    if (this.decodeToken) {
      return true;
    }
  }

  generateHeaders() {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
      }),
    };
  }
}
