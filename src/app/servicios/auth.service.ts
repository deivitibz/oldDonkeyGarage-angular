import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Usuario } from './../models/usuario_perfil.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  usuarioActivo: Usuario;

  constructor() {}

  decodeToken() {
    let token = localStorage.getItem('user-token');
    let decoded = jwt_decode(token);
    return decoded;
  }

  isAdmin() {
    if (this.decodeToken){
      return true;
    }
  }

  generateHeaders(){
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token')
      })
    }
  }
}
