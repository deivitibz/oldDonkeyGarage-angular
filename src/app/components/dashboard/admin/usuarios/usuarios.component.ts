import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Pslect from 'pselect.js';
import { LoginGuard } from 'src/app/login.guard';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/servicios/auth.service';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  rol: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  panelOpenState = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  // filtro poblaciones / provincias
  provincias: string[];
  provinciasOrder: any[];
  poblaciones: string[];
  filtroProvincias: any[];

  //material tables
  displayedColumns: string[] = ['id', 'username', 'email', 'rol', 'actions'];
  dataSource: MatTableDataSource<Usuario>;

  usuarioEdit: any;
  allUsers: Usuario[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  form: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private guard: LoginGuard
  ) {
    this.allUsers = [];
    this.usuarioEdit = [];

    this.provincias = new Pslect().constructor.provincesData;
    this.poblaciones = new Pslect().constructor.municipesData;
    this.provinciasOrder = [];

    for (let provincia of this.provincias) {
      const provinciaObj: Object = {
        provincia: provincia['nm'],
        id: provincia['id'],
      };
      this.provinciasOrder.push(provinciaObj);
      //this.provinciasOrder.push({ 'provincia': provincia['nm'].toString(), 'id': parseInt(provincia['id']) })
    }
    this.provinciasOrder.sort((a, b) => {
      return this.compareStrings(a['provincia'], b['provincia']);
    });
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
        ])
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

  async deleteUser(element) {
    const response = await this.usuarioService.deleteUser(element.id);
    this.openSnackBar(response);
  }

  async editUser(element) {
    this.togglePanel();
    this.usuarioEdit = await this.usuarioService.getUserById(element.id);
  }

  async onSubmit() {
    const newUser = this.form.value;
    if (this.usuarioEdit.id) {
      const response = await this.usuarioService.createUser(newUser);
      console.log(response);
    } else {
      const response = await this.usuarioService.registro;
      console.log(response);
    }
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProvincias($event) {
    this.filtroProvincias = [];
    this.poblaciones.filter((result) => {
      let idProvincia =
        $event.target.options[$event.target.options['selectedIndex']].dataset
          .id;
      let idPoblacion = result['id'];
      idPoblacion = idPoblacion.substr(0, 2);
      if (idPoblacion === idProvincia) {
        this.filtroProvincias.push(result);
      }
    });
  }

  compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  }
}
