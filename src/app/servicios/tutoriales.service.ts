import { Injectable } from '@angular/core';
import { Video_tutorial } from '../models/video_tutorial.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TutorialesService {
  baseUrl: string;

  allTutoriales: any[];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://streaming.zapto.org:3000/api/tutoriales';
  }

  getTutorial(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllTutorial() {
    return this.httpClient.get(this.baseUrl).toPromise();
  }

  newTutorial(video_tutorial: Video_tutorial) {
    return this.httpClient.post(this.baseUrl, Video_tutorial).toPromise();
  }

  editTutorial(id) {
    const tutorial = this.getTutorial(id);
    return this.httpClient.put(this.baseUrl, Video_tutorial).toPromise();
  }
}
