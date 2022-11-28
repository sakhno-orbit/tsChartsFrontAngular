import {ChartTypeRegistry, ChartDataset, ChartConfiguration} from 'chart.js';
import {Component, Input, OnInit} from '@angular/core';
import {DataChartType} from "../chart/charts";
import {LineChartService} from "../../services/line-chart.service";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() chartType: keyof ChartTypeRegistry = "line";

  constructor(private lineChartService: LineChartService) {}

  chartHeader: string;
  chartLabels: string[];
  chartData: ChartDataset[] = this.updateData();
  chartPage: number;


  defaultChartProps = this.getDefaultChartProps()

  getDefaultChartProps(): object {
    if (this.chartType == "line") return {
      pointHitRadius: 15,
      pointHoverRadius: 8,
      pointRadius: 2,
      borderWidth: 2,
      hoverBorderWidth: 0,
      pointBorderWidth: 0,
      tension: 0.3,
    }
    return {}
  }


  chartOptions: ChartConfiguration['options'];

  getChartOptions(): ChartConfiguration['options'] {
    let chartOptions: object = {};
    switch (this.chartType) {
      case "line":
        chartOptions = {
          plugins: {
            tooltip: {
              backgroundColor: 'white',
              displayColors: false,
              padding: 10,
              titleColor: '#2D2F33',
              titleFont: {
                size: 18
              },
              bodyColor: '#2D2F33',
              bodyFont: {
                size: 13
              }
            }
          }
        };
        break;
      case "pie":
        break;
      case "bar":
        console.log('return bar options')
        chartOptions = {
          scales: {
            x: {},
            y: {
              min: 10
            }
          },
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'end'
            }
          }
        }
        break;
      case "bubble":
        chartOptions = {
          scales: {
            x: {
              min: 10,
              max: 30,
              ticks: {}
            },
            y: {
              min: 10,
              max: 30,
              ticks: {}
            },
          }
        }
    }

    return {
      responsive: true,
      maintainAspectRatio: false,
      ...chartOptions
    }
  }

  updateData(): ChartDataset[] {
    const data = this.lineChartService.loadDataset()
    if (data.page != this.chartPage) {
      this.setNewDataset(data);
      this.chartOptions = this.getChartOptions()
      this.defaultChartProps = this.getDefaultChartProps()
      this.chartPage = data.page
    }
    return this.chartData
  }

  setNewDataset(chatData: DataChartType): void{
    if (!chatData) return
    this.chartHeader = chatData.header;
    this.chartData =  chatData.datasets.map((ds) => ({
      data: ds.data,
      label: ds.label,
      ...this.defaultChartProps
    }))
    this.chartLabels = chatData.labels
  }

  ngOnInit(): void {
    this.setNewDataset(this.lineChartService.loadDataset());
  }
}
