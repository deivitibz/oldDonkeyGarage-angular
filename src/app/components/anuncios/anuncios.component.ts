import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Pslect from 'pselect.js';

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
  provincias: string[];
  provinciasOrder: any[];

  poblaciones: string[];
  marcas: any;
  modelos: any;
  filtroModelos: any[];
  filtroProvincias: any[];

  arrAnuncios: any[];

  form: FormGroup;

  constructor(
    private anuncioService: anuncioService,
    private http: HttpClient,
    private router: Router
  ) {
    this.marcas = brands.data;
    this.modelos = models.data;

    this.form = new FormGroup({
      id_provincia: new FormControl('', []),
      titulo: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      file: new FormControl('', []),
      descripcion: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(30),
        ])
      ),
      kms: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\$?\d+(,\d{3})*(\.\d*)?$/),
        ])
      ),
      year: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      poblacion: new FormControl('', []),
      itv: new FormControl('', []),
      homologacion: new FormControl('', []),
      precio: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\$?\d+(,\d{3})*(\.\d*)?$/),
        ])
      ),
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', []),
      tipoCustom: new FormControl('', []),
    });

    this.provincias = new Pslect().constructor.provincesData;
    this.poblaciones = new Pslect().constructor.municipesData;
<<<<<<< HEAD
    this.provinciasOrder = [];
    for (let provincia of this.provincias){
      const provinciaObj: Object = { provincia: provincia['nm'],id: provincia['id']}
      this.provinciasOrder.push(provinciaObj)
      //this.provinciasOrder.push({ 'provincia': provincia['nm'].toString(), 'id': parseInt(provincia['id']) })
    }
    this.provinciasOrder.sort((a,b)=>{
      return this.compareStrings(a['provincia'], b['provincia']);
    })
    console.log(this.provinciasOrder.sort());

  }

  compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
=======
>>>>>>> featured-models
  }

  async ngOnInit() {
    const response = await this.anuncioService.getAnuncios();
<<<<<<< HEAD


/*     if (response['error']) {
=======
    console.log(response);
    /*     if (response['error']) {
>>>>>>> featured-models
      this.router.navigate([]);
    } else {
      this.arrAnuncios.push(response)
      console.log(response);
    } */
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
    //this.anuncioService.addImages(this.files, this.form);
    console.log(this.form.value);
  }

  onFileChange($event) {
    this.files = $event.target.files;
  }

<<<<<<< HEAD
  getProvincias($event){
    this.filtroProvincias = [];
    this.poblaciones.filter((result)=>{


      let idProvincia = $event.target.options[$event.target.options['selectedIndex']].dataset.id;
=======
  getProvincias(form) {
    this.filtroProvincias = [];
    console.log(this.poblaciones);

    this.poblaciones.filter((result) => {
      let idProvincia = this.form.value['provincia'];
>>>>>>> featured-models
      let idPoblacion = result['id'];
      idPoblacion = idPoblacion.substr(0, 2);

<<<<<<< HEAD
      if (idPoblacion === idProvincia){
        this.filtroProvincias.push(result)
        //console.log(result);
=======
      if (idPoblacion === idProvincia) {
        this.filtroProvincias.push(result);
        console.log(result);
>>>>>>> featured-models
      }
    });
    //console.log(this.filtroProvincias);
  }
}
