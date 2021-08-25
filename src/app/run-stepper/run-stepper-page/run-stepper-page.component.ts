import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-run-stepper-page',
  templateUrl: './run-stepper-page.component.html',
  styleUrls: ['./run-stepper-page.component.scss'],
})
export class RunStepperPageComponent {
  firstFormGroup = new FormGroup({
    distance: new FormControl('', Validators.required),
  });
  secondFormGroup = new FormGroup({
    time: new FormControl('', Validators.required),
  });

  constructor() {}
}
