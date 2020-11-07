import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginGuard } from 'src/app/login.guard';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../servicios/usuario.service';
import { Anuncio } from './../../../models/anuncio.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  token;
  showFiller = false;

  usuarios: any[] = [];

  @Output() anuncioAdmin: EventEmitter<Anuncio> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private guard: LoginGuard,
    public router: Router,
    private usuarioService: UsuarioService
    ) {
    }

  async ngOnInit() {
    //this.authService.decodeToken();
    //this.guard.canActivate();
    this.token = await this.authService.getToken()
    localStorage.setItem('user-token', this.token);
    this.usuarios = await this.usuarioService.getUsers()
    console.log(this.usuarios);


  }

  logout() {
    localStorage.removeItem('user-token');
  }

  onActivate(elementRef) {
    elementRef.anuncio.subscribe(event => {
      this.anuncioAdmin.emit(event);
    });
  }
}
