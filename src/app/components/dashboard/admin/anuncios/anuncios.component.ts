import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Anuncio } from 'src/app/models/anuncio.model';
import { anuncioService } from 'src/app/servicios/anuncio.service';
import Pslect from 'pselect.js';
import * as brands from '../../../../db/moto_brands.json';
import * as models from '../../../../db/moto_models.json';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// imports tablas
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/servicios/auth.service';

import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { UploadService } from './../../../../servicios/upload.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
})
export class AnunciosComponent implements OnInit {
  allAnuncios: Anuncio[];
  anuncioEdit: any;
  files;
  //files: string[];
  //panel
  panelOpenState = false;
  //snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  //datatables settings
  displayedColumns: string[] = ['id','titulo','descripcion','precio','actions'];
  dataSource: MatTableDataSource<Anuncio>;
  // filtro poblaciones / provincias
  provincias: string[];
  poblaciones: string[];
  provinciasOrder: any[];
  // filtro marca / modelo
  marcas: any;
  modelos: any;
  filtroModelos: any[];
  filtroProvincias: any[];
  // formulario
  form: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private anuncioService: anuncioService,
    private authService: AuthService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private upload: UploadService
  ) {
    this.anuncioEdit = [];
    this.marcas = brands.data;
    this.modelos = models.data;
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
    /* campos formulario */
    this.initializeForm();
  }

  async ngOnInit() {
    //this.allAnuncios = await this.anuncioService.getAnuncios();
    this.reloadData();
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
      tipoCustom: new FormControl(this.anuncioEdit['tipoCustom'], []),
      imagen_id: new FormControl(this.anuncioEdit['imagen_id'], []),
      // tipoCustom: new FormControl('', []),
    });
  }

  materialDataTable() {
    this.dataSource = new MatTableDataSource(this.allAnuncios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async reloadData() {
    const response = await this.anuncioService.getAllAnuncios();
    this.allAnuncios = response
    this.authService.checkToken(response);
    this.materialDataTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  async deleteAnuncio(anuncio) {
    const response = await this.anuncioService.deleteAnuncio(anuncio.id);
    this.openSnackBar(response['success']);
    this.reloadData();
  }

  async editAnuncio(anuncio) {
    this.togglePanel();
    this.anuncioEdit = await this.anuncioService.getAnuncio(anuncio.id);
    this.initializeForm()
  }

  async addAnuncio() {
    this.anuncioService.addAnuncio(this.form.value);
  }

  onSubmit() {
    const newAnuncio = this.form.value;
    newAnuncio.usuarios_id = this.authService.decodeToken()['userId'];
    newAnuncio.imagen = '';
    const filename = this.files[0]['name'];

    const file = new FormData();
    file.append('imagen', this.files[0], this.files[0]['name']);

    //this.anuncioService.addImages(file);
    /* let header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type','multipart/form-data');
    let req = new HttpRequest("POST","http://localhost:3000/api/upload",file, { headers: header });
    this.http.request(req).toPromise()
      .then((result) => {
        console.log(result);
      }); */

    //this.anuncioService.addImages(newAnuncio.imagenes);
    //console.log(newAnuncio);
    //const response = this.anuncioService.addAnuncio(newAnuncio)
    //console.log(response);
  }

  async onSubmitFormulario() {
    const newAnuncio = this.form.value;
    newAnuncio.usuarios_id = this.authService.decodeToken()['userId'];
    if(this.anuncioEdit.id){
      const response = await this.anuncioService.editAnuncioById(this.anuncioEdit.id,newAnuncio);
      this.reloadData();
      this.form.reset();
      this.anuncioEdit = [];
      this.togglePanel();
      this.openSnackBar(response['success']);
    } else {
      const response = await this.anuncioService.addAnuncio(newAnuncio);
      this.reloadData();
      this.form.reset();
      this.openSnackBar(response['success']);
      this.panelOpenState = false;
    }

  }

  onFileChange($event) {
    this.files = $event.target.files;
    //console.log(this.files);

    this.upload.addImages(this.files)
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
