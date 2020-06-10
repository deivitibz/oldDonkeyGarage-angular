import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formulario: FormGroup


  constructor(private userService: UsuarioService) {


    this.formulario = new FormGroup({

      email: new FormControl(''),
      password: new FormControl(''),
      username: new FormControl('')

    });

  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const response = await this.userService.registro(this.formulario.value);
    console.log(response);

    //if (response['success'])
  }
}
