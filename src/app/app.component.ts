import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ruta: string;

  constructor(public router: Router){

    this.ruta = 'usuarios';

  }

}
