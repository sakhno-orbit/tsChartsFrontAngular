import {Component, OnInit} from '@angular/core';
import { ChartService } from '../../services/crart.service';
import {DataChartType} from "./charts.js";
import {ChartType} from "chart.js";
import {LineChartService} from "../../services/line-chart.service";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  chartsData: DataChartType[] = [];
  chosenChartType: ChartType
  constructor(
    public chartService: ChartService,
    public lineChartService: LineChartService
  ) {}

  chartTypes: Array<ChartType> = [
    "line",
    "bar",
    "pie",
    "doughnut",
    "polarArea",
    "radar",
    "scatter",
    "bubble",
  ];

  uiActive: boolean = false;
  chartIndex: number = 0;

  ngOnInit() {
    this.chosenChartType = "line"
    this.chartIndex = 0;
    this.getCharts();
  }

  setChartType({value}: any) {
    if (this.chosenChartType == value) return;
    this.chosenChartType = value
  }

  print(): void {
    window.print()
  }

  nextChartIndex(arrLength: number): void {
    this.chartIndex = this.chartIndex + 1 == arrLength ? 0 : this.chartIndex + 1;
    this.lineChartService.setDataset(this.chartsData[this.chartIndex]);
  }
  previousChartIndex(arrLength: number): void {
    this.chartIndex = this.chartIndex == 0 ? arrLength - 1 : this.chartIndex - 1;
    this.lineChartService.setDataset(this.chartsData[this.chartIndex]);
  }


  getCharts(): void {
    this.chartService.getCharts()
      .subscribe((charts:DataChartType[]) => {
        this.chartsData = charts;
        this.uiActive = !!(charts && charts.length);
        this.lineChartService.setDataset(this.chartsData[this.chartIndex])
      })
  }
}
