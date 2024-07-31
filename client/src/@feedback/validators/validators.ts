import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FeedbackValidators {
    /**
     * Check for empty (optional fields) values
     *
     * @param value
     */
    static isEmptyInputValue(value: any): boolean {
        return value == null || value.length === 0;
    }

    /**
     * Must match validator
     *
     * @param controlPath A dot-delimited string values that define the path to the control.
     * @param matchingControlPath A dot-delimited string values that define the path to the matching control.
     */
    static mustMatch(controlPath: string, matchingControlPath: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {

            const control = formGroup.get(controlPath);
            const matchingControl = formGroup.get(matchingControlPath);
            if ( !control || !matchingControl ) {
                return null;
            }

            if ( matchingControl.hasError('mustMatch') ) {
                delete matchingControl.errors.mustMatch;
                matchingControl.updateValueAndValidity();
            }

            if ( this.isEmptyInputValue(matchingControl.value) || control.value === matchingControl.value ) {
                return null;
            }

            const errors = {mustMatch: true};
            matchingControl.setErrors(errors);
            return errors;
        };
    }
}
