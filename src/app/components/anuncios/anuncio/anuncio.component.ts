import { Component, Input, OnInit } from '@angular/core';
import { Anuncio } from './../../../models/anuncio.model';
import { Router } from '@angular/router';
import { AnuncioInterface } from './../../../models/anuncio.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { anuncioService } from 'src/app/servicios/anuncio.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  @Input() anuncios: AnuncioInterface[];

  constructor(
    private router: Router,
    private anuncioService: anuncioService
    ) {
    this.anuncios = [];
   }

  ngOnInit(): void {
  }

  async showDetail(anuncio: AnuncioInterface){
    this.router.navigate(['anuncios','detalle',anuncio.id])
  }

}
