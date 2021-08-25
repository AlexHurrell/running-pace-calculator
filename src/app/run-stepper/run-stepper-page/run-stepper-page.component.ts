import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum Choices {
  Distance = 'Distance',
  Time = 'Time',
  Pace = 'Pace',
}

@Component({
  selector: 'app-run-stepper-page',
  templateUrl: './run-stepper-page.component.html',
  styleUrls: ['./run-stepper-page.component.scss'],
})
export class RunStepperPageComponent {
  choices = Choices;

  firstFormGroup = new FormGroup({
    distance: new FormControl('', Validators.required),
  });
  secondFormGroup = new FormGroup({
    time: new FormControl('', Validators.required),
  });
  thirdFormGroup = new FormGroup({
    pace: new FormControl('', Validators.required),
  });

  choice: string = '';

  constructor() {}
}
