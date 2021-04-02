import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio.model';
import { anuncioService } from 'src/app/servicios/anuncio.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { AnuncioInterface } from './../../../models/anuncio.interface';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  anuncio: AnuncioInterface;
  imagenPath = 'http://mypanel.sytes.net:3000/'
  constructor(
    private activatedRoute: ActivatedRoute,
    private anuncioService: anuncioService) { }

   ngOnInit() {
     this.anuncio = null;
    this.activatedRoute.params.subscribe(async(params)=>{
      this.anuncio = await this.anuncioService.getAnuncioById(params.anuncioid);
      console.log(this.anuncio);

    })

  }




}
