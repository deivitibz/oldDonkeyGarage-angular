import { Component, OnInit } from '@angular/core';
import { ConstructorService } from 'src/app/servicios/constructor.service';

@Component({
  selector: 'app-constructores',
  templateUrl: './constructores.component.html',
  styleUrls: ['./constructores.component.css']
})
export class ConstructoresComponent implements OnInit {

  constructor(private constructorService: ConstructorService) { }

  async ngOnInit() {

      const response = await this.constructorService.getAllConstructores();
      console.log(response);

  }

}
