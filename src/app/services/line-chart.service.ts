import {Injectable} from '@angular/core';
import {DataChartType} from "../components/chart/charts";

@Injectable({
  providedIn: 'root'
})
export class LineChartService {

  currentDataset: DataChartType;

  loadDataset(): DataChartType {
    return this.currentDataset
  }

  setDataset(newSet: DataChartType): void {
    this.currentDataset = newSet
  }

}
