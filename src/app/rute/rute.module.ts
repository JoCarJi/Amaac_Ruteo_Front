import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutePageRoutingModule } from './rute-routing.module';

import { RutePage } from './rute.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutePageRoutingModule
  ],
  declarations: [RutePage]
})
export class RutePageModule {}
