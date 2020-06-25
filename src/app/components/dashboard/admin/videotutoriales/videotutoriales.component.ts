import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Video_tutorial } from 'src/app/models/video_tutorial.model';
import { TutorialesService } from 'src/app/servicios/tutoriales.service';

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
  selector: 'app-videotutoriales',
  templateUrl: './videotutoriales.component.html',
  styleUrls: ['./videotutoriales.component.css'],
})
export class VideotutorialesComponent implements OnInit {
  allTutoriales: Video_tutorial[];
  oneTutorial: Video_tutorial;

  tutorialEdit: any;
  estado: string;

  //Formulario
  form: FormGroup;

  //panel
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
  dataSource: MatTableDataSource<Video_tutorial>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private tutorialesService: TutorialesService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.estado = 'Añadir';
    this.tutorialEdit = [];

    // Formulario
    this.form = new FormGroup({
      titulo: new FormControl('', []),
      descripcion: new FormControl('', []),
      autor: new FormControl('', []),
      categoria: new FormControl('', []),
      url_video: new FormControl('', []),
      fecha_publicacion: new FormControl('', []),
      usuarios_id: new FormControl('', []),
    });
  }

  async ngOnInit() {
    this.reloadData();
  }

  materialDataTable() {
    this.dataSource = new MatTableDataSource(this.allTutoriales);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async reloadData() {
    this.allTutoriales = await this.tutorialesService.getAllTutorial();
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

  async deleteTutorial(tutorial) {
    const response = await this.tutorialesService.deleteTutorial(tutorial);
    this.openSnackBar(response['success']);
    this.reloadData();
  }

  async onSubmit() {
    const newTutorial = this.form.value;
    newTutorial.usuarios_id = this.authService.decodeToken()['userId'];

    if (this.tutorialEdit.id) {
      const response = await this.tutorialesService.editTutorial(
        this.tutorialEdit.id,
        newTutorial
      );
      this.reloadData();
      this.openSnackBar(response['success']);
    } else {
      const response = await this.tutorialesService.newTutorial(newTutorial);
      this.reloadData();
      this.openSnackBar(response['success']);
    }
  }

  async editTutorial(tutorial) {
    this.togglePanel();
    this.tutorialEdit = await this.tutorialesService.getTutorial(tutorial.id);
    // console.log(this.tutorialEdit);
    this.estado = 'Editar';
  }
}
