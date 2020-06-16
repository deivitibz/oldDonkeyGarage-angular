import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/servicios/noticia.service';
import { Noticia } from 'src/app/models/noticia.model';


@Component({
  selector: 'app-blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class blogComponent implements OnInit {

  allPosts: Noticia[];

  constructor(private noticiaService: NoticiaService) {
    this.allPosts = [];
  }

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





