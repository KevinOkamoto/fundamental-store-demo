import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'checkout',
  loadChildren: () => import('./pages/checkout-page/checkout-page.module').then(m => m.CheckoutPageModule)
}, {
  path: '',
  loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule)
}, {
  path: '',
  redirectTo: '',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
