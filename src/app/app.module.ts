import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogService, RtlService, ShellbarModule } from '@fundamental-ngx/core';
import { SharedModule } from './shared.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { FundamentalStoreModule, QueryAdapterFactory } from '@fundamental-ngx/store';

import { storeConfig } from './store/store.config';
import { HttpClientModule } from '@angular/common/http';
import { EntityStoreDataSourceFactoryService } from './utils/data-providers';
import { CustomQueryAdapterFactory } from './store/query-adapter';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    EntityStoreDataSourceFactoryService,
    {
      provide: QueryAdapterFactory,
      useClass: CustomQueryAdapterFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
