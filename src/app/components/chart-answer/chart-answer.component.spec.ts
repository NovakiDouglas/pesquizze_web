import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAnswerComponent } from './chart-answer.component';

describe('ChartAnswerComponent', () => {
  let component: ChartAnswerComponent;
  let fixture: ComponentFixture<ChartAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
