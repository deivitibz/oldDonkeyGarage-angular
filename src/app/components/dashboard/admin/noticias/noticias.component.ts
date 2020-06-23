import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiaService } from 'src/app/servicios/noticia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Noticia } from 'src/app/models/noticia.model';

// imports de tablas
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-admin-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent implements OnInit {
  allNoticias: Noticia[];
  oneNoticia: Noticia;

  //formulario
  form: FormGroup;

  //datatables settings
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'autor'];
  dataSource: MatTableDataSource<Noticia>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private noticiasService: NoticiaService,
    private authService: AuthService
  ) {
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
    this.allNoticias = await this.noticiasService.getAllNoticias();
    this.dataSource = new MatTableDataSource(this.allNoticias);
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

  onFileChange($event) {}
  async deleteNoticia(element) {
    const response = await this.noticiasService.deleteNoticia(element.id);
    console.log(response);
  }

  async onSubmit() {
    const newNoticia = this.form.value;
    const loginId = this.authService.decodeToken();

    newNoticia.usuarios_id = loginId.userId;

    const response = await this.noticiasService.newNoticia(newNoticia);
    console.log(response);
  }

  async editNoticia(noticia) {
    console.log(noticia);

    //const noticia = await this.noticiasService.editNoticia(noticia.id)
    //this.oneNoticia = new Noticia(1,'','','',[],'',true,'',1)
    //console.log(response);
    //console.log(this.oneNoticia);
  }
}
