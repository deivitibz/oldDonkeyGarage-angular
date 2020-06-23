import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://streaming.zapto.org:3000/api/noticias';
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

  deleteNoticia(id) {
    return this.httpClient.delete(this.baseUrl, id).toPromise();
  }

  async editNoticia(id) {
    const noticia = await this.getNoticia(id);
    return this.httpClient.put(this.baseUrl, noticia).toPromise();
  }

  getFakeApi(): Promise<any>{
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts').toPromise()
  }
}
