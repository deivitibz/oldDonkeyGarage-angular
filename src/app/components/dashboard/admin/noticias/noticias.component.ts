import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiaService } from 'src/app/servicios/noticia.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Noticia } from 'src/app/models/noticia.model';


@Component({
  selector: 'app-admin-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  allNoticias: Noticia[];
  oneNoticia: Noticia;
 //formulario
  form: FormGroup;

  //datatables settings
  displayedColumns: string[] = ['id','titulo','descripcion','autor','categoria','imagen','estado','fecha_publicacion']

  dtOptions: DataTables.Settings = {};



  constructor(private noticiasService: NoticiaService) {

    // inicializacion de variables
    this.allNoticias = [];
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
    console.log(this.allNoticias);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      data: this.allNoticias,
      columns: [
        { data: 'id' },
        { data: 'titulo' },
        { data: 'descripcion' },
        { data: 'autor' },
        { data: 'categoria' },
        { data: 'estado' },
        { data: 'fecha_publicacion' }
    ]
    };

  }

  onFileChange($event){

  }
  async deleteNoticia(element){
    const response = await this.noticiasService.deleteNoticia(element.id)
    console.log(response);


  }

  async onSubmit(){
    const newNoticia = this.form.value;
    newNoticia.usuarios_id = "10";
    console.log(newNoticia);

    const response = await this.noticiasService.newNoticia(newNoticia);
    console.log(response);


  }

  async editNoticia(noticia){
    console.log(noticia);

    //const noticia = await this.noticiasService.editNoticia(noticia.id)
    //this.oneNoticia = new Noticia(1,'','','',[],'',true,'',1)
    //console.log(response);
    //console.log(this.oneNoticia);



  }



}
