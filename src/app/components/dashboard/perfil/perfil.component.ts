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

  constructor(private perfilService: PerfilService) {
    this.formulario = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      surname: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /(\+34|0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})/
          ),
        ]),
      ),
      location: new FormControl(''),
      location_Provincia: new FormControl(''),
    });
  }
  async ngOnInit() {
    //this.getAllPerfil()

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
  onSubmit() { }
}
