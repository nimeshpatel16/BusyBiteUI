import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStandingSummaryComponent } from './out-standing-summary.component';

describe('OutStandingSummaryComponent', () => {
  let component: OutStandingSummaryComponent;
  let fixture: ComponentFixture<OutStandingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStandingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStandingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
