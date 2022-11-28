import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from "ng2-charts";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartComponent } from './components/chart/chart.component';
import {ChartService} from "./services/crart.service";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    ChartComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    NoopAnimationsModule,
    HttpClientModule,
    BrowserModule,
    NgChartsModule,
    MatButtonToggleModule,
  ],
  providers: [
    ChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
