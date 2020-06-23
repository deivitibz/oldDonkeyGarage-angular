import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  decodeToken() {
    let token = localStorage.getItem('user-token');
    let decoded = jwt_decode(token);
    return decoded;
  }
}
