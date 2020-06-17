import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://streaming.zapto.org:3000/api/usuarios';
  }

  registro(formValues): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('userToken'),
      }),
    };
    return this.httpClient
      .post(this.baseUrl + '/registro', formValues, options)
      .toPromise();
  }

  login(formValues): Promise<any> {
    console.log(formValues);
    const options = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('userToken'),
      }),
    };
    return this.httpClient
      .post(this.baseUrl + '/login', formValues, options)
      .toPromise();
  }
}
