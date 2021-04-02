import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Anuncio } from '../models/anuncio.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { environment } from 'src/environments/environment'
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule } from '@angular/fire/database';
import { AnuncioInterface } from './../models/anuncio.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Injectable({
  providedIn: 'root',
})
export class anuncioService {
  private anunciosDB: AngularFireList<AnuncioInterface>

  baseUrl: string;
  files: FormData;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private db: AngularFireDatabase) {
      this.anunciosDB = this.db.list('/anuncios', ref => ref.orderByChild('id'));
      this.baseUrl = environment.dbhost;
  }

  async getAnuncios(): Promise<AnuncioInterface[]>{
    const response = await this.http.get<AnuncioInterface[]>(`${environment.mockHost}/assets/mocks/anuncios.mock.json`).toPromise();
    response.map(element => element.imagen_id = element.imagen_id ? element.imagen_id : 'assets/img/moto.png');
    return response;
  }

  async getAnuncioById(id: string | number): Promise<AnuncioInterface> {
    let response = await this.http.get<AnuncioInterface[]>(`${environment.mockHost}/assets/mocks/anuncios.mock.json`).toPromise()
    response.map(element => element.imagen_id = element.imagen_id ? element.imagen_id : 'assets/img/moto.png')
    return response.find((element: AnuncioInterface) => element.id === id);
  }

}
