import { Injectable } from '@angular/core';
import { Video_tutorial } from '../models/video_tutorial.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TutorialesService {
  baseUrl: string;

  // allTutoriales: Video_tutorial[];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/tutoriales';
  }

  getTutorial(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllTutorial(): Promise<Video_tutorial[]> {
    return this.httpClient.get<Video_tutorial[]>(this.baseUrl).toPromise();
  }

  deleteTutorial(id) {
    return this.httpClient.delete(this.baseUrl, id).toPromise();
  }

  newTutorial(video_tutorial: Video_tutorial) {
    return this.httpClient.post(this.baseUrl, video_tutorial).toPromise();
  }

  editTutorial(id) {
    const tutorial = this.getTutorial(id);
    return this.httpClient.put(this.baseUrl, tutorial).toPromise();
  }
}
