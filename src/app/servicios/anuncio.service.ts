import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Anuncio } from '../models/anuncio.model';
import { AuthService } from 'src/app/servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class anuncioService {
  baseUrl: string;
  files: FormData;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.baseUrl = 'http://localhost:3000/api/anuncios';
  }

  /* PETICIONES GET  */
  getAnuncios(): Promise<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.baseUrl).toPromise();
  }

  getAnuncio(id): Promise<Anuncio> {
    return this.http.get<Anuncio>(this.baseUrl + '/' + id, this.auth.generateHeaders()).toPromise();
  }

  getAnunciosById(id): Promise<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.baseUrl + '/getbyuser/' + id, this.auth.generateHeaders()).toPromise();
  }

  getAnuncioByCategory(category): Promise<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.baseUrl + '/getbycategoria/' + category).toPromise()
  }


  /* PETICIONES POST */

  addAnuncio(anuncio: Anuncio): Promise<Anuncio> {
    return this.http.post<Anuncio>(this.baseUrl, anuncio, this.auth.generateHeaders()).toPromise();
  }

  addImages(fd: FormData) {
    return this.http.post(this.baseUrl + '/upload', fd, this.auth.generateHeaders()).toPromise();
  }

  /* PETICIONES PUT */

  editAnuncio(id, newAnuncio): Promise<Anuncio> {
    return this.http.put<Anuncio>(this.baseUrl + '/' + id, newAnuncio, this.auth.generateHeaders()).toPromise();
  }

  editAnuncioById(id, newAnuncio: Anuncio): Promise<Anuncio> {
    return this.http.put<Anuncio>(this.baseUrl + '/' + id, newAnuncio, this.auth.generateHeaders()).toPromise();
  }

  /* PETICIONES DELETE */

  deleteAnuncio(id): Promise<Anuncio> {
    return this.http.delete<Anuncio>(this.baseUrl + '/' + id, this.auth.generateHeaders()).toPromise();
  }

}
