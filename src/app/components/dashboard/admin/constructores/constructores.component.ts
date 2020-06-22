import { Component, OnInit } from '@angular/core';
import { ConstructorService } from 'src/app/servicios/constructor.service';

@Component({
  selector: 'app-constructores',
  templateUrl: './constructores.component.html',
  styleUrls: ['./constructores.component.css']
})
export class ConstructoresComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor(private constructorService: ConstructorService) { }

  async ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

      const response = await this.constructorService.getAllConstructores();
      if(response['error']) localStorage.removeItem('user-token')

  }

}
