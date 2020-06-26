import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Anuncio } from '../models/anuncio.model';

@Injectable({
  providedIn: 'root',
})
export class anuncioService {
  baseUrl: string;
  files: FormData;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/anuncios';
  }

  addAnuncio(anuncio): Promise<Anuncio> {
    return this.http.post<Anuncio>(this.baseUrl, anuncio).toPromise();
  }

  getAllAnuncios(): Promise<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.baseUrl).toPromise();
  }

  newAnuncio(anuncio: Anuncio) {
    return this.http.post(this.baseUrl, anuncio).toPromise();
  }


  editAnuncio(id, newAnuncio) {
    return this.http.put(this.baseUrl + '/' + id, newAnuncio).toPromise();
  }


  getAnunciosById(id): Promise<Anuncio[]>{
    return this.http.get<Anuncio[]>(this.baseUrl + '/getbyuser/' + id).toPromise();
  }

  editAnuncioById(id,newAnuncio): Promise<Anuncio>{
    return this.http.put<Anuncio>(this.baseUrl + '/' + id,newAnuncio).toPromise()
  }

  getAnuncio(id): Promise<any>{
    return this.http.get(this.baseUrl + '/' + id).toPromise();
  }

  deleteAnuncio(id): Promise<Anuncio>{
    return this.http.delete<Anuncio>(this.baseUrl + '/' + id).toPromise()
  }

  async addImages(file) {
    let header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type','multipart/form-data');
    let req = new HttpRequest("POST","http://localhost:3000/api/upload",file, { headers: header });
    this.http.request(req).toPromise()
      .then((result) => {
        console.log(result);
      });
  }
}
