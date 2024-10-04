import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-budgeting-tips',
  standalone: true,
  templateUrl: './budgeting-tips.component.html',
  styleUrls: ['./budgeting-tips.component.css'],
  imports: [ReactiveFormsModule, HighchartsChartModule, CommonModule]
})
export class BudgetingTipsComponent {
  @ViewChild('ruleSection') ruleSection!: ElementRef;
  @ViewChild('tipsSection') tipsSection!: ElementRef;

  showRule = false;
  showTips = false;
  budgetForm: FormGroup;
  salary: number = 0;
  needs: number = 0;
  wants: number = 0;
  savings: number = 0;

  // Highcharts properties
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: '50/30/20 Rule Breakdown'
    },
    series: []
  };

  constructor(private fb: FormBuilder,private location: Location ) {
    this.budgetForm = this.fb.group({
      salary: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  show50_30_20() {
    this.showRule = true;
    this.showTips = false;
  }

  showGeneralTips() {
    this.showRule = false;
    this.showTips = true;
  }

  calculateBudget(): void {
    if (this.budgetForm.valid) {
      this.salary = this.budgetForm.value.salary;
      this.needs = this.salary * 0.5;
      this.wants = this.salary * 0.3;
      this.savings = this.salary * 0.2;

      // Pie chart configuration
      this.chartOptions = {
        chart: {
          type: 'pie'
        },
        title: {
          text: '50/30/20 Rule Breakdown'
        },
        series: [
          {
            type: 'pie',
            data: [
              { name: 'Needs (50%)', y: this.needs },
              { name: 'Wants (30%)', y: this.wants },
              { name: 'Savings (20%)', y: this.savings }
            ]
          }
        ]
      };
    }
  }

  // Scroll functions
  scrollTo50_30_20() {
    this.show50_30_20();
    this.ruleSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToGeneralTips() {
    this.showGeneralTips();
    this.tipsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  goBack() {
    this.location.back();
  }
}
