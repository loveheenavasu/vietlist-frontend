import { CommonModule } from '@angular/common'
import { Component, ViewChild } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { LeadgenerationService } from '../resell.service'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatStepper, MatStepperModule } from '@angular/material/stepper'
import { MatInputModule } from '@angular/material/input'
import { LoanOptionCardComponent } from './loan-option-card/loan-option-card.component'
import { FullPageLoaderService } from '@vietlist/shared'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
@Component({
  selector: 'app-lead-generation',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    LoanOptionCardComponent,
    AutocompleteComponent,
  ],
  templateUrl: './lead-generation.component.html',
  styleUrl: './lead-generation.component.scss',
})
export class LeadGenerationComponent {
  steps: any
  direction: string = ''
  check: any
  public verifiedBadge = new FormControl(false)
  currentStep: number = 1
  totalSteps: number = 3
  public selectedOptions: { [key: string]: string } = {}
  showMore: boolean = false
  notSubmitted: boolean = true
  @ViewChild('stepper') private myStepper?: MatStepper

  toggleShowMore() {
    this.showMore = !this.showMore
  }

  getAddress(place: any) {
    this.selectedOptions['current_mailing_address'] = place.formatted_address
  }

  public purchasePrice = new FormControl('', [
    Validators.required,
    this.priceValidator(50000, 10000000),
  ])
  public estimatedHomeValue = new FormControl('', [
    Validators.required,
    this.priceValidator(50000, 10000000),
  ])

  public downPaymentAmount = new FormControl('', [
    Validators.required,
    this.priceValidator(0, 10000000),
  ])
  public mortgageBalance = new FormControl('', [
    Validators.required,
    this.priceValidator(0, 10000000),
  ])
  public additionalCash = new FormControl('', [
    Validators.required,
    this.priceValidator(0, 10000000),
  ])
  public email = new FormControl('', [Validators.required, Validators.email])
  public address = new FormControl('', [Validators.required])
  public firstName = new FormControl('', [Validators.required])
  public lastName = new FormControl('', [Validators.required])
  public phoneNumber = new FormControl('', [Validators.required])
  public purchasePriceErrorMessage: string = ''
  public downPaymentAmountErrorMessage: string = ''
  public estimatedHomeValueErrorMessage: string = ''
  public mortgageBalanceErrorMessage: string = ''
  public firstNameErrorMessage: string = ''
  public lastNameErrorMessage: string = ''
  public additionalCashErrorMessage: string = ''
  public phoneNumberErrorMessage: string = ''
  public emailErrorMessage: string = ''
  public addressErrorMessage: string = ''

  // public amount: FormGroup

  constructor(
    private service: LeadgenerationService,
    private fullPageLoaderService: FullPageLoaderService,
  ) {
    // this.amount = this.fb.group({
    //   purchasePrice: this.purchasePrice,
    //   downPaymentAmount: this.downPaymentAmount,
    //   mortgageBalance: this.mortgageBalance,
    //   estimatedHomeValue: this.estimatedHomeValue,
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   phoneNumber: this.phoneNumber,
    // })

    // Subscribe to value changes to format the number and update error messages
    this.purchasePrice.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        const formattedValue = this.formatNumber(value)
        if (formattedValue !== value) {
          this.purchasePrice.setValue(formattedValue, { emitEvent: false })
        }
      }
      this.selectedOptions['purchase_price'] = value?.replaceAll(',', '') + ''
      this.updateErrorMessage('purchasePrice')
    })
    this.estimatedHomeValue.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        const formattedValue = this.formatNumber(value)
        if (formattedValue !== value) {
          this.estimatedHomeValue.setValue(formattedValue, { emitEvent: false })
        }
      }
      ;(this.selectedOptions['estimated_home_value'] =
        value?.replaceAll(',', '') + ''),
        this.updateErrorMessage('estimatedHomeValue')
    })
    this.downPaymentAmount.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        const formattedValue = this.formatNumber(value)
        if (formattedValue !== value) {
          this.downPaymentAmount.setValue(formattedValue, { emitEvent: false })
        }
      }
      this.selectedOptions['estimated_down_payment'] =
        value?.replaceAll(',', '') + ''
      this.updateErrorMessage('downPaymentAmount')
    })
    this.mortgageBalance.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        const formattedValue = this.formatNumber(value)
        if (formattedValue !== value) {
          this.mortgageBalance.setValue(formattedValue, { emitEvent: false })
        }
      }
      this.selectedOptions['mortgage_balance'] = value?.replaceAll(',', '') + ''
      this.updateErrorMessage('mortgageBalance')
    })
    this.additionalCash.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        const formattedValue = this.formatNumber(value)
        if (formattedValue !== value) {
          this.additionalCash.setValue(formattedValue, { emitEvent: false })
        }
      }
      this.selectedOptions['cash_borrow'] = value?.replaceAll(',', '') + ''
      this.updateErrorMessage('additionalCash')
    })
    this.firstName.valueChanges.subscribe((value) => {
      this.selectedOptions['first_name'] = value?.replaceAll(',', '') + ''
      this.updateErrorMessage('firstName')
    })
    this.lastName.valueChanges.subscribe((value) => {
      this.selectedOptions['last_name'] = value?.replaceAll(',', '') + ''
      this.updateErrorMessage('lastName')
    })
    this.phoneNumber.valueChanges.subscribe((value) => {
      this.selectedOptions['phone_number'] = value?.replaceAll(',', '') + ''
      this.updateErrorMessage('phoneNumber')
    })
    this.email.valueChanges.subscribe((value) => {
      this.selectedOptions['email'] = value?.replaceAll(',', '') + ''
      this.updateErrorMessage('email')
    })
    this.address.valueChanges.subscribe((value) => {
      this.selectedOptions['current_mailing_address'] =
        value?.replaceAll(',', '') + ''
      this.updateErrorMessage('address')
    })
  }

  convertNumber(string: string): number {
    return Number(string)
  }

  formatNumber(value: string): string {
    value = value.replace(/[^0-9,]/g, '')
    value = value.replace(/^0+(?!$)/, '')
    value = value.replace(/^,/, '')

    if (value === '' || value === ',') {
      return value
    }

    // Format the number
    const numberValue = Number(value.replace(/,/g, ''))
    const formattedValue = numberValue.toLocaleString('en')
    return formattedValue
  }

  message = {
    estimatedHomeValue: 'Please enter your estimated home value.',
    mortgageBalance: 'Please enter your mortgage balance.',
    downPaymentAmount: 'Please enter your estimated down payment.',
    purchasePrice: 'Please enter the purchase price of your new home.',
    firstName: 'Please enter your first name.    ',
    lastName: 'Please enter your last name.    ',
    additionalCash:
      'Please enter the additional amount of cash you would like to borrow.    ',
    phoneNumber: 'Please enter your phone number.      ',
    email: 'Please enter your email address.    ',
    address: 'Please enter a valid address.    ',
  }

  updateErrorMessage(
    controlName:
      | 'purchasePrice'
      | 'downPaymentAmount'
      | 'estimatedHomeValue'
      | 'mortgageBalance'
      | 'firstName'
      | 'lastName'
      | 'additionalCash'
      | 'phoneNumber'
      | 'email'
      | 'address',
  ) {
    const control = this[controlName]
    let errorMessage = ''
    if (control.hasError('required')) {
      errorMessage = this.message[controlName as keyof typeof this.message]
    } else if (control.hasError('minPurchasePrice')) {
      errorMessage = `Amount must be greater than 50,000.`
    } else if (control.hasError('maxPurchasePrice')) {
      errorMessage = `Amount must be less than 10,000,000.`
    }
    this[`${controlName}ErrorMessage`] = errorMessage
  }

  priceValidator(minPrice: number, maxPrice: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value.replaceAll(',', '')
      // this.selectedOptions[] = value
      if (value && value < minPrice) {
        return { minPurchasePrice: { value: value } }
      } else if (value && value > maxPrice) {
        return { maxPurchasePrice: { value: value } }
      }
      return null
    }
  }

  selectOption({ option, key }: { option: string; key: string }) {
    this.selectedOptions[key] = option
    // this.nextStep()
  }

  get progress(): number {
    return (this.currentStep / this.totalSteps) * 100
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  goBack() {
    this.prevStep()
  }
  submitLead() {
    this.fullPageLoaderService.showLoader()
    this.service.CreateLead(this.selectedOptions).subscribe({
      next: () => {
        this.notSubmitted = false
        this.fullPageLoaderService.hideLoader()
      },
      error: () => {
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  ngOnInit() {
    this.selectedOptions['consent_to_send_text_message'] = 'no'
    this.service.getLoanApplicationTitlesAndUrl().subscribe({
      next: (res) => {
        this.steps = res
      },
    })
  }

  ngAfterViewInit() {
    this.totalSteps = this.myStepper?.steps.length || 0
    // this.service.GetLeads().subscribe({ next: () => {} })
  }

  consernCheck() {
    this.selectedOptions['consent_to_send_text_message'] = this.check
      ? 'yes'
      : 'no'
    console.log(this.check, 'jjjj')
  }
}
