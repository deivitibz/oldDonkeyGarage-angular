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
  addAnuncio(anuncio): Promise<any> {
    return this.httpClient.post(this.baseUrl + '/anuncio', anuncio).toPromise();


  }

  getAnuncios(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const Anuncio = [];
      for (let anuncio of Anuncio) {
        Anuncio.push();
      }
      resolve(Anuncio);
    });
  }
}


