import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Choices } from '../run-selection-page/run-selection-page.component';

interface distance {
  name: string;
  length: number;
}

interface calculationForm {
  units: string;
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
  paceUnits: string;
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

  distances: distance[] = [
    {
      name: '5k',
      length: 5,
    },
    {
      name: '10k',
      length: 10,
    },
    {
      name: '10 miles',
      length: 16.0934,
    },
    {
      name: 'Half Marathon',
      length: 21.0775,
    },
    {
      name: 'Marathon',
      length: 42.195,
    },
  ];

  paceUnits = ['km', 'mile'];

  choices = Choices;

  choice: Choices | null | string;

  result: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.choice = this.route.snapshot.paramMap.get('id');
    if (!this.choice) this.choice = Choices.Pace;

    if (
      this.choice !== Choices.Pace &&
      this.choice !== Choices.Time &&
      this.choice !== Choices.Distance
    ) {
      this.choice = Choices.Pace;
    }

    this.form = this.formBuilder.group({
      units: ['km', Validators.required],
      customDistance: ['', this.isRequired(Choices.Distance, Choices.Pace)],
      classicDistance: '',
      time: this.formBuilder.group(
        {
          hours: '',
          minutes: '',
          seconds: '',
        },
        { validator: this.oneRequired(Choices.Pace, Choices.Time) }
      ),
      pace: this.formBuilder.group(
        {
          minutes: '',
          seconds: '',
        },
        { validator: this.oneRequired(Choices.Pace) }
      ),
      paceUnits: 'km',
    });

    this.form.valueChanges.subscribe((formValue) => {
      console.log(this.form.valid);
      if (this.form.valid) {
        if (this.choice === Choices.Pace) {
          this.result = this.paceResult(formValue);
        } else if (this.choice === Choices.Distance) {
          this.result = this.distanceResult(formValue);
        } else {
        }
      } else {
        this.result = '';
      }
    });
  }

  isRequired(choice: Choices, choice2: Choices) {
    if (choice !== this.choice && choice2 !== this.choice) return null;
    return '';
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
    let pace = seconds / Number(formValue.customDistance);

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
      (formValue.paceUnits === 'km'
        ? formValue.units === 'km'
          ? 1
          : 0.621371
        : formValue.units === 'mile'
        ? 1
        : 1.60934);

    return String(secondsTime / paceTime);
  }

  templatePadStart(value: number) {
    return String(value).padStart(2, '0');
  }
}
