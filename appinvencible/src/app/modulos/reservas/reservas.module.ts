import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasComponent } from './reservas.component';
import { NewComponent } from './new/new.component';
import { ListarComponent } from './listar/listar.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ReservasComponent, NewComponent, ListarComponent],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    FormsModule,
    PipesModule,
    IonicModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class ReservasModule { }
