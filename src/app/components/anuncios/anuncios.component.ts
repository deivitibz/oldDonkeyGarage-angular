import { Component, OnInit, NgModule, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Pslect from 'pselect.js';

import * as brands from '../../db/moto_brands.json';
import * as models from '../../db/moto_models.json';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio.model';
import { anuncioService } from 'src/app/servicios/anuncio.service';
import { Observable } from 'rxjs';
import { AnuncioInterface } from './../../models/anuncio.interface';
import { ANUNCIOS_MOCK } from './../../mocks/anuncios.mock';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
})
export class anunciosComponent implements OnInit {

  @Output() anunciosForm: EventEmitter<FormGroup> = new EventEmitter;

  files: string[];
  // filtro poblaciones / provincias
  provincias: string[];
  provinciasOrder: any[];
  poblaciones: string[];
  // filtro marca / modelo
  marcas: any;
  modelos: any;
  filtroModelos: any[];
  filtroProvincias: any[];

  allAnuncios: AnuncioInterface[] = [];
  anuncios: AnuncioInterface[] = [];
  // formulario
  form: FormGroup;

  constructor(
    private anuncioService: anuncioService,
    private http: HttpClient,
    public router: Router
  ) {
    this.marcas = brands.data;
    this.modelos = models.data;
    this.form = new FormGroup({
      id_provincia: new FormControl('', []),
      titulo: new FormControl('', []),
      descripcion: new FormControl('', []),
      provincia: new FormControl('', []),
      poblacion: new FormControl('', []),
      precio: new FormControl('', []),
      marca: new FormControl('', []),
      kms: new FormControl('', []),
      modelo: new FormControl('', []),
      itv: new FormControl('', []),
      homologacion: new FormControl('', []),
      imagenes: new FormControl('', []),
      tipoCustom: new FormControl('', []),
    });
    this.files = [];
    this.provincias = new Pslect().constructor.provincesData;
    this.poblaciones = new Pslect().constructor.municipesData;
    this.provinciasOrder = [];
    for (let provincia of this.provincias) {
      const provinciaObj: Object = {
        provincia: provincia['nm'],
        id: provincia['id'],
      };
      this.provinciasOrder.push(provinciaObj);
      //this.provinciasOrder.push({ 'provincia': provincia['nm'].toString(), 'id': parseInt(provincia['id']) })
    }
    this.provinciasOrder.sort((a, b) => {
      return this.compareStrings(a['provincia'], b['provincia']);
    });
  }

  compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  }

  async ngOnInit() {
    this.anuncios = await this.anuncioService.getAnuncios()
    this.getAnuncios();

    this.anunciosForm.emit(this.form)
  }

  async getAnuncios() {
    const response = await this.anuncioService.getAnuncios();
    this.allAnuncios = response;
    this.allAnuncios.map(element => {
      element.imagen_id = element.imagen_id ? element.imagen_id : 'assets/img/moto.png'
    })
    console.log(this.allAnuncios)
  }


  filtrarMarcas(form) {
    this.filtroModelos = [];
    this.modelos.filter((result) => {
      let idMarca = parseInt(this.form.value.marca);
      let idModelo = result.brand_id;

      if (idModelo === idMarca) {
        this.filtroModelos.push(result);
      }
    });
    console.log(this.filtroModelos);
  }


  getProvincias($event) {
    this.filtroProvincias = [];
    this.poblaciones.filter((result) => {
      let idProvincia =
        $event.target.options[$event.target.options['selectedIndex']].dataset
          .id;
      let idPoblacion = result['id'];
      idPoblacion = idPoblacion.substr(0, 2);

      if (idPoblacion === idProvincia) {
        this.filtroProvincias.push(result);
      }
    });
  }

  async getCategory($event) {
    //this.allAnuncios = [];
    //this.allAnuncios = await this.anuncioService.getAnuncioByCategory($event)
  }

  showDetail(anuncio) {

    this.router.navigate(['anuncios', 'detalle', anuncio.id])
  }
}
