import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MotocicletasService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {

    this.baseUrl = 'http://streaming.zapto.org:3000/api/motos'

  }

  getAllMotos(): Promise<any> {
    return this.httpClient.get(this.baseUrl).toPromise()
  }

  getMoto(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }


}
