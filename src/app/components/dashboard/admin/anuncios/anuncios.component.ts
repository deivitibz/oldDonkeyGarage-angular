import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Pslect from 'pselect.js';

import * as brands from '../../../../db/moto_brands.json';
import * as models from '../../../../db/moto_models.json';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio.model';
import { anuncioService } from 'src/app/servicios/anuncio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
})
export class AnunciosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'precio'];
  dataSource: MatTableDataSource<Anuncio>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  files: string[];
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
  // formulario
  form: FormGroup;

  constructor(
    private anuncioService: anuncioService,
    private authService: AuthService
  ) {
    this.marcas = brands.data;
    this.modelos = models.data;

    this.provincias = new Pslect().constructor.provincesData;
    this.poblaciones = new Pslect().constructor.municipesData;
    this.provinciasOrder = [];
    for (let provincia of this.provincias) {
      const provinciaObj = {
        provincia: provincia['nm'],
        id: provincia['id'],
      };
      this.provinciasOrder.push(provinciaObj);
      //this.provinciasOrder.push({ 'provincia': provincia['nm'].toString(), 'id': parseInt(provincia['id']) })
    }
    this.provinciasOrder.sort((a, b) => {
      return this.compareStrings(a['provincia'], b['provincia']);
    });

    this.form = new FormGroup({
      titulo: new FormControl('', []),
      descripcion: new FormControl('', []),
      provincia: new FormControl('', []),
      poblacion: new FormControl('', []),
      precio: new FormControl('', []),
      marca: new FormControl('', []),
      km: new FormControl('', []),
      year: new FormControl('', []),
      modelo: new FormControl('', []),
      itv: new FormControl('', []),
      homologacion: new FormControl('', []),
      imagenes: new FormControl('', []),
      tipoCustom: new FormControl('', []),
    });
  }

  async ngOnInit() {
    this.allAnuncios = await this.anuncioService.getAnuncios();
    this.dataSource = new MatTableDataSource(this.allAnuncios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteNoticia(anuncio) {
    console.log(anuncio);
  }

  editNoticia(anuncio) {
    console.log(anuncio);
  }

  async addNoticia() {
    this.anuncioService.addAnuncio(this.form.value);
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

  async onSubmitFormulario() {
    // console.log(this.form.value);

    const newAnuncio = this.form.value;
    newAnuncio.usuarios_id = this.authService.decodeToken()['userId'];
    // this.anuncioService.addImages(this.files, this.form);

    const result = await this.anuncioService.addAnuncio(newAnuncio);
    console.log(result);

    // nombre del archivo
    console.log(this.form.value);
  }

  onFileChange($event) {
    this.files.push($event.target.files);
    console.log(this.files);
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
