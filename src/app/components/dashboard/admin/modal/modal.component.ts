import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioPerfil } from './../../../../models/usuario_perfil.model';
import { Anuncio } from './../../../../models/anuncio.model';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup;

  @Input() formType: string;

  constructor(
    public router: Router,
    private userService: UsuarioService
    ) {
    //this.initializeRegisterForm()
      this.initializeLoginForm();
  }

  ngOnInit(): void {

  }


  initializeRegisterForm(){
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

  initializeLoginForm(){
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  async onLoginSubmit(){
    const response = await this.userService.login(this.form.value)
    console.log(response)
  }

  onRegisterSubmit(){
    console.log('register submitted')
    this.router.navigate(['/registro'])
  }


}
