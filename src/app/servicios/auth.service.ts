import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { UsuarioPerfil } from './../models/usuario_perfil.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarioActivo: UsuarioPerfil;
  baseUrl = 'http://mypanel.sytes.net:3000/api/check';
  constructor(private http: HttpClient,private router: Router) {}

  decodeToken() {
    if(localStorage.getItem('user-token')){
      let token = localStorage.getItem('user-token');
      let decoded = jwt_decode(token);
      return decoded;
    } else {
      return false;
    }

  }

  checkToken(response) {
    /* return this.http.get(this.baseUrl).toPromise(); */
    if(!localStorage.getItem('user-token')){
      console.log('no hay token');
      this.router.navigate(['home']);
    } else {
      // console.log(response);
      if(response.error){
        localStorage.removeItem('user-token');
        this.router.navigate(['home']);

      }
    }
  }

  checkLogged(){
    return localStorage.getItem('user-token') ? true : false;
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

  /* getToken(){
    //return this.http.get('http://mypanel.sytes.net:3000/api/usuarios/getToken').toPromise()
  } */
}
