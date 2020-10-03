import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modulos material
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
// modulo slick carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';

//datatables
import { DataTablesModule } from 'angular-datatables';

// modulo router
import { RouterModule } from '@angular/router';

// modulos formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modulo http
import { HttpClientModule } from '@angular/common/http';

// componentes
import { HomeComponent } from './components/home/home.component';
import { navegacionComponent } from './components/home/navegacion/navegacion.component';
import { anunciosComponent } from './components/anuncios/anuncios.component';
import { noticiasComponent } from './components/noticias/noticias.component';
import { carouselComponent } from './components/carousel/carousel.component';
import { MotoComponent } from './components/carousel/moto/moto.component';
import { NoticiaComponent } from './components/carousel/noticia/noticia.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/dashboard/login/login.component';
import { RegisterComponent } from './components/dashboard/register/register.component';
import { blogComponent } from './components/blog/blog.component';
import { TutorialesComponent } from './components/tutoriales/tutoriales.component';
import { ChatComponent } from './components/dashboard/chat/chat.component';
import { Error404Component } from './components/error404/error404.component';
import { PerfilComponent } from './components/dashboard/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConstructorComponent } from './components/constructor/constructor.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { UsuariosComponent } from './components/dashboard/admin/usuarios/usuarios.component';
import { NoticiasComponent } from './components/dashboard/admin/noticias/noticias.component';
import { AnunciosComponent } from './components/dashboard/admin/anuncios/anuncios.component';
import { VideotutorialesComponent } from './components/dashboard/admin/videotutoriales/videotutoriales.component';
import { MotocicletasComponent } from './components/dashboard/admin/motocicletas/motocicletas.component';
import { ConstructoresComponent } from './components/dashboard/admin/constructores/constructores.component';

import { UsuarioDashComponent } from './components/dashboard/usuario/usuario.component';
import { ConstructorDashComponent } from './components/dashboard/constructor/constructor.component';
import { UsuarioDashPerfilComponent } from './components/dashboard/usuario/perfil/perfil.component';
import { ConstructorDashPerfilComponent } from './components/dashboard/constructor/perfil/perfil.component';
import { DetalleComponent } from './components/anuncios/detalle/detalle.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { ParallaxComponent } from './components/home/parallax/parallax.component';
import { AnuncioComponent } from './components/anuncios/anuncio/anuncio.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    navegacionComponent,
    anunciosComponent,
    noticiasComponent,
    carouselComponent,
    MotoComponent,
    NoticiaComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    blogComponent,
    TutorialesComponent,
    ChatComponent,
    Error404Component,
    PerfilComponent,
    ConstructorComponent,
    AdminComponent,
    NosotrosComponent,
    UsuariosComponent,
    NoticiasComponent,
    AnunciosComponent,
    VideotutorialesComponent,
    MotocicletasComponent,
    ConstructoresComponent,
    UsuarioDashComponent,
    ConstructorDashComponent,
    UsuarioDashPerfilComponent,
    ConstructorDashPerfilComponent,
    DetalleComponent,
    FooterComponent,
    ParallaxComponent,
    AnuncioComponent,
    ContactoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    SlickCarouselModule,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    SlickCarouselModule,
    DataTablesModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatBadgeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAVRXlCViVXiK0QGqb9t22-o9Cs3xu9ULo'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
