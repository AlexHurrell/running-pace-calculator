import { Component } from '@angular/core';

export enum Choices {
  Distance = 'distance',
  Time = 'time',
  Pace = 'pace',
}

@Component({
  selector: 'app-run-selection-page',
  templateUrl: './run-selection-page.component.html',
  styleUrls: ['./run-selection-page.component.scss'],
})
export class RunSelectionPageComponent {
  choices = Choices;

  choice: string = '';

  constructor() {}
}
