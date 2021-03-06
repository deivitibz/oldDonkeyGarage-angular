import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// guard
//import { LoginGuard } from './login.guard'


import { HomeComponent } from './components/home/home.component';
import { anunciosComponent } from './components/anuncios/anuncios.component';
import { BlogComponent } from './components/blog/blog.component';
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

// admin
import { UsuariosComponent } from './components/dashboard/admin/usuarios/usuarios.component';
import { NoticiasComponent } from './components/dashboard/admin/noticias/noticias.component';
import { AnunciosComponent } from './components/dashboard/admin/anuncios/anuncios.component';
import { VideotutorialesComponent } from './components/dashboard/admin/videotutoriales/videotutoriales.component';
import { MotocicletasComponent } from './components/dashboard/admin/motocicletas/motocicletas.component';
import { ConstructoresComponent } from './components/dashboard/admin/constructores/constructores.component';

// dashboard
import { UsuarioDashComponent } from './components/dashboard/usuario/usuario.component';
import { UsuarioDashPerfilComponent } from './components/dashboard/usuario/perfil/perfil.component';
import { ConstructorDashComponent } from './components/dashboard/constructor/constructor.component';
import { ConstructorDashPerfilComponent } from './components/dashboard/constructor/perfil/perfil.component';
import { DetalleComponent } from './components/anuncios/detalle/detalle.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/dashboard/login/login.component';
import { ChatComponent } from './components/dashboard/chat/chat.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  {
    path: 'anuncios', component: anunciosComponent,
    children: [
      {
        path: 'detalle/:anuncioid', component: DetalleComponent
      }
    ]
  },
  { path: 'constructores', component: ConstructorComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'tutoriales', component: TutorialesComponent },
  { path: 'navegacion', component: navegacionComponent },
  { path: 'carousel', component: carouselComponent },
  { path: 'moto', component: MotoComponent },
  { path: 'noticias', component: noticiasComponent },
  {
    /* path: 'dashboard', component: DashboardComponent,canActivate: [LoginGuard], */
    path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'chat', component: ChatComponent}
    ]
  },
  { path: 'registro', component: RegisterComponent },
  { path: 'error404', component: Error404Component },
  { path: 'perfil', component: PerfilComponent },
  /* { path: 'admin', component: AdminComponent, canActivate: [LoginGuard], */
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'noticias', component: NoticiasComponent },
      { path: 'anuncios', component: AnunciosComponent },
      { path: 'videotutoriales', component: VideotutorialesComponent },
      { path: 'constructores', component: ConstructoresComponent },
      { path: 'motocicletas', component: MotocicletasComponent }
    ]
  },
  { path: 'contacto', component: ContactoComponent },
  { path: 'chat', component: ChatComponent },
  { path: '**', redirectTo: '/error404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
