import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SsoRoutingModule } from './sso-routing.module';
import { SsoComponent } from './sso.component';


@NgModule({
  declarations: [SsoComponent],
  imports: [
    CommonModule,
    SsoRoutingModule
  ]
})
export class SsoModule { }
