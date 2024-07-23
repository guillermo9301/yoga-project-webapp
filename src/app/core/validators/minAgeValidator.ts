import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const birthDate = moment(control.value);
        const currentDate = moment();
        const age = currentDate.diff(birthDate, 'years');

        return age >= minAge ? null : { minAge: { value: control.value } };
    };
}
