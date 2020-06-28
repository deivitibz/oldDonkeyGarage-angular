import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Moto } from 'src/app/models/tipo_moto.model';
import { MotocicletasService } from 'src/app/servicios/motocicletas.service';

// imports tablas
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/servicios/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-motocicletas',
  templateUrl: './motocicletas.component.html',
  styleUrls: ['./motocicletas.component.css'],
})
export class MotocicletasComponent implements OnInit {
  allMotos: Moto[];
  oneMoto: Moto;

  motoEdit: any;
  estado: string;

  // formulario
  form: FormGroup;

  //snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // datatables Settings
  displayedColumns: string[] = ['id', 'tipo', 'actions'];
  dataSource: MatTableDataSource<Moto>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private motocicletaService: MotocicletasService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.estado = 'Añadir';
    this.motoEdit = [];
    //Formulario
    this.form = new FormGroup({
      tipo: new FormControl('', []),
    });
  }

  async ngOnInit() {
    this.reloadData();
  }

  materialDataTable() {
    this.dataSource = new MatTableDataSource(this.allMotos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async reloadData() {
    this.allMotos = await this.motocicletaService.getAllMotos();
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

  async deleteMoto(moto) {
    const response = await this.motocicletaService.deleteMoto(moto);
    this.openSnackBar(response['success']);
    this.reloadData();
  }

  async onSubmit() {
    const newMoto = this.form.value;

    if (this.motoEdit.id) {
      const response = await this.motocicletaService.editMoto(
        this.motoEdit.id,
        newMoto
      );

      this.openSnackBar(response['success']);
      this.reloadData();
    } else {
      const response = await this.motocicletaService.newMoto(newMoto);
      this.openSnackBar(response['success']);
      this.reloadData();
    }
  }

  async editMoto(moto) {
    this.motoEdit = await this.motocicletaService.getMoto(moto.id);
    this.estado = 'Editar';
  }
}
