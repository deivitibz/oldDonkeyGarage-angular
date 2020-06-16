import { Component, OnInit } from '@angular/core';
import { ConstructorService } from 'src/app/servicios/constructor.service';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.css']
})
export class ConstructorComponent implements OnInit {

  constructor(private constructorService: ConstructorService) {
  }
  async ngOnInit() {
    const respuesta = await this.constructorService.getAllConstructores();
    console.log(respuesta);
    this.getConstructor(1);
  }

  async getConstructor(id) {
    const res = await this.constructorService.getConstructor(id);
    console.log(res);


  }
}
