import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiaService } from 'src/app/servicios/noticia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Noticia } from 'src/app/models/noticia.model';

// imports de tablas
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
  selector: 'app-admin-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {
  allNoticias: Noticia[];
  oneNoticia: Noticia;

  noticiaEdit: any;
  estado: string;

  //formulario
  form: FormGroup;

  // panel
  panelOpenState = false;

  //snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //datatables settings
  displayedColumns: string[] = [
    'id',
    'titulo',
    'descripcion',
    'autor',
    'actions',
  ];
  dataSource: MatTableDataSource<Noticia>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private noticiasService: NoticiaService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.estado = 'Añadir';
    this.noticiaEdit = [];

    // formulario
    this.form = new FormGroup({
      titulo: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
      descripcion: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(1000),
          Validators.minLength(10),
        ])
      ),
      autor: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      categoria: new FormControl('', []),
      imagen: new FormControl('', []),
      estado: new FormControl('', []),
      fecha_publicacion: new FormControl('', []),
      usuarios_id: new FormControl('', []),
    });
  }

  async ngOnInit() {
    this.reloadData();
  }

  materialDataTable() {
    this.dataSource = new MatTableDataSource(this.allNoticias);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async reloadData() {
    this.allNoticias = await this.noticiasService.getAllNoticias();
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
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }
  onFileChange($event) {}

  async deleteNoticia(noticia) {
    const response = await this.noticiasService.deleteNoticia(noticia);
    this.openSnackBar(response['succes']);
    this.reloadData();
  }

  async onSubmit() {
    const newNoticia = this.form.value;
    newNoticia.usuarios_id = this.authService.decodeToken()['userId'];

    if (this.noticiaEdit.id) {
      const response = await this.noticiasService.editNoticia(
        this.noticiaEdit,
        newNoticia
      );

      this.openSnackBar(response['success']);
      this.reloadData();
    } else {
      const response = await this.noticiasService.newNoticia(newNoticia);
      this.openSnackBar(response['success']);
      this.reloadData();
    }
  }

  async editNoticia(noticia) {
    this.togglePanel();
    this.noticiaEdit = await this.noticiasService.getNoticia(noticia.id);
    console.log(noticia.id);

    // this.estado = 'Editar';
  }
}
