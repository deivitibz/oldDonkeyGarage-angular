import { Component, OnInit } from '@angular/core';
import { UsuarioPerfil } from './../../../../models/usuario_perfil.model';
import { AuthService } from './../../../../servicios/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Pslect from 'pselect.js';
import { UploadService } from './../../../../servicios/upload.service';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dash-usuario-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss', './perfil.component.css']
})
export class UsuarioDashPerfilComponent implements OnInit {
  panelOpenState = false;
  provincias: string[];
  provinciasOrder: any[];
  poblaciones: string[];
  filtroProvincias: any[];
  usuarioActivo: UsuarioPerfil;
  form: FormGroup;
  datosUsuario: UsuarioPerfil;
  files;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private auth: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private uploadService: UploadService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.datosUsuario = null;
    this.provincias = new Pslect().constructor.provincesData;
    this.poblaciones = new Pslect().constructor.municipesData;
    this.provinciasOrder = [];


    for (let provincia of this.provincias) {
      const provinciaObj: Object = {
        provincia: provincia['nm'],
        id: provincia['id'],
      };
      this.provinciasOrder.push(provinciaObj);
      //this.provinciasOrder.push({ 'provincia': provincia['nm'].toString(), 'id': parseInt(provincia['id']) })
    }
    this.provinciasOrder.sort((a, b) => {
      return this.compareStrings(a['provincia'], b['provincia']);
    });
    this.initializeForm()
  }

  async ngOnInit() {
    this.loadData();
    /* if (this.usuarioActivo.rol === 'admin'){
      this.router.navigate(['admin'])
    } else {
      this.datosUsuario = await this.usuarioService.getUserById(this.usuarioActivo['userId'])
      console.log(this.datosUsuario);

    } */


  }

  async loadData(){
    this.usuarioActivo = this.auth.decodeToken();
    this.datosUsuario = await this.usuarioService.getUserById(this.usuarioActivo['userId'])
    this.initializeForm();
  }


  async onSubmit() {
    console.log(this.form.value);

    const response = await this.usuarioService.editPerfil(this.usuarioActivo['userId'],this.form.value);
    console.log(response);
    this.loadData();
    this.openSnackBar(response['success'])

    //const response = await this.uploadService.addImages(this.files)


  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  initializeForm(){
    this.form = new FormGroup({
      username: new FormControl(
        this.datosUsuario['username'],
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      apellidos: new FormControl(
        this.datosUsuario['apellidos'],
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      email: new FormControl(
        this.datosUsuario['email'],
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
        ])
      ),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
      nombre: new FormControl(this.datosUsuario['nombre'], []),
      direccion: new FormControl(this.datosUsuario['direccion'], [Validators.required]),
      provincia: new FormControl(this.datosUsuario['provincia'], [Validators.required]),
      localidad: new FormControl(this.datosUsuario['localidad'], [Validators.required]),
      nombre_constructor: new FormControl(
        this.datosUsuario['nombre_constructor'],
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      descripcion: new FormControl(
        this.datosUsuario['descripcion'],
        Validators.compose([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(150),
        ])
      ),
      persona_contacto: new FormControl(
        this.datosUsuario['persona_contacto'],
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z_][a-z0-9_-]{3,15}$/),
        ])
      ),
      telefono: new FormControl(
        this.datosUsuario['telefono'],
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /(\+34|0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})/
          ),
        ]),
      ),
      imagenes_usuario: new FormControl('', []),
      imagenes_constructor: new FormControl('', []),
    });
  }

  uploadImage(){
    const file = new FormData;
    file.append("imagen",this.files[0],this.files[0].name);
    let header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type','multipart/form-data');
    let req = new HttpRequest("POST","http://mypanel.sytes.net:3000/api/upload",file, { headers: header });
    this.http.request(req).toPromise()
      .then((result) => {
        console.log(result);
      });
  }

  onFileChange($event) {
    this.files = $event.target.files;
    console.log(this.files);
  }

  getProvincias($event) {
    this.filtroProvincias = [];
    this.poblaciones.filter((result) => {
      let idProvincia =
        $event.target.options[$event.target.options['selectedIndex']].dataset.id;
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
