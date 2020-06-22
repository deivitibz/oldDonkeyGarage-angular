import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  MinLengthValidator,
} from '@angular/forms';

import { PerfilService } from '../../../servicios/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  formulario: FormGroup;
  allPerfil: any[];

  constructor(private perfilService: PerfilService) {
    this.allPerfil = [];
    this.formulario = new FormGroup({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
        ])
      ),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
      nombre: new FormControl('', []),
      direccion: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      nombre_constructor: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      descripcion: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(150),
        ])
      ),
      persona_contacto: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      telefono: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /(\+34|0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})/
          ),
        ]),
      ),
      imagenes_usuario: new FormControl('', []),
      imagenes_constructor: new FormControl('', []),
    });
  }
  async ngOnInit() {
    const response = await this.perfilService.getAllPerfiles();
    this.allPerfil.push(response);

  }

  async getAllPerfil() {
    const respuesta = await this.perfilService.getAllPerfiles()
    console.log(respuesta);
  }

  async getPerfil(id) {
    const resp = await this.perfilService.getPerfil(id);
    console.log(resp);
  }

  async editPerfil(id) {
    const edit = await this.perfilService.editPerfil(id);
    console.log(edit);
  }
  onSubmit() {

  }
}
