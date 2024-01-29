import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl || !(formGroup instanceof FormGroup)) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['match_error']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ match_error: 'Value does not match' });
      return { match_error: 'Value does not match' };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
