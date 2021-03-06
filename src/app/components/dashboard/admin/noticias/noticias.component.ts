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
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  allNoticias: Noticia[];
  oneNoticia: Noticia;

  noticiaEdit: Noticia;
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
    // 'descripcion',
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
    this.noticiaEdit = null;

    // formulario
  }

  async ngOnInit() {
    this.reloadData();
    this.initializeForm();
  }

  initializeForm(){
    this.form = new FormGroup({
      titulo: new FormControl(
        this.noticiaEdit.titulo,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
      descripcion: new FormControl(
        this.noticiaEdit.descripcion,
        Validators.compose([Validators.required,Validators.maxLength(1000),Validators.minLength(10),])
      ),
      autor: new FormControl(
        this.noticiaEdit.autor,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      categoria: new FormControl(this.noticiaEdit.categoria, []),
      imagen: new FormControl(this.noticiaEdit.imagen, []),
      estado: new FormControl(this.noticiaEdit.estado, []),
      fecha_publicacion: new FormControl(this.noticiaEdit.fecha_publicacion, []),
      usuarios_id: new FormControl('', []),
    });
  }

  materialDataTable() {
    this.dataSource = new MatTableDataSource(this.allNoticias);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async reloadData() {
    let response = await this.noticiasService.getAllNoticias();
    this.allNoticias = response;
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
  onFileChange($event) {}

  async deleteNoticia(noticia) {
    const response = await this.noticiasService.deleteNoticia(noticia);
    this.openSnackBar(response['success']);
    this.reloadData();
  }

  async onSubmit() {
    const newNoticia = this.form.value;
    newNoticia.usuarios_id = this.authService.decodeToken()['userId'];

    if (this.noticiaEdit.id) {
      const response = await this.noticiasService.editNoticia(this.noticiaEdit.id,newNoticia);
      this.reloadData();
      this.form.reset();
      this.noticiaEdit = null;
      this.togglePanel();
      this.openSnackBar(response['success']);
    } else {
      const response = await this.noticiasService.newNoticia(newNoticia);
      this.reloadData();
      this.form.reset();
      this.openSnackBar(response['success']);
    }
  }

  async editNoticia(noticia) {
    this.togglePanel();
    this.noticiaEdit = await this.noticiasService.getNoticia(noticia.id);
    this.initializeForm();
  }
}
