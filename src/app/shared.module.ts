import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PlatformButtonModule,
  PlatformTableModule
} from '@fundamental-ngx/platform';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    PlatformButtonModule,
    PlatformTableModule
  ]
})
export class SharedModule {}
