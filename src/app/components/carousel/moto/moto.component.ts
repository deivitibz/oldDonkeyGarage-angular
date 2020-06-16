import { Component, OnInit } from '@angular/core';
import { MotocicletasService } from 'src/app/servicios/motocicletas.service';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.css']
})
export class MotoComponent implements OnInit {

  constructor(private motoService: MotocicletasService) { }

  async ngOnInit() {
    const response = await this.motoService.getAllMotos();
    console.log(response);

  }

}
