import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Choices } from '../run-selection-page/run-selection-page.component';
import { MatSelectChange } from '@angular/material/select';

interface DistanceLength {
  km: number;
  miles: number;
}

interface Distance {
  name: string;
  length: DistanceLength;
}

export enum DistanceUnits {
  Km = 'km',
  Mile = 'mile',
}

export interface calculationForm {
  units: DistanceUnits;
  time: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  pace: {
    minutes: string;
    seconds: string;
  };
  customDistance: string;
  classicDistance: string;
  paceUnits: DistanceUnits;
}

type calculationFormControls = {
  [key in keyof calculationForm]: AbstractControl;
};
type calculationFormGroup = FormGroup & {
  value: calculationForm;
  controls: calculationFormControls;
};

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

  distanceUnit: DistanceUnits = DistanceUnits.Km;

  paceUnits = [DistanceUnits.Km, DistanceUnits.Mile];

  choices = Choices;

  choice: Choices | null | string;

  result: string;

  selectedDistance: DistanceLength | null;

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
        this.form.controls.units.setValue(DistanceUnits.Km);
        this.distanceUnit = DistanceUnits.Km;
      }

      this.result = '';
    });

    this.form = this.formBuilder.group({
      units: [DistanceUnits.Km, Validators.required],
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
          this.result = this.paceResult(formValue);
        } else if (this.choice === Choices.Distance) {
          this.result = this.distanceResult(formValue);
        } else {
          this.result = this.timeResult(formValue);
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

  classicDistance(event?: MatSelectChange) {
    if (!event) {
      if (this.selectedDistance) {
        if (this.distanceUnit === DistanceUnits.Km) {
          this.form.patchValue({
            customDistance: this.selectedDistance.km,
            units: this.distanceUnit,
          });
        } else {
          this.form.patchValue({
            customDistance: this.selectedDistance.miles,
            units: this.distanceUnit,
          });
        }
      } else {
        this.form.patchValue({
          units: this.distanceUnit,
        });
      }
    } else {
      if (this.distanceUnit === DistanceUnits.Km) {
        this.form.patchValue({
          customDistance: event.value.km,
          units: this.distanceUnit,
        });
      } else {
        this.form.patchValue({
          customDistance: event.value.miles,
          units: this.distanceUnit,
        });
      }
    }
  }

  distanceChange() {
    if (this.selectedDistance) this.selectedDistance = null;
  }

  oneRequired(choice: Choices, choice2?: Choices) {
    return (formGroup: FormGroup) => {
      if (choice === this.choice || choice2 === this.choice) return null;
      return Object.keys(formGroup.value).some((key) => !!formGroup.value[key])
        ? null
        : { oneRequired: '' };
    };
  }

  private paceResult(formValue: calculationForm): string {
    const seconds =
      Number(formValue.time.hours) * 3600 +
      Number(formValue.time.minutes) * 60 +
      Number(formValue.time.seconds);
    let pace =
      (seconds * (formValue.paceUnits === DistanceUnits.Km ? 1 : 1.60934)) /
      (Number(formValue.customDistance) *
        (formValue.units === DistanceUnits.Km ? 1 : 1.60934));

    let paceHours = String(Math.floor(pace / 3600)).padStart(2, '0');
    pace %= 3600;
    let paceMinutes = String(Math.floor(pace / 60)).padStart(2, '0');
    let paceSeconds = String(Math.round(pace % 60)).padStart(2, '0');

    return (
      (paceHours ? paceHours + ':' : '') +
      (paceMinutes ? paceMinutes + ':' : '') +
      (paceSeconds ? paceSeconds : '')
    );
  }

  private distanceResult(formValue: calculationForm): string {
    const secondsTime =
      Number(formValue.time.hours) * 3600 +
      Number(formValue.time.minutes) * 60 +
      Number(formValue.time.seconds);

    const paceTime =
      (Number(formValue.pace.minutes) * 60 + Number(formValue.pace.seconds)) /
      (formValue.paceUnits === DistanceUnits.Km
        ? formValue.units === DistanceUnits.Km
          ? 1
          : 0.621371
        : formValue.units === DistanceUnits.Mile
        ? 1
        : 1.60934);

    return String(secondsTime / paceTime);
  }

  private timeResult(formValue: calculationForm): string {
    const paceFr =
      Number(formValue.pace.minutes) + Number(formValue.pace.seconds) / 60;

    const paceFrHour = 60 / paceFr;

    let secondsTime =
      (3600 *
        Number(formValue.customDistance) *
        (formValue.paceUnits === DistanceUnits.Km
          ? formValue.units === DistanceUnits.Km
            ? 1
            : 1.60934
          : formValue.units === DistanceUnits.Mile
          ? 1
          : 0.621371)) /
      paceFrHour;

    let timeHours = String(Math.floor(secondsTime / 3600)).padStart(2, '0');
    secondsTime %= 3600;
    let timeMinutes = String(Math.floor(secondsTime / 60)).padStart(2, '0');
    let timeSeconds = String(Math.round(secondsTime % 60)).padStart(2, '0');

    return (
      (timeHours ? timeHours + ':' : '') +
      (timeMinutes ? timeMinutes + ':' : '') +
      (timeSeconds ? timeSeconds : '')
    );
  }
}
