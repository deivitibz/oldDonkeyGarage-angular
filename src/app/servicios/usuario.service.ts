import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './../models/usuario_perfil.model';
import { AuthService } from 'src/app/servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string;

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.baseUrl = 'http://mypanel.sytes.net:3000/api/usuarios';
  }

  registro(formValues): Promise<Usuario> {
    /* const options = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
      }),
    }; */
    return this.httpClient.post<Usuario>(this.baseUrl + '/registro', formValues).toPromise();
  }

  login(formValues): Promise<Usuario> {
    // console.log(formValues);
    return this.httpClient.post<Usuario>(this.baseUrl + '/login', formValues).toPromise();
  }

  getUsers(): Promise<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.baseUrl, this.auth.generateHeaders()).toPromise();
  }

  deleteUser(userId: number): Promise<Usuario> {
    return this.httpClient.delete<Usuario>(this.baseUrl + '/' + userId, this.auth.generateHeaders()).toPromise();
  }

  getUserById(id: number): Promise<Usuario> {
    return this.httpClient.get<Usuario>(this.baseUrl + '/' + id, this.auth.generateHeaders()).toPromise();
  }

  isLogged() {
    return localStorage.getItem('user-token');
  }

  createUser(user: Usuario): Promise<Usuario> {
    return this.httpClient.post<Usuario>(this.baseUrl, user, this.auth.generateHeaders()).toPromise();
  }

  editUserById(id, usuarioEdit): Promise<Usuario> {
    return this.httpClient.put<Usuario>( this.baseUrl + '/' + id,usuarioEdit,this.auth.generateHeaders()).toPromise();
  }

  editPerfil(id,usuarioEdit): Promise<Usuario>{
    return this.httpClient.put<Usuario>( this.baseUrl + '/update/' + id,usuarioEdit,this.auth.generateHeaders()).toPromise()

  }
}
