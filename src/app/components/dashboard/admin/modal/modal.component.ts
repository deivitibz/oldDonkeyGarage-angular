import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from './../../../../models/usuario_perfil.model';
import { Anuncio } from './../../../../models/anuncio.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() usuarioEdit: Usuario;

  @Input() form: FormGroup;

  @Input() anuncio: Anuncio;

  constructor() {
    this.initializeForm()
  }

  ngOnInit(): void {
    console.log(this.usuarioEdit);



  }


  initializeForm(){
    // formulario
    this.form = new FormGroup({
      username: new FormControl(
        ),
      email: new FormControl(
        ),
      password: new FormControl(),

      // repeatPassword: new FormControl(''),
      rol: new FormControl(),
    });
  }

  onSubmit(){
    console.log(this.form.value);

  }


}
