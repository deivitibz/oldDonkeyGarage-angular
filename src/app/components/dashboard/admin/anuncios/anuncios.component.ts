import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
   }

  ngOnInit(): void {

  }

}
