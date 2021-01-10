import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from './../../../../models/usuario_perfil.model';
import { Anuncio } from './../../../../models/anuncio.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup;

  @Input() formType: string;

  constructor(public router: Router) {
    this.initializeForm()
  }

  ngOnInit(): void {

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

  onLoginSubmit(){
    console.log('login submitted')
  }

  onRegisterSubmit(){
    console.log('register submitted')
    this.router.navigate(['/registro'])
  }


}
