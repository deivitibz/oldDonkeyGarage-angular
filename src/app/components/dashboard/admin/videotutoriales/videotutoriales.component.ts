import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Video_tutorial } from 'src/app/models/video_tutorial.model';
import { TutorialesService } from 'src/app/servicios/tutoriales.service';

// imports de tablas
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-videotutoriales',
  templateUrl: './videotutoriales.component.html',
  styleUrls: ['./videotutoriales.component.css'],
})
export class VideotutorialesComponent implements OnInit {
  allTutoriales: Video_tutorial[];
  oneTutorial: Video_tutorial;

  //Formulario
  form: FormGroup;

  //datatables settings
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'autor'];
  dataSource: MatTableDataSource<Video_tutorial>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private tutorialesService: TutorialesService,
    private authService: AuthService
  ) {
    // Formulario
    this.form = new FormGroup({
      titulo: new FormControl('', []),
      descripcion: new FormControl('', []),
      autor: new FormControl('', []),
      categoria: new FormControl('', []),
      url_video: new FormControl('', []),
      premium: new FormControl('', []),
      fecha_publicacion: new FormControl('', []),
      usuarios_id: new FormControl('', []),
    });
  }

  async ngOnInit() {
    this.allTutoriales = await this.tutorialesService.getAllTutorial();
    this.dataSource = new MatTableDataSource(this.allTutoriales);
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

  async onSubmit() {
    const newTutorial = this.form.value;
    console.log(newTutorial);

    newTutorial.usuarios_id = this.authService.decodeToken()['userId'];

    const response = await this.tutorialesService.newTutorial(newTutorial);

    // console.log(response);

    // console.log(this.form.value);
  }
}
