import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemporadasComponent } from './temporadas.component';
import { NewComponent } from './new/new.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  { path: 'temporadas', component: TemporadasComponent,
    children: [
      { path: 'new', component: NewComponent, outlet: 'temporada' },
      { path: 'listar', component: ListarComponent, outlet: 'temporada' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemporadasRoutingModule { }
