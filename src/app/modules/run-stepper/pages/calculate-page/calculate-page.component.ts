import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Choices } from '../run-selection-page/run-selection-page.component';
import { Distance, DistanceLength, DistanceUnits } from '../../models/models';
import {
  paceResult,
  distanceResult,
  timeResult,
} from '../../utils/formCalculations';

@Component({
  selector: 'app-calculate-page',
  templateUrl: './calculate-page.component.html',
  styleUrls: ['./calculate-page.component.scss'],
})
export class CalculatePageComponent implements OnInit {
  form: FormGroup;

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

  choices = Choices;

  choice: Choices | null | string;

  result: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.choice = params['id'];
      if (!this.choice) this.choice = Choices.Pace;

      if (
        this.choice !== Choices.Pace &&
        this.choice !== Choices.Time &&
        this.choice !== Choices.Distance
      ) {
        this.choice = Choices.Pace;
      }

      if (this.form) {
        this.form.reset();

        this.form.controls.paceUnits.setValue(DistanceUnits.Km);
        this.form.controls.distanceUnit.setValue(DistanceUnits.Km);
      }

      this.result = '';
    });

    this.form = this.formBuilder.group({
      distanceUnit: [DistanceUnits.Km, Validators.required],
      customDistance: ['', this.isRequired(Choices.Distance)],
      time: this.formBuilder.group(
        {
          hours: '',
          minutes: '',
          seconds: '',
        },
        { validator: this.oneRequired(Choices.Time) }
      ),
      pace: this.formBuilder.group(
        {
          minutes: '',
          seconds: '',
        },
        { validator: this.oneRequired(Choices.Pace) }
      ),
      paceUnits: DistanceUnits.Km,
    });

    this.form.valueChanges.subscribe((formValue) => {
      if (this.form.valid) {
        if (this.choice === Choices.Pace) {
          this.result = paceResult(formValue);
        } else if (this.choice === Choices.Distance) {
          this.result = distanceResult(formValue);
        } else {
          this.result = timeResult(formValue);
        }
      } else {
        this.result = '';
      }
    });
  }

  isRequired(choice1: Choices): ValidatorFn {
    return (formControl) => {
      if (choice1 === this.choice) return null;
      if (formControl.value) return null;
      return { isRequired: '' };
    };
  }

  classicDistance(params?: any) {
    const { selectedDistance, event, distanceUnit } = params;
    if (!event) {
      if (selectedDistance) {
        if (distanceUnit === DistanceUnits.Km) {
          this.form.patchValue({
            customDistance: selectedDistance.km,
            distanceUnit,
          });
        } else {
          this.form.patchValue({
            customDistance: selectedDistance.miles,
            distanceUnit,
          });
        }
      } else {
        this.form.patchValue({
          distanceUnit,
        });
      }
    } else {
      if (distanceUnit === DistanceUnits.Km) {
        this.form.patchValue({
          customDistance: event.value.km,
          distanceUnit,
        });
      } else {
        this.form.patchValue({
          customDistance: event.value.miles,
          distanceUnit,
        });
      }
    }
  }

  oneRequired(choice: Choices, choice2?: Choices) {
    return (formGroup: FormGroup) => {
      if (choice === this.choice || choice2 === this.choice) return null;
      return Object.keys(formGroup.value).some((key) => !!formGroup.value[key])
        ? null
        : { oneRequired: '' };
    };
  }
}
