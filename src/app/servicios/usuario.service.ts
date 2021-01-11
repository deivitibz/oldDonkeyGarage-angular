import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioPerfil } from './../models/usuario_perfil.model';
import { AuthService } from 'src/app/servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string;

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.baseUrl = 'http://localhost:3000/api/usuarios';
  }

  registro(formValues): Promise<UsuarioPerfil> {
    /* const options = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
      }),
    }; */
    return this.httpClient.post<UsuarioPerfil>(this.baseUrl + '/registro', formValues).toPromise();
  }

  // login(formValues): Promise<UsuarioPerfil> {
  //   return this.httpClient.post<UsuarioPerfil>(this.baseUrl + '/login', formValues).toPromise();
  // }

  login(formValues): Promise<{message: string, login: boolean, token: string}> {
    return this.httpClient.post<{message: string, login: boolean, token: string}>(`${this.baseUrl}/login`, formValues).toPromise()
  }

  getUsers(): Promise<UsuarioPerfil[]> {
    return this.httpClient.get<UsuarioPerfil[]>(this.baseUrl, this.auth.generateHeaders()).toPromise();
  }

  deleteUser(userId: number): Promise<UsuarioPerfil> {
    return this.httpClient.delete<UsuarioPerfil>(this.baseUrl + '/' + userId, this.auth.generateHeaders()).toPromise();
  }

  getUserById(id: number): Promise<UsuarioPerfil> {
    return this.httpClient.get<UsuarioPerfil>(this.baseUrl + '/' + id, this.auth.generateHeaders()).toPromise();
  }

  createUser(user: UsuarioPerfil): Promise<UsuarioPerfil> {
    return this.httpClient.post<UsuarioPerfil>(this.baseUrl, user, this.auth.generateHeaders()).toPromise();
  }

  editUserById(id, usuarioEdit): Promise<UsuarioPerfil> {
    return this.httpClient.put<UsuarioPerfil>( this.baseUrl + '/' + id,usuarioEdit,this.auth.generateHeaders()).toPromise();
  }

  editPerfil(id,usuarioEdit): Promise<UsuarioPerfil>{
    return this.httpClient.put<UsuarioPerfil>( this.baseUrl + '/update/' + id,usuarioEdit,this.auth.generateHeaders()).toPromise()

  }
}
