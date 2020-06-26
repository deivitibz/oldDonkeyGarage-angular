import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Usuario } from './../models/usuario_perfil.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarioActivo: Usuario;
  baseUrl = 'http://localhost:3000/api/check';
  constructor(private http: HttpClient) {}

  decodeToken() {
    let token = localStorage.getItem('user-token');
    let decoded = jwt_decode(token);
    return decoded;
  }

  checkToken() {
    return this.http.get(this.baseUrl).toPromise();
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
