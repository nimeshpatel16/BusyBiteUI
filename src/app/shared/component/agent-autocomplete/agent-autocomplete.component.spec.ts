import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAutocompleteComponent } from './agent-autocomplete.component';

describe('AgentAutocompleteComponent', () => {
  let component: AgentAutocompleteComponent;
  let fixture: ComponentFixture<AgentAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
