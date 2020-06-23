import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class navegacionComponent implements OnInit {

  token: string;


  constructor(private router: Router, public usuarioService: UsuarioService) {

    this.token = localStorage.getItem('user-token');


  }

  ngOnInit(): void {
  }

  logout(){
    if (this.token) {
      localStorage.removeItem('user-token');
      this.router.navigate(['/home'])
    }

  }

}
