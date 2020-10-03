import { Component, Input, OnInit } from '@angular/core';
import { Anuncio } from './../../../models/anuncio.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  @Input() anuncios: Anuncio[];

  constructor(private router: Router) {
    this.anuncios = [];
   }

  ngOnInit(): void {
    console.log('desde anuncios');
    console.log(this.anuncios);

  }

  showDetail(anuncio){
    console.log(anuncio.id);

    this.router.navigate(['anuncios','detalle',anuncio.id])
  }

}
