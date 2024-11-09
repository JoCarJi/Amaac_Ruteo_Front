import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutePage } from './rute.page';

const routes: Routes = [
  {
    path: '',
    component: RutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutePageRoutingModule {}
