<div class="container-fluid p-0">

  <mat-drawer-container class="example-container bg-donkey-secondary " autosize>
    <mat-drawer #drawer class="example-sidenav bg-donkey " mode="side">

      <div class="row ">

        <div class="col-12 mx-auto">
          <img class="img-fluid m-1" width="80%" src="../../../assets/img/logo-404.png" alt="">
        </div>

        <div class="col-12">
          <ul class="nav flex-column">

            <li class="bg-donkey list-group-item my-1">
              <a class="nav-link active text-center" [routerLink]="['usuario', 'perfil']">
                <img class="img-fluid m-1" width="35%" src="../../../assets/img/casco.png" alt="">
                Usuarios
              </a>
            </li>
            <li class="bg-donkey list-group-item my-1">
              <a class="nav-link text-center" [routerLink]="['noticias']">
                <img class="img-fluid m-1" width="35%" src="../../../assets/img/anuncios.png" alt="">
                Anuncios
              </a>
            </li>
            <li class="bg-donkey list-group-item my-1">
              <a class="nav-link text-center" [routerLink]="['noticias']">
                <img class="img-fluid m-1" width="35%" src="../../../assets/img/mensaje.png" alt="">
                Mensajes
              </a>
            </li>
            <li class="bg-donkey list-group-item my-1">
              <a class="nav-link text-center" [routerLink]="['noticias']">
                <img class="img-fluid m-1" width="40%" src="../../../assets/img/moto.png" alt="">
                Constructor
              </a>
            </li>
          </ul>
        </div>

        <div class="col-12">
          <button class="btn btn-block bg-danger" [routerLink]="['/home']" routerLinkActive="router-link-active" ] (click)="logout()">Log Out</button>
        </div>

      </div>

    </mat-drawer>


    <div class="row">
      <div class="col-12">
        <mat-toolbar color="">
          <mat-toolbar-row>
             <mat-icon aria-hidden="false" aria-label="Example home icon" (click)="drawer.toggle()">menu</mat-icon>

          </mat-toolbar-row>
        </mat-toolbar>

      </div>
    </div>

    <div class="row">
      <div class="col-11 mx-auto mt-4">
        <img class="img-fluid" src="../../../assets/img/usuario-dash.jpg" alt="">
      </div>
    </div>

    <div class="row">
      <div class="col-11 mx-auto">
        <router-outlet></router-outlet>
        <mat-card>
          <mat-card-header>
            <mat-card-title>title</mat-card-title>
            <mat-card-subtitle>subtitle</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>

          </mat-card-content>
          <mat-card-actions>
            <button mat-button>Ok</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>

  </mat-drawer-container>



</div>
