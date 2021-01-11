import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioPerfil } from '../models/usuario_perfil.model';
import { AuthService } from 'src/app/servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConstructorService {

  baseUrl: string;
  constructor(private httpClient: HttpClient,private auth:AuthService) {

    this.baseUrl = 'http://mypanel.sytes.net:3000/api/constructor';

  }

  getConstructor(id) {

    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllConstructores() {
    const options = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
      }),
    };
    return this.httpClient.get(this.baseUrl,options).toPromise();
  }

  newConstructor(usuario: UsuarioPerfil) {
    return this.httpClient.post(this.baseUrl, usuario,this.auth.generateHeaders()).toPromise();
  }

  deleteConstructor(id) {
    return this.httpClient.delete(this.baseUrl + '/' +id,this.auth.generateHeaders()).toPromise();
  }

  async editConstructor(id) {
    const constructor = await this.getConstructor(id);
    return this.httpClient.put(this.baseUrl, constructor,this.auth.generateHeaders()).toPromise();
  }

  // TODO: mostrar un anuncio
  // TODO: mostrar todos anuncio
  // TODO: crear un anuncio
  // TODO: eliminar un anuncio
  // TODO: modificar un anuncio
}
