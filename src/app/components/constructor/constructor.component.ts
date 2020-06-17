import { Component, OnInit } from '@angular/core';
import { ConstructorService } from '../../servicios/constructor.service';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.css']
})
export class ConstructorComponent implements OnInit {

  constructor(private constructorService: ConstructorService) { }

  async ngOnInit() {

    const response = await this.constructorService.getAllConstructores();
    console.log(response);
    this.getConstructor(1)
  }

  async getConstructor(id) {
    const resp = await this.constructorService.getConstructor(id)
    console.log(resp);
  }
}
