import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;
  error: boolean;
  message: string;
  constructor(private userService: UsuarioService,private router: Router) {
    this.formulario = new FormGroup({
      email: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),])
      ),
      password: new FormControl('',[Validators.required]),
      repeatPassword: new FormControl('',[Validators.required]),
      username: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z0-9_-]{3,15}$/),])
      ),
    });
    this.error = false;
  }


  ngOnInit(): void { }

  async onSubmit() {

    const response = await this.userService.registro(this.formulario.value);
    console.log(response)
    this.message = response['error'];
    if (response['success']){
      this.router.navigate(['home'])
    }
    if (response['error']){
      this.error = true;
      this.formulario.reset();
    }
  }
}
