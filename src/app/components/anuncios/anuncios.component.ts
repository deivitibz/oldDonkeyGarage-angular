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
    console.log(form.value);

  }

  onSubmitFormulario(forms){
    console.log(forms.value);

  }

}
