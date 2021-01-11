import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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

  @Output() userForm: EventEmitter<FormGroup>;
  @Output() userEdit: EventEmitter<Usuario>;

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

  usuarioEdit: Usuario;
  allUsers: Usuario[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  form: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.allUsers = [];
    this.usuarioEdit = null;
    // formulario
    this.initializeForm();
  }

  async ngOnInit() {
    this.reloadData();
    this.initializeForm();

  }

  materialDataTable() {
    this.dataSource = new MatTableDataSource(this.allUsers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async reloadData() {
    const response = await this.usuarioService.getUsers();
    this.allUsers = response;
    // this.authService.checkToken(response);
    //this.authService.getToken()
    this.materialDataTable();
  }

  async deleteUser(element) {
    const response = await this.usuarioService.deleteUser(element.id);
    this.openSnackBar(response['success']);
    this.reloadData();
  }

  async editUser(element) {
    // this.togglePanel();
    this.usuarioEdit = await this.usuarioService.getUserById(element.id);
    this.initializeForm();
    this.sendForm(element);

  }

  initializeForm() {
    // formulario
    this.form = new FormGroup({
      username: new FormControl(
        !this.usuarioEdit.username === undefined ? this.usuarioEdit.username : ''),
      email: new FormControl(
        !this.usuarioEdit.email === undefined ? this.usuarioEdit.email : ''),
      password: new FormControl(''),

      // repeatPassword: new FormControl(''),
      rol: new FormControl(!this.usuarioEdit.rol === undefined ? this.usuarioEdit.rol : ''),
    });
  }

  async onSubmit() {
    const newUser = this.form.value;
    if (this.usuarioEdit.id) {
      const response = await this.usuarioService.editUserById(this.usuarioEdit.id, newUser);
      this.reloadData()
      this.form.reset();
      this.usuarioEdit = null;
      this.togglePanel();
      this.openSnackBar(response['success'])
    } else {
      const response = await this.usuarioService.registro(newUser)
      this.reloadData();
      this.form.reset();
      this.openSnackBar(response['success'])
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
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

  sendForm(element) {
    this.userEdit.emit(element)
    this.userForm.emit(this.form);
  }
}
