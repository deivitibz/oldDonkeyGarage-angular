import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Usuario } from './models/usuario_perfil.model';
import { FormGroup } from '@angular/forms';
import { Anuncio } from './models/anuncio.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ruta: string;
  userForm: FormGroup;
  form: FormGroup = new FormGroup({});
  useredit: Usuario;
  anuncioAdmin: Anuncio;

  constructor(public router: Router) {

    this.ruta = 'usuarios';
    /*     this.userForm = new FormGroup ({
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
        }) */

  }

  /*   componentAdded(event){
      event.anuncioAdmin.subscribe((event) => {
        this.anuncioAdmin = event;

      });

    } */

}
