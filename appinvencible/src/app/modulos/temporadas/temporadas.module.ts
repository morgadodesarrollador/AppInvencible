import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TemporadasRoutingModule } from './temporadas-routing.module';
import { TemporadasComponent } from './temporadas.component';
import { NewComponent } from './new/new.component';
import { ListarComponent } from './listar/listar.component';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [TemporadasComponent, NewComponent, ListarComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule.forRoot(),
    TemporadasRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class TemporadasModule { }
