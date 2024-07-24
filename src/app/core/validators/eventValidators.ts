import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { delay, Observable, of } from 'rxjs';

export function asyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return of(null).pipe(delay(1000)); // Simula un validador asíncrono
    };
}

/*
export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log('Validating futureDateValidator:', control.value);
        if (!control.value) {
            return null;
        }

        const selectedDate = moment(control.value);
        const currentDate = moment().startOf('day'); // Ignora la parte de tiempo del día actual

        return selectedDate.isAfter(currentDate) ? null : { futureDate: { value: control.value } };
    };
}*/

/*
export function startTimeValidator(endTimeControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log('Validating startTimeValidator:', control.value);
        const formGroup = control.parent;
        if (!formGroup) {
            return null;
        }

        const endTimeControl = formGroup.get(endTimeControlName);
        if (!endTimeControl || !control.value || !endTimeControl.value) {
            return null;
        }

        const startTime = moment(control.value, 'HH:mm');
        const endTime = moment(endTimeControl.value, 'HH:mm');

        if (startTime.isAfter(endTime)) {
            return { startTimeAfterEndTime: { value: control.value } };
        }

        if (startTime.isBefore(moment())) {
            return { startTimeBeforeCurrentTime: { value: control.value } };
        }

        return null;
    };
}*/
