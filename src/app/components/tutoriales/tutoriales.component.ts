import { Component, OnInit } from '@angular/core';
import { TutorialesService } from 'src/app/servicios/tutoriales.service';

@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.component.html',
  styleUrls: ['./tutoriales.component.css'],
})
export class TutorialesComponent implements OnInit {
  allTutoriales: any[];

  constructor(private tutorialesService: TutorialesService) {
    this.allTutoriales = [];
  }

  async ngOnInit() {
    const response = await this.tutorialesService.getAllTutorial();
    this.allTutoriales.push(response);
  }
}
