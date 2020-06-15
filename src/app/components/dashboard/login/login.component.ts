import { Component, OnInit, Renderer2, ElementRef, ViewChild  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild("qmodal") qmodal

  form: FormGroup;
  valid: boolean;

  constructor(
        private router: Router,
        private usuarioService: UsuarioService,
        private renderer: Renderer2
        ) {



    this.valid = true;
    this.form = new FormGroup({
      email: new FormControl('',),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {}

  async onSubmit($event) {

    const response = await this.usuarioService.login(this.form.value);
    console.log(response);

    if (response['success']) {

      $("#exampleModal").hide();//ocultamos el modal
      $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
      $('.modal-backdrop').remove();//eliminamos el backdrop del modal
      //this.renderer.setAttribute(this.myButton.nativeElement, "data-dismiss", 'modal')
      const token = response['token'];
      localStorage.setItem('userToken', token);
      this.form.reset();
      this.router.navigate(['dashboard']);

    } else if ( response['error']) {
      this.form.reset();
      this.valid = false;
    }

  }

  cierraPopup() {
    $("#exampleModal").hide();//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
  }


}
