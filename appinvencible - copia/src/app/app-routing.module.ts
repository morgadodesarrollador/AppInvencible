import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./reservas/reservas.module').then( m => m.ReservasModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosModule)
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
