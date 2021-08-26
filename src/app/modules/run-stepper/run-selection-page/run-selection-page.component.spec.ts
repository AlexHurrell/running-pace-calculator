import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSelectionPageComponent } from './run-selection-page.component';

describe('RunStepperPageComponent', () => {
  let component: RunSelectionPageComponent;
  let fixture: ComponentFixture<RunSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RunSelectionPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
