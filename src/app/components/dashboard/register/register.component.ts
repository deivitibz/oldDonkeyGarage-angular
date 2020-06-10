import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;

  constructor(private userService: UsuarioService) {
    this.formulario = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
        ])
      ),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-z0-9_-]{3,15}$/),
        ])
      ),
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    const response = await this.userService.registro(this.formulario.value);
    console.log(response);

    //if (response['success'])
  }
}
