import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackYourExpensesComponent } from './track-your-expenses.component';

describe('TrackYourExpensesComponent', () => {
  let component: TrackYourExpensesComponent;
  let fixture: ComponentFixture<TrackYourExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackYourExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackYourExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
