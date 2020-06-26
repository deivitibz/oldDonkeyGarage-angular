import { Injectable } from '@angular/core';
import { Video_tutorial } from '../models/video_tutorial.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TutorialesService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/tutoriales';
  }

  getTutorial(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllTutorial(): Promise<Video_tutorial[]> {
    const options = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
      }),
    };
    return this.httpClient
      .get<Video_tutorial[]>(this.baseUrl, options)
      .toPromise();
  }

  deleteTutorial(tutorial) {
    return this.httpClient.delete(this.baseUrl + '/' + tutorial.id).toPromise();
  }

  newTutorial(video_tutorial: Video_tutorial) {
    return this.httpClient.post(this.baseUrl, video_tutorial).toPromise();
  }

  editTutorial(id, newTutorial) {
    return this.httpClient
      .put(this.baseUrl + '/' + id, newTutorial)
      .toPromise();
  }
}
