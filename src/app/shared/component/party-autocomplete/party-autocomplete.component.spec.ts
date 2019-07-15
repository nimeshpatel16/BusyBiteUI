import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAutocompleteComponent } from './party-autocomplete.component';

describe('PartyAutocompleteComponent', () => {
  let component: PartyAutocompleteComponent;
  let fixture: ComponentFixture<PartyAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
