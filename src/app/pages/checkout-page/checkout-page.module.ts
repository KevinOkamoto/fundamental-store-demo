import { NgModule } from '@angular/core';
import { CheckoutPageComponent } from './checkout-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: CheckoutPageComponent
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CheckoutPageModule { }
