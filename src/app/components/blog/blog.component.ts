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

  ngOnInit() {
    this.noticiaService.getNoticia;
    this.noticiaService.getAllNoticias();
    console.log(this.noticiaService.getNoticia(4));
  }

};