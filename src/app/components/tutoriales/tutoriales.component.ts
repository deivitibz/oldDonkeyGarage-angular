import { Component, OnInit } from '@angular/core';
import { TutorialesService } from 'src/app/servicios/tutoriales.service';
import { Video_tutorial } from '../../models/video_tutorial.model';

@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.component.html',
  styleUrls: ['./tutoriales.component.css'],
})
export class TutorialesComponent implements OnInit {
  allTutoriales: Video_tutorial[];

  constructor(private tutorialesService: TutorialesService) {
    this.allTutoriales = [];
  }

  async ngOnInit() {
    const response = await this.tutorialesService.getAllTutorial();
    this.allTutoriales = response;
    console.log(response);
  }
}
