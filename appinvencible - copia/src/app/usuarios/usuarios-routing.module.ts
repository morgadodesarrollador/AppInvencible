import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '', component: UsuariosComponent
  },
  {
    path: 'update', component: UpdateComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
