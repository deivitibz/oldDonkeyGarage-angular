import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { anunciosComponent } from './components/anuncios/anuncios.component';
import { blogComponent } from './components/blog/blog.component';
import { TutorialesComponent } from './components/tutoriales/tutoriales.component';
import { navegacionComponent } from './components/home/navegacion/navegacion.component';
import { carouselComponent } from './components/carousel/carousel.component';
import { MotoComponent } from './components/carousel/moto/moto.component';
import { noticiasComponent } from './components/noticias/noticias.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Error404Component } from './components/error404/error404.component';
import { RegisterComponent } from './components/dashboard/register/register.component';
import { PerfilComponent } from './components/dashboard/perfil/perfil.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ConstructorComponent } from './components/constructor/constructor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'anuncios', component: anunciosComponent },
  { path: 'constructores', component: ConstructorComponent },
  { path: 'blog', component: blogComponent },
  { path: 'tutoriales', component: TutorialesComponent },
  { path: 'navegacion', component: navegacionComponent },
  { path: 'carousel', component: carouselComponent },
  { path: 'moto', component: MotoComponent },
  { path: 'noticias', component: noticiasComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'error404', component: Error404Component },
  { path: 'perfil', component: PerfilComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '/error404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
