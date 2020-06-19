import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://streaming.zapto.org:3000/api/perfil';
  }

  getPerfil(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllPerfiles() {
    return this.httpClient.get(this.baseUrl).toPromise();
  }

  async editPerfil(id) {
    const perfil = await this.getPerfil(id);
    return this.httpClient.put(this.baseUrl, perfil).toPromise();
  }





}
