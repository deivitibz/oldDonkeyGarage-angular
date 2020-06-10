import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Anuncio } from '../models/anuncio.model'
import { anunciosComponent } from '../components/anuncios/anuncios.component';


@Injectable({
  providedIn: 'root'
})


export class anuncioService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/anuncios';

  }
  addAnuncio(anuncio) {
    return this.httpClient.post(this.baseUrl , anuncio).toPromise();


  }

  getAnuncios() {
    return this.httpClient.get(this.baseUrl).toPromise();
  }
}
