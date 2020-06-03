import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modulo router
import { RouterModule } from '@angular/router';

// modulos formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
