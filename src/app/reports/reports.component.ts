import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular'; // Import HighchartsChartModule for standalone usage
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular pipes like currency

@Component({
  selector: 'app-report',
  standalone: true, // Declare this as a standalone component
  imports: [CommonModule, HighchartsChartModule], // Use Highcharts and CommonModule directly
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportComponent {
  Highcharts = Highcharts;

  // Insights data (replace with dynamic data)
  totalIncome = 50000;
  dataInsights = 'Based on the analysis, the spending on groceries has increased by 10%.';
  percentageIncrease = 8; // Percentage increase from the previous year

  // Highcharts column graph options with type safety
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column' // Change the chart type to 'column'
    },
    title: {
      text: 'Monthly Expenses Breakdown'
    },
    xAxis: {
      categories: ['Food', 'Groceries', 'EB Bill', 'Shopping'], // X-axis categories representing expense types
      title: {
        text: 'Expense Categories' // Title for the X-axis
      }
    },
    yAxis: {
      min: 0, // Minimum value for Y-axis
      title: {
        text: 'Amount (USD)', // Title for Y-axis
        align: 'high'
      }
    },
    tooltip: {
      valueSuffix: ' USD' // Tooltip suffix to indicate currency
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true // Enable data labels on the columns
        }
      }
    },
    series: [{
      type: 'column', // Series type
      name: 'September', // Data for September
      data: [1200, 1500, 800, 1000] // Example data for September (corresponding to categories in X-axis)
    }, {
      type: 'column', // Series type
      name: 'October', // Data for October
      data: [1400, 1600, 900, 1100] // Example data for October (corresponding to categories in X-axis)
    }, {
      type: 'column', // Series type
      name: 'November', // Data for November
      data: [1300, 1700, 850, 1050] // Example data for November (corresponding to categories in X-axis)
    }]
  };
}
