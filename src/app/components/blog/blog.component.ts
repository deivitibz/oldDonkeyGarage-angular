import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/servicios/noticia.service';
import { Noticia } from 'src/app/models/noticia.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class blogComponent implements OnInit {
  formulario: FormGroup;

  constructor(private noticiaService: NoticiaService) {
    this.formulario = new FormGroup({
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

  onSubmit() {}

  onFileChange() {}

  async ngOnInit() {
    const respuesta = await this.noticiaService.getAllNoticias();
    console.log(respuesta);
    this.getNoticia(1);
  }

  async getNoticia(id) {
    const response = await this.noticiaService.getNoticia(id);
    console.log(response);
  }
}
