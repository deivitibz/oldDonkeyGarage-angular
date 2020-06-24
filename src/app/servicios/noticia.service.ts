import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/noticias';
  }

  getNoticia(id): Promise<Noticia> {
    return this.httpClient.get<Noticia>(this.baseUrl + '/' + id).toPromise();
  }

  getAllNoticias(): Promise<Noticia[]> {
    return this.httpClient.get<Noticia[]>(this.baseUrl).toPromise();
  }

  newNoticia(noticia: Noticia) {
    return this.httpClient.post(this.baseUrl, noticia).toPromise();
  }

  deleteNoticia(noticia) {
    return this.httpClient.delete(this.baseUrl + '/' + noticia.id).toPromise();
  }

  async editNoticia(id, newNoticia) {
    return this.httpClient.put(this.baseUrl + '/' + id, newNoticia).toPromise();
  }
}
