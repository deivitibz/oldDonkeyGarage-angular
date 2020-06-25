import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './../models/usuario_perfil.model';
import { AuthService } from 'src/app/servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string;

  constructor(private httpClient: HttpClient,private auth: AuthService) {
    this.baseUrl = 'http://localhost:3000/api/usuarios';
  }

  registro(formValues): Promise<any> {
    /* const options = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
      }),
    }; */
    return this.httpClient
      .post(this.baseUrl + '/registro', formValues).toPromise();
  }

  login(formValues): Promise<any> {
    //console.log(formValues);
    return this.httpClient.post(this.baseUrl + '/login', formValues).toPromise();
  }

  getUsers(): Promise<any> {

    return this.httpClient.get(this.baseUrl, this.auth.generateHeaders()).toPromise();
  }

  deleteUser(userId): Promise<any> {
    return this.httpClient.delete(this.baseUrl + '/' + userId,this.auth.generateHeaders()).toPromise();
  }

  getUserById(id): Promise<any> {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  isLogged() {
    return localStorage.getItem('user-token');
  }

  createUser(user): Promise<Usuario> {
    return this.httpClient.post<Usuario>(this.baseUrl, user).toPromise();
  }

  editUserById(id,usuarioEdit): Promise<Usuario> {
    return this.httpClient.put<Usuario>(this.baseUrl + '/' + id, usuarioEdit).toPromise();
  }
}
