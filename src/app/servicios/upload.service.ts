import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from 'src/app/servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient,private auth: AuthService) { }

  async addImages(files): Promise<any> {
    this.auth.generateHeaders();
    files[0].userId = this.auth.decodeToken()['userId'];
    let fd = new FormData();
    fd.append('imagen', files[0], files[0].name);
    fd.append('userId',this.auth.decodeToken()['userId'])
    let header = new HttpHeaders();
    header.append('Content-Type', 'multipart/form-data');
    const req = new HttpRequest('POST','http://mypanel.sytes.net:3000/api/upload',fd,
      { headers: header}
    );

    this.http.request(req).toPromise().then(
      (result) => {
        console.log(result);
      });
  }

}
