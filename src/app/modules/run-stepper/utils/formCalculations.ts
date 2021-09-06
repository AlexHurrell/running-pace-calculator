import { calculationForm, DistanceUnits } from '../models/models';

export function paceResult(formValue: calculationForm): string {
  const seconds =
    Number(formValue.time.hours) * 3600 +
    Number(formValue.time.minutes) * 60 +
    Number(formValue.time.seconds);
  let pace =
    (seconds * (formValue.paceUnits === DistanceUnits.Km ? 1 : 1.60934)) /
    (Number(formValue.customDistance) *
      (formValue.distanceUnit === DistanceUnits.Km ? 1 : 1.60934));

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

export function distanceResult(formValue: calculationForm): string {
  const secondsTime =
    Number(formValue.time.hours) * 3600 +
    Number(formValue.time.minutes) * 60 +
    Number(formValue.time.seconds);

  const paceTime =
    (Number(formValue.pace.minutes) * 60 + Number(formValue.pace.seconds)) /
    (formValue.paceUnits === DistanceUnits.Km
      ? formValue.distanceUnit === DistanceUnits.Km
        ? 1
        : 0.621371
      : formValue.distanceUnit === DistanceUnits.Mile
      ? 1
      : 1.60934);

  return String(secondsTime / paceTime);
}

export function timeResult(formValue: calculationForm): string {
  const paceFr =
    Number(formValue.pace.minutes) + Number(formValue.pace.seconds) / 60;

  const paceFrHour = 60 / paceFr;

  let secondsTime =
    (3600 *
      Number(formValue.customDistance) *
      (formValue.paceUnits === DistanceUnits.Km
        ? formValue.distanceUnit === DistanceUnits.Km
          ? 1
          : 1.60934
        : formValue.distanceUnit === DistanceUnits.Mile
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
