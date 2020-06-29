import { Component, OnInit } from '@angular/core';
import { MotocicletasService } from 'src/app/servicios/motocicletas.service';
import { Anuncio } from 'src/app/models/anuncio.model';
import { anuncioService } from 'src/app/servicios/anuncio.service';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.css'],
})
export class MotoComponent implements OnInit {
  allAnuncios: Anuncio[];

  constructor(
    private motoService: MotocicletasService,
    private anuncioService: anuncioService
  ) {}

  async ngOnInit() {
    const response = await this.anuncioService.getAnuncios();
    this.allAnuncios = response;
    this.allAnuncios = this.allAnuncios.splice(1,9)
    // const response = await this.motoService.getAllMotos();
    // console.log(response);
    // this.getMoto(1)
  }
  async getMoto(id) {
    const respuesta = await this.motoService.getMoto(id);
    console.log(respuesta);
  }
}
