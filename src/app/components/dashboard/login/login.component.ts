import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as $ from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('qmodal') qmodal;

  form: FormGroup;
  valid: boolean;
  baseUrl: string;
  validToken: boolean;
  error: boolean;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private renderer: Renderer2,
    private httpClient: HttpClient
  ) {
    this.validToken = false;
    this.error = false;

    this.baseUrl = 'http://mypanel.sytes.net:3000/api/usuarios';
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    const response = await this.usuarioService.login(this.form.value);
    console.log(response);

    if (response['success']) {
      this.saveToken(response.token);
      this.cierraPopup();
      this.form.reset();
      if(response.rol === 'Admin'){
        this.router.navigate(['admin','usuarios']);
      } else {
        this.router.navigate(['dashboard','perfil'])
      }

      } else {
        this.error = true;
        console.log('no se ha podido hacer login');
    }
  }

  checkToken(token): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'user-token': token,
      }),
    };
    return this.httpClient.get(this.baseUrl + '/check', options).toPromise();
  }

  saveToken(token) {
    localStorage.setItem('user-token', token);
  }

  cierraPopup() {
    $('#exampleModal').hide(); //ocultamos el modal
    $('body').removeClass('modal-open'); //eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove(); //eliminamos el backdrop del modal
  }
}
