import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Directive({
  standalone: true,
  selector: '[appFormControlValidation]'
})
export class FormControlValidationDirective {
  @Input('validationMsgId') validationMsgId: string = '';

  constructor(
    private validation: ValidationService,
    private control: NgControl,
    private el: ElementRef
  ) {}

  @HostListener('blur')
  handleBlurEvent(): void {
    if (this.control.touched && this.control.invalid) {
      this.showError();
    } else {
      this.removeError();
    }
  }

  removeError(): void {
    this.el.nativeElement.nextElementSibling?.remove();
  }

  showError(): void {
    this.removeError();

    const errorMessage = this.validation.getValidationMessage(this.validationMsgId);
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.textContent = errorMessage;

    this.el.nativeElement.insertAdjacentElement('afterend', errorSpan);
  }
}
