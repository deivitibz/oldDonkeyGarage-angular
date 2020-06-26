import { Injectable } from '@angular/core';
import { Video_tutorial } from '../models/video_tutorial.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TutorialesService {
  baseUrl: string;

  constructor(private httpClient: HttpClient, private Auth: AuthService) {
    this.baseUrl = 'http://localhost:3000/api/tutoriales';
  }

  getTutorial(id) {
    return this.httpClient.get(this.baseUrl + '/' + id).toPromise();
  }

  getAllTutorial(): Promise<Video_tutorial[]> {
    return this.httpClient.get<Video_tutorial[]>(this.baseUrl).toPromise();
  }

  deleteTutorial(tutorial) {
    const options = this.Auth.generateHeaders();
    return this.httpClient
      .delete(this.baseUrl + '/' + tutorial.id, options)
      .toPromise();
  }

  newTutorial(video_tutorial: Video_tutorial) {
    const options = this.Auth.generateHeaders();
    return this.httpClient
      .post(this.baseUrl, video_tutorial, options)
      .toPromise();
  }

  editTutorial(id, newTutorial) {
    const options = this.Auth.generateHeaders();
    return this.httpClient
      .put(this.baseUrl + '/' + id, newTutorial, options)
      .toPromise();
  }
}
