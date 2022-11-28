export interface DataChartType {
  page: number;
  header: string;
  datasets: [{
    data: number[],
    label: string
  }]
  labels: string[]
}

