import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../models/noticia.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  baseUrl: string;

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.baseUrl = 'http://localhost:3000/api/noticias';
  }

  getNoticia(id): Promise<Noticia> {
    return this.httpClient.get<Noticia>(this.baseUrl + '/' + id).toPromise();
  }

  getAllNoticias(): Promise<Noticia[]> {
    return this.httpClient.get<Noticia[]>(this.baseUrl).toPromise();
  }

  newNoticia(noticia: Noticia) {
    return this.httpClient.post(this.baseUrl, noticia,this.auth.generateHeaders()).toPromise();
  }

  deleteNoticia(noticia) {
    return this.httpClient.delete(this.baseUrl + '/' + noticia.id,this.auth.generateHeaders()).toPromise();
  }

  async editNoticia(id, newNoticia) {
    return this.httpClient.put(this.baseUrl + '/' + id, newNoticia,this.auth.generateHeaders()).toPromise();
  }
}
