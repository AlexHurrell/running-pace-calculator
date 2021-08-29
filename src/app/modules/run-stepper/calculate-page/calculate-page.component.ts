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
      customDistance: ['', Validators.required],
      classicDistance: '',
      time: this.formBuilder.group(
        {
          hours: '',
          minutes: '',
          seconds: '',
        },
        { validator: this.oneRequired(Choices.Distance) }
      ),
      pace: this.formBuilder.group(
        {
          paceMinutes: '',
          paceSeconds: '',
        },
        { validator: this.oneRequired(Choices.Pace) }
      ),
    });

    this.form.valueChanges.subscribe((formValue) => {
      if (this.form.valid) {
        if (this.choice === Choices.Pace) {
          this.result = this.paceResult(formValue);
        } else if (this.choice === Choices.Distance) {
        } else {
        }
      } else {
        this.result = '';
      }
    });
  }

  oneRequired(choice: Choices) {
    return (formGroup: FormGroup) => {
      if (choice === this.choice) return null;
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
}
