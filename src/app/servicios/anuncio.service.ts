import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Anuncio } from '../models/anuncio.model';

@Injectable({
  providedIn: 'root',
})
export class anuncioService {
  baseUrl: string;
  files;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/anuncios';
  }

  addAnuncio(anuncio): Promise<Anuncio> {
    return this.httpClient.post<Anuncio>(this.baseUrl, anuncio).toPromise();
  }

  getAnuncio(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllAnuncios(): Promise<Anuncio[]> {
    return this.httpClient.get<Anuncio[]>(this.baseUrl).toPromise();
  }

  newAnuncio(anuncio: Anuncio) {
    return this.httpClient.post(this.baseUrl, anuncio).toPromise();
  }

  deleteAnuncio(anuncio) {
    // console.log(anuncio);
    return this.httpClient.delete(this.baseUrl + '/' + anuncio.id).toPromise();
  }

  editAnuncio(id, newAnuncio) {
    return this.httpClient.put(this.baseUrl + '/' + id, newAnuncio).toPromise();
  }

  addImages(files, form) {
    let fd = new FormData();
    fd.append('file', files[0], 'nuevaImagen.png');
    fd.append('name', files[0].name);

    let header = new HttpHeaders();
    header.append('Content-Type', 'multipart/form-data');
    const req = new HttpRequest(
      'POST',
      'http://streaming.zapto.org:3000/api/anuncios/upload',
      fd,
      {
        headers: header,
      }
    );
    this.httpClient
      .request(req)
      .toPromise()
      .then((result) => {
        console.log(result);
      });
  }
}
