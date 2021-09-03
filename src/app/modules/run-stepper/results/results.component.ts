import { Component, Input, OnInit } from '@angular/core';
import { calculationForm } from '../calculate-page/calculate-page.component';
import { Choices } from '../run-selection-page/run-selection-page.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  @Input() choice: string | null = '';
  @Input() result = '';
  @Input() formValue: calculationForm;

  choices = Choices;

  constructor() {}

  ngOnInit(): void {}

  templatePadStart(value: string) {
    return String(Math.floor(Number(value))).padStart(2, '0');
  }
}
