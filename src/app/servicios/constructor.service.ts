import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario_perfil.model';

@Injectable({
  providedIn: 'root',
})
export class ConstructorService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://streaming.zapto.org:3000/api/constructor';
  }

  getConstructor(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllConstructores() {
    return this.httpClient.get(this.baseUrl).toPromise();
  }

  newConstructor(usuario: Usuario) {
    return this.httpClient.post(this.baseUrl, usuario).toPromise();
  }

  deleteConstructor(id) {
    return this.httpClient.delete(this.baseUrl, id).toPromise();
  }

  async editConstructor(id) {
    const constructor = await this.getConstructor(id);
    return this.httpClient.put(this.baseUrl, constructor).toPromise();
  }

  // TODO: mostrar un anuncio
  // TODO: mostrar todos anuncio
  // TODO: crear un anuncio
  // TODO: eliminar un anuncio
  // TODO: modificar un anuncio
}
