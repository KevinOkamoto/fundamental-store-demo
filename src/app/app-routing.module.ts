import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [{
  path: '',
  component: MainPageComponent
}, {
  path: 'checkout/:id',
  component: CheckoutPageComponent
}, {
  path: '',
  redirectTo: '',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
