import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogService, RtlService, ShellbarModule } from '@fundamental-ngx/core';
import { SharedModule } from './shared.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { FundamentalStoreModule } from '@fundamental-ngx/store';

import { storeConfig } from './store/store.config';
import { HttpClientModule } from '@angular/common/http';
import { EntityStoreDataSourceFactoryService } from './utils/data-providers';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FundamentalStoreModule.forRoot(storeConfig),
    SharedModule,
    ShellbarModule
  ],
  providers: [
    RtlService,
    DialogService,
    EntityStoreDataSourceFactoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
