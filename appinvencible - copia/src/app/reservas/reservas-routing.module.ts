import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservasComponent } from './reservas.component';
import { NewComponent } from './new/new.component';
import { ListarComponent } from './listar/listar.component';


const routes: Routes = [
  {
    path: 'reservas',
    component: ReservasComponent, 
    children: [
      { path:  'new', component: NewComponent, outlet: 'second' },
      { path:  'listar', component: ListarComponent, outlet: 'second' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
