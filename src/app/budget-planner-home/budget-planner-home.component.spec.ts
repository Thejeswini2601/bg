import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPlannerHomeComponent } from './budget-planner-home.component';


describe('BudgetPlannerHomeComponent', () => {
  let component: BudgetPlannerHomeComponent;
  let fixture: ComponentFixture<BudgetPlannerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetPlannerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetPlannerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
