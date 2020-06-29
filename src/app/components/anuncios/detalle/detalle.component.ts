import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio.model';
import { anuncioService } from 'src/app/servicios/anuncio.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  detalleAnuncio: any;
  imagenPath = 'http://streaming.zapto.org:3000/'
  constructor(
    private activatedRoute: ActivatedRoute, 
    private anuncioService: anuncioService) { }

   ngOnInit() {
      this.activatedRoute.params.subscribe(async(params)=>{
      this.detalleAnuncio = await this.anuncioService.getAnuncio(params.anuncioid);
      console.log(this.detalleAnuncio);
      
    })
    
  }




}
