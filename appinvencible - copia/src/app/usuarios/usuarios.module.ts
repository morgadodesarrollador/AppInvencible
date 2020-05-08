import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateComponent } from './update/update.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [UsuariosComponent, UpdateComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    PipesModule,
    IonicModule.forRoot(),
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UsuariosModule { }
