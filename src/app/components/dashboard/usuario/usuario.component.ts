import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Anuncio } from './../../../models/anuncio.model';
import { anuncioService } from './../../../servicios/anuncio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Pslect from 'pselect.js';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import * as brands from '../../../db/moto_brands.json';
import * as models from '../../../db/moto_models.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dash-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioDashComponent implements OnInit {
  panelOpenState = false;
  estado = 'Añadir';
  displayedColumns: string[] = [
    'id',
    'titulo',
    'descripcion',
    'precio',
    'actions',
  ];
  dataSource: MatTableDataSource<Anuncio>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  // filtro poblaciones / provincias
  files;
  // filtro poblaciones / provincias
  provincias: string[];
  poblaciones: string[];
  provinciasOrder: any[];
  // filtro marca / modelo
  marcas: any;
  modelos: any;
  filtroModelos: any[];
  filtroProvincias: any[];

  allAnuncios: Anuncio[];
  anuncioEdit: any;
  anunciosUser: Anuncio[];
  form: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private anuncioService: anuncioService,
    private authService: AuthService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {
    this.marcas = brands.data;
    this.modelos = models.data;
    /* this.anunciosUser = []; */
    this.anuncioEdit = [];
    /* provincias - poblaciones */
    this.provincias = new Pslect().constructor.provincesData;
    this.poblaciones = new Pslect().constructor.municipesData;
    this.provinciasOrder = [];
    for (let provincia of this.provincias) {
      const provinciaObj = {
        provincia: provincia['nm'],
        id: provincia['id'],
      };
      this.provinciasOrder.push(provinciaObj);
    }
    /* ordenar de la A a la Z las provincias */
    this.provinciasOrder.sort((a, b) => {
      return this.compareStrings(a['provincia'], b['provincia']);
    });

    this.initializeForm();

  }

  initializeForm(){
        this.form = new FormGroup({
      titulo: new FormControl(this.anuncioEdit['titulo'], []),
      descripcion: new FormControl(this.anuncioEdit['descripcion'], []),
      provincia: new FormControl(this.anuncioEdit['provincia'], []),
      poblacion: new FormControl(this.anuncioEdit['poblacion'], []),
      precio: new FormControl(this.anuncioEdit['precio'], []),
      marca: new FormControl(this.anuncioEdit['marca'], []),
      km: new FormControl(this.anuncioEdit['km'], []),
      year: new FormControl(this.anuncioEdit['year'], []),
      modelo: new FormControl(this.anuncioEdit['modelo'], []),
      itv: new FormControl(this.anuncioEdit['itv'], []),
      homologacion: new FormControl(this.anuncioEdit['homologacion'], []),
    });
  }

  filtrarMarcas(form) {
    this.filtroModelos = [];
    this.modelos.filter((result) => {
      var idMarca = parseInt($('#marca option:selected').attr('id'));
      let idModelo = result.brand_id;
      if (idModelo === idMarca) {
        this.filtroModelos.push(result);
      }
    });
  }

  ngOnInit() {
    this.reloadData();
  }
  async reloadData() {
    const currentUser = this.authService.decodeToken();
    this.anunciosUser = await this.anuncioService.getAnunciosById(currentUser['userId']);
    this.materialDataTable();
  }

  materialDataTable() {
    this.dataSource = new MatTableDataSource(this.anunciosUser);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Cerrar', {
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

  async deleteUser(element) {
    const response = await this.anuncioService.deleteAnuncio(element.id);
    //const response = await this.usuarioService.deleteUser(element.id);
    this.openSnackBar(response['success']);
    this.reloadData();
  }

  async editUser(element) {
    this.togglePanel();
    this.anuncioEdit = await this.anuncioService.getAnuncio(element.id);
    this.initializeForm();
  }
  async onSubmit() {
    const newAnuncio = this.form.value;
    newAnuncio.usuarios_id = this.authService.decodeToken()['userId'];
    console.log(newAnuncio);
    if (this.anuncioEdit['id']) {
      const response = await this.anuncioService.editAnuncioById(this.anuncioEdit['id'],this.form.value);
      this.reloadData();
      this.openSnackBar(response['success']);
      this.togglePanel()
    } else {
      const response = await this.anuncioService.addAnuncio(newAnuncio);
      this.reloadData();
      this.openSnackBar(response['success']);
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

  onFileChange($event) {
    this.files = $event.target.files;
  }
}
