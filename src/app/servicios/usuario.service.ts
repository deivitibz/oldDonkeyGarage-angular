import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioPerfil } from './../models/usuario_perfil.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { UsuarioInterface } from './../models/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string;
  private usuariosDB: AngularFireList<UsuarioInterface>

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private db: AngularFireDatabase
    ) {
    this.baseUrl = 'http://localhost:3000/api/usuarios';
    this.usuariosDB = this.db.list('/usuarios', ref => ref.orderByChild('id'));

  }

  // registro(formValues): Promise<UsuarioPerfil> {
  //   /* const options = {
  //     headers: new HttpHeaders({
  //       'user-token': localStorage.getItem('user-token'),
  //     }),
  //   }; */
  //   return this.httpClient.post<UsuarioPerfil>(this.baseUrl + '/registro', formValues).toPromise();
  // }

  // login(formValues): Promise<UsuarioPerfil> {
  //   return this.httpClient.post<UsuarioPerfil>(this.baseUrl + '/login', formValues).toPromise();
  // }

  login(formValues): Promise<{message: string, login: boolean, token: string}> {
    return this.httpClient.post<{message: string, login: boolean, token: string}>(`${this.baseUrl}/login`, formValues).toPromise()
  }

  registro(usuario: UsuarioInterface){

    return this.usuariosDB.push({
      username: usuario.username,
      email: usuario.email,
      password: usuario.password
    })
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
