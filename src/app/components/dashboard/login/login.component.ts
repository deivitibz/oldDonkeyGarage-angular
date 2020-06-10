import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(private router: Router,private usuarioService: UsuarioService) {
    this.form = new FormGroup({
      username: new FormControl('',[]),
      password: new FormControl('',[])
    })
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const response = await this.usuarioService.login(this.form.value);
    if(response['success']) {
      const token = response['token'];
      localStorage.setItem('userToken', token)
    }

  }
}
