import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Anuncio } from '../models/anuncio.model';
import { anunciosComponent } from '../components/anuncios/anuncios.component';

@Injectable({
  providedIn: 'root',
})
export class anuncioService {
  baseUrl: string;
  files;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/anuncios';
  }

  addAnuncio(anuncio): Promise<Anuncio> {
    return this.http.post<Anuncio>(this.baseUrl, anuncio).toPromise();
  }

  getAnuncios(): Promise<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.baseUrl).toPromise();
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
    this.http
      .request(req)
      .toPromise()
      .then((result) => {
        console.log(result);
      });
  }
}
