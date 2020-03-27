import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './home-layout.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatMenuModule,
    MatDividerModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
