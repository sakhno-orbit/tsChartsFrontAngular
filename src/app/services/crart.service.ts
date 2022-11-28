import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {delay, Observable } from 'rxjs';

import { DataChartType } from '../components/chart/charts';


@Injectable()
export class ChartService {
  chartsUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {};

  getCharts(): Observable<DataChartType[]> {
    return this.http.get<DataChartType[]>(this.chartsUrl)
      .pipe(
        delay(200)
      )
  }
}
