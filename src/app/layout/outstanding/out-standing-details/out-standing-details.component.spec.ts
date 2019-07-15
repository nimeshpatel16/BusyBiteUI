import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStandingDetailsComponent } from './out-standing-details.component';

describe('OutStandingDetailsComponent', () => {
  let component: OutStandingDetailsComponent;
  let fixture: ComponentFixture<OutStandingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStandingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStandingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
