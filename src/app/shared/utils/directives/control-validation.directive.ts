import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  inject,
  DestroyRef,
} from '@angular/core'
import { NgControl } from '@angular/forms'
import { ValidationService } from '@vietlist/shared'

enum CONTROL_STATUS {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

@Directive({
  standalone: true,
  selector: '[appFormControlValidation]',
})
export class FormControlValidationDirective {
  private readonly _destroyRef = inject(DestroyRef)

  @Input('validationMsgId') validationMsgId: string = ''

  constructor(
    private validation: ValidationService,
    private control: NgControl,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.control.statusChanges
      ?.pipe(takeUntilDestroyed(this._destroyRef))
      ?.subscribe((status) => {
        if (status === CONTROL_STATUS.INVALID && (this.control.touched || this.control.dirty)) {
          this.showError()
        } else {
          this.removeError()
        }
      })
  }

  @HostListener('blur')
  handleBlurEvent(): void {
    if (this.control.value == '' || this.control.value == null) {
      if (this.control.errors) this.showError()
      else this.removeError()
    }
  }

  removeError(): void {
    this.el.nativeElement.nextElementSibling?.remove()
  }

  showError(): void {
    this.removeError()

    const errorMessage = this.validation.getValidationMessage(
      this.validationMsgId,
    )

    const errorSpan = document.createElement('span')
    errorSpan.classList.add('error-message')
    errorSpan.textContent = errorMessage

    this.el.nativeElement.insertAdjacentElement('afterend', errorSpan)
  }
}
