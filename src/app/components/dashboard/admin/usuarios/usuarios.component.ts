import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

export interface Usuario {
  id: number,
  username: string,
  email: string;
}



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {

  allUsers: Usuario[];
  displayedColumns: string[] = ['id','username','email']
  dataSource = this.allUsers

  constructor(private usuarioService: UsuarioService) {
    this.allUsers = []
  }

  async ngOnInit() {
    try{
      const response = await this.usuarioService.getUsers();
      console.log(response);
      this.allUsers = response;
    } catch (err) {
      console.log(err);

    }

  }

}
