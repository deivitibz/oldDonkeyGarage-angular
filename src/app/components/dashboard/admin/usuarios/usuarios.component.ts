import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface Usuario {
  id: number,
  username: string,
  email: string,
  rol: string
}



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {
  panelOpenState = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  displayedColumns: string[] = ['id', 'username', 'email','rol','actions'];
  dataSource: MatTableDataSource<Usuario>;

  usuarioEdit: any;
  allUsers: Usuario[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  form: FormGroup;

  constructor(private usuarioService: UsuarioService,private _snackBar: MatSnackBar) {
    this.allUsers = []
    this.usuarioEdit = []

    //formulario
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
      this.allUsers = await this.usuarioService.getUsers();
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;



  }

  async deleteUser(element){
    const response = await this.usuarioService.deleteUser(element.id);

    this.openSnackBar(response);



    /* const response = await this.usuarioService.getUserById(element.id)
    console.log(response); */


  }

  async editUser(element){
    this.togglePanel()
    this.usuarioEdit = await this.usuarioService.getUserById(element.id);

  }

  async onSubmit(){
    const newUser = this.form.value;

    if (this.usuarioEdit.id) {

    } else {
      const response = await this.usuarioService.registro;
      console.log(response);
    }
  }

  openSnackBar(message) {
    this._snackBar.open(message,'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
