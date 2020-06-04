import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as brands from '../../db/moto_brands.json';
import * as models from '../../db/moto_models.json';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class anunciosComponent implements OnInit {

  marcas: any;
  modelos: any;
  filtroModelos: any[];

  form: FormGroup;

  constructor() {
    this.marcas = brands.data;
    this.modelos = models.data;
    this.form = new FormGroup({
      titulo: new FormControl('',[]),
      descripcion: new FormControl ('',[]),
      precio: new FormControl ('',[]),
      marca: new FormControl ('',[]),
      modelo: new FormControl ('',[]),
      tipoCustom: new FormControl ('',[])

    })
  }

  ngOnInit(): void {
  }

  filtrarMarcas(form){
    this.filtroModelos = [];
    this.modelos.filter(result =>{
      let idMarca = parseInt(form.value.marca);
      let idModelo = result.brand_id;
      if (idModelo === idMarca){
        this.filtroModelos.push(result);
      }
    });


  }

  onSubmitFormulario(forms){
    console.log(forms.value);

  }

}
