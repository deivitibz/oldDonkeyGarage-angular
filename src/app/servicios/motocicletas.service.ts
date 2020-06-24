import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moto } from '../models/tipo_moto.model';

@Injectable({
  providedIn: 'root',
})
export class MotocicletasService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/motos';
  }

  getMoto(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllMotos(): Promise<Moto[]> {
    return this.httpClient.get<Moto[]>(this.baseUrl).toPromise();
  }

  newMoto(moto: Moto) {
    return this.httpClient.post(this.baseUrl, moto).toPromise();
  }

  deleteMoto(moto) {
    return this.httpClient.delete(this.baseUrl + '/' + moto.id).toPromise();
  }

  editMoto(id, newMoto) {
    return this.httpClient.put(this.baseUrl + '/' + id, newMoto).toPromise();
  }
}
