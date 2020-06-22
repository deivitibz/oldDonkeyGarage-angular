import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class navegacionComponent implements OnInit {

  token: string;

  constructor() {
    this.token = localStorage.getItem('user-token')
  }

  ngOnInit(): void {
  }


}
