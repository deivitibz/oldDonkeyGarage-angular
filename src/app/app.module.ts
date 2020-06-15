import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modulos material
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


// modulo slick carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';
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
import { TutorialesComponent } from './components/blog/tutoriales/tutoriales.component';
import { ChatComponent } from './components/dashboard/chat/chat.component';
import { Error404Component } from './components/error404/error404.component';
import { PerfilComponent } from './components/dashboard/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConstructorComponent } from './components/dashboard/perfil/constructor/constructor.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';

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
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
