import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as brands from '../../db/moto_brands.json';
import * as models from '../../db/moto_models.json';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio.model';
import { anuncioService } from 'src/app/servicios/anuncio.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
})
export class anunciosComponent implements OnInit {
  files;

  marcas: any;
  modelos: any;
  filtroModelos: any[];

  arrAnuncios: Anuncio[];

  form: FormGroup;

  constructor(
    private anuncioService: anuncioService,
    private http: HttpClient,
    private router: Router
  ) {
    this.marcas = brands.data;
    this.modelos = models.data;
    this.form = new FormGroup({
      titulo: new FormControl('', []),
      descripcion: new FormControl('', []),
      precio: new FormControl('', []),
      marca: new FormControl('', []),
      kms: new FormControl('', []),
      modelo: new FormControl('', []),
      itv: new FormControl('', []),
      homologacion: new FormControl('', []),
      file: new FormControl('', []),
      tipoCustom: new FormControl('', []),
    });
  }

  async ngOnInit() {
    const response = await this.anuncioService.getAnuncios();
    // console.log(response);
    // if (response['error']) {
    //   this.router.navigate([]);
    // } else {
    //   this.arrAnuncios = response;
    //   console.log(response);
    // }
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

  onSubmitFormulario() {
    this.anuncioService.addImages(this.files, this.form);
  }

  onFileChange($event) {
    this.files = $event.target.files;
  }
}
