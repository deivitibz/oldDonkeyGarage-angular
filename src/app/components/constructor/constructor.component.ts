import { Component, OnInit } from '@angular/core';
import { ConstructorService } from 'src/app/servicios/constructor.service';

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

  }
}
