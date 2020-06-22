import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface Usuario {
  id: number,
  username: string,
  email: string;
}



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {


  oneUser: Object;
  allUsers: Usuario[];
  displayedColumns: string[] = ['id','username','email','actions']
  dataSource = this.allUsers


  form: FormGroup;

  constructor(private usuarioService: UsuarioService) {
    this.allUsers = []

    this.oneUser = new Object;


    this.form = new FormGroup({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
        ])
      ),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
      nombre: new FormControl('', []),
      direccion: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      nombre_constructor: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      descripcion: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(150),
        ])
      ),
      persona_contacto: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      telefono: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /(\+34|0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})/
          ),
        ]),
      ),
      imagenes_usuario: new FormControl('', []),
      imagenes_constructor: new FormControl('', []),
    });
  }


  async ngOnInit() {
    try{
      const response = await this.usuarioService.getUsers();
      console.log(response);
      this.allUsers = response;

    } catch (err) {
      console.log(err);

    }

  }

  async deleteUser(element){
    const response = await this.usuarioService.getUserById(element.id)
    console.log(response);


  }

  async editUser(element){
    this.oneUser = await this.usuarioService.getUserById(element.id)
    //console.log(response);
    console.log(this.oneUser);



  }

  onSubmit(){

  }

}
