import { Component, OnInit } from '@angular/core';
import { TutorialesService } from 'src/app/servicios/tutoriales.service';
import { Video_tutorial } from '../../models/video_tutorial.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.component.html',
  styleUrls: ['./tutoriales.component.css'],
})
export class TutorialesComponent implements OnInit {
  allTutoriales: Video_tutorial[];

  constructor(private tutorialesService: TutorialesService,private _sanitizer: DomSanitizer) {
    
  }

  async ngOnInit() {
    const response = await this.tutorialesService.getAllTutorial();
    this.allTutoriales = response;
    console.log(this.allTutoriales);
  }

  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}

}
