import { Component, OnInit, Input } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {

  }

  category($event){
    console.log($event);

  }

}
