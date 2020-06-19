import { Component, OnInit } from '@angular/core';
import { ConstructorService } from '../../servicios/constructor.service';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.css']
})
export class ConstructorComponent implements OnInit {

  allConstructor: any[];
  constructor(private constructorService: ConstructorService) {
    this.allConstructor = [];
  }

  async ngOnInit() {

    const response = await this.constructorService.getAllConstructores();
    this.allConstructor.push(response);

  }

  async getConstructor(id) {
    const resp = await this.constructorService.getConstructor(id)
    console.log(resp);
  }
}
