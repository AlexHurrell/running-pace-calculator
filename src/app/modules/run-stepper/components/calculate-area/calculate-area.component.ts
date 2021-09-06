import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Distance, DistanceLength, DistanceUnits } from '../../models/models';
import { Choices } from '../../pages/run-selection-page/run-selection-page.component';

@Component({
  selector: 'app-calculate-area',
  templateUrl: './calculate-area.component.html',
  styleUrls: ['./calculate-area.component.scss'],
})
export class CalculateAreaComponent implements OnInit {
  @Input() form: FormGroup;

  @Input() choice: Choices | null | string;

  @Output() classicDistance = new EventEmitter<any>();

  choices = Choices;

  selectedDistance: DistanceLength | null;

  distances: Distance[] = [
    {
      name: '5k',
      length: {
        km: 5,
        miles: 3.10686,
      },
    },
    {
      name: '10k',
      length: {
        km: 10,
        miles: 6.21371,
      },
    },
    {
      name: '10 miles',
      length: {
        km: 16.0934,
        miles: 10,
      },
    },
    {
      name: 'Half Marathon',
      length: {
        km: 21.0775,
        miles: 13.1094,
      },
    },
    {
      name: 'Marathon',
      length: {
        km: 42.195,
        miles: 26.2188,
      },
    },
  ];

  paceUnits = [DistanceUnits.Km, DistanceUnits.Mile];

  distanceUnit: DistanceUnits = DistanceUnits.Km;

  constructor() {}

  ngOnInit(): void {}

  classicDistanceEmitter(
    event?: MatSelectChange,
    selectedDistance?: DistanceLength | null,
    distanceUnit?: string
  ) {
    this.classicDistance.emit({ event, selectedDistance, distanceUnit });
  }

  distanceChange() {
    this.selectedDistance = null;
  }
}
