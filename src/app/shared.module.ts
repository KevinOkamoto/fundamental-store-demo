import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule, DialogModule, FdDatetimeModule, LayoutPanelModule, StepInputModule } from '@fundamental-ngx/core';
import {
  FdpFormGroupModule,
  PlatformButtonModule,
  PlatformComboboxModule,
  PlatformDatePickerModule,
  PlatformInputGroupModule,
  PlatformInputModule,
  PlatformRadioGroupModule,
  PlatformSelectModule,
  PlatformTableModule,
  PlatformTextAreaModule
} from '@fundamental-ngx/platform';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PlatformButtonModule,
    PlatformTableModule,
    CarouselModule,
    DialogModule,
    FdDatetimeModule,
    FdpFormGroupModule,
    LayoutPanelModule,
    PlatformButtonModule,
    PlatformComboboxModule,
    PlatformDatePickerModule,
    PlatformInputGroupModule,
    PlatformInputModule,
    PlatformRadioGroupModule,
    PlatformSelectModule,
    PlatformTableModule,
    PlatformTextAreaModule,
    StepInputModule,
  ]
})
export class SharedModule {}
