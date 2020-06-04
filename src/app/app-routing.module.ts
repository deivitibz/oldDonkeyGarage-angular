import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { anunciosComponent } from './components/anuncios/anuncios.component';
import { blogComponent } from './components/blog/blog.component';
import { TutorialesComponent } from './components/blog/tutoriales/tutoriales.component';
import { navegacionComponent } from './components/home/navegacion/navegacion.component';
import { carouselComponent } from './components/carousel/carousel.component';
import { MotoComponent } from './components/carousel/moto/moto.component';
import { noticiasComponent } from './components/noticias/noticias.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: '/home' },
{ path: 'home', component: HomeComponent },
{ path: 'anuncios', component: anunciosComponent },
{ path: 'blog', component: blogComponent },
{ path: 'tutoriales', component: TutorialesComponent },
{ path: 'navegacion', component: navegacionComponent },
{ path: 'carousel', component: carouselComponent },
{ path: 'moto', component: MotoComponent },
{ path: 'noticias', component: noticiasComponent },
{ path: 'dashboard', component: DashboardComponent },

{ path: '**', redirectTo: '/home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
