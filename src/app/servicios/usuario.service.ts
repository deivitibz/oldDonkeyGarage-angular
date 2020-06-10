import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/usuarios';

  }

  registro(formValues): Promise <any> {
    return this.httpClient.post(this.baseUrl + '/registro', formValues).toPromise();
  }

  login(formValues): Promise <any> {
    return this.httpClient.post(this.baseUrl + '/login', formValues).toPromise()
  }

}
