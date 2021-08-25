import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunStepperPageComponent } from './run-stepper-page.component';

describe('RunStepperPageComponent', () => {
  let component: RunStepperPageComponent;
  let fixture: ComponentFixture<RunStepperPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunStepperPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunStepperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
