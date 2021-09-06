import { AbstractControl, FormGroup } from '@angular/forms';

export interface DistanceLength {
  km: number;
  miles: number;
}

export interface Distance {
  name: string;
  length: DistanceLength;
}

export enum DistanceUnits {
  Km = 'km',
  Mile = 'mile',
}

export interface calculationForm {
  distanceUnit: DistanceUnits;
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

export type calculationFormControls = {
  [key in keyof calculationForm]: AbstractControl;
};
export type calculationFormGroup = FormGroup & {
  value: calculationForm;
  controls: calculationFormControls;
};
