import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '', redirectTo: 'rute', pathMatch: 'full' },
  { path: 'rute', loadChildren: () => import('./rute/rute.module').then(m => m.RutePageModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'alert', loadChildren: () => import('./alert/alert.module').then(m => m.AlertPageModule) },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'tab-inicial',
    loadChildren: () => import('./tab-inicial/tab-inicial.module').then( m => m.TabInicialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
