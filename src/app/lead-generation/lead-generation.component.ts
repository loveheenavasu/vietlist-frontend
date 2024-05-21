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
import { LeadgenerationService } from './leadgeneration.service'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatStepper, MatStepperModule } from '@angular/material/stepper'
import { MatInputModule } from '@angular/material/input'
import { LoanOptionCardComponent } from './loan-option-card/loan-option-card.component'
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
  ],
  templateUrl: './lead-generation.component.html',
  styleUrl: './lead-generation.component.scss',
})
export class LeadGenerationComponent {
  firstStep = [
    {
      url: '/assets/icons/refinance-home.svg',
      title: 'Refinance a home',
      value: 'refinance_a_home',
    },
    {
      url: '/assets/icons/buy-new-home.svg',
      title: 'Buy a new home',
      value: 'buy_a_new_home',
    },
    {
      url: '/assets/icons/cashout.svg',
      title: 'Take cash Out',
      value: 'take_cash_out',
    },
  ]

  secondStep = [
    {
      url: '/assets/icons/single-family.svg',
      title: 'Single-Family',
      value: 'single_family',
    },
    {
      url: '/assets/icons/multi-family.svg',
      title: 'Multifamily',
      value: 'multifamily',
    },
    {
      url: '/assets/icons/condominium.svg',
      title: 'Condominium',
      value: 'condominium',
    },
    {
      url: '/assets/icons/manufactured.svg',
      title: 'Manufactured',
      value: 'manufactured',
    },
  ]
  thirdStep = [
    {
      url: '/assets/icons/primary-residence.svg',
      title: 'Primary Residence',
      value: 'primary_residence',
    },
    {
      url: '/assets/icons/secondary-home.svg',
      title: 'Secondary Home',
      value: 'secondary_home',
    },
    {
      url: '/assets/icons/investment-property.svg',
      title: 'Investment Property',
      value: 'investment_property',
    },
  ]
  fourthStep = [
    {
      url: '/assets/icons/signed-purchase-agreement.svg',
      title: ' I signed a purchase agreement',
      value: 'signed_purchase_agreement',
    },
    {
      url: '/assets/icons/researching.svg',
      title: 'Just researching',
      value: 'researching',
    },
    {
      url: '/assets/icons/buy-new-home.svg',
      title: 'Looking at homes and listings',
      value: 'looking_at_homes',
    },
    {
      url: '/assets/icons/cashout.svg',
      title: 'Offer Pending / Found a House',
      value: 'offer_pending',
    },
  ]

  yesNoStep = [
    {
      url: '/assets/icons/yes.svg',
      title: 'Yes',
      value: 'yes',
    },
    {
      url: '/assets/icons/no.svg',
      title: 'No',
      value: 'no',
    },
  ]

  creditProfileStep = [
    {
      url: '/assets/icons/excellent-star.svg',
      title: `Excellent `,
      subTitle: '720+',
      value: 5,
    },
    {
      url: '/assets/icons/good-star.svg',
      title: `Good `,
      subTitle: '660-719',
      value: 4,
    },
    {
      url: '/assets/icons/average-star.svg',
      title: `Avg.`,
      subTitle: ' 630-659',
      value: 3,
    },
    {
      url: '/assets/icons/below-average-star.svg',
      title: `Below Avg. `,
      subTitle: ' 580-619',
      value: 2,
    },
    {
      url: '/assets/icons/poor-star.svg',
      title: `Poor`,
      subTitle: '≤ 579',
      value: 1,
    },
  ]

  employmentStatus = [
    {
      url: '/assets/icons/employed.svg',
      title: 'Employed',
      value: 'employed',
    },
    {
      url: '/assets/icons/self-employed.svg',
      title: 'Self employed',
      value: 'self_employed',
    },
    {
      url: '/assets/icons/retired.svg',
      title: 'Retired',
      value: 'retired',
    },
    {
      url: '/assets/icons/unemployed.svg',
      title: 'Not Employed',
      value: 'not_employed',
    },
  ]

  refinanceReason = [
    {
      title: 'Lower my monthly payments',
      value: 'lower_my_monthly_payment',
    },
    {
      title: 'Pay off my mortgage faster',
      value: 'pay_off_my_mortgage_faster',
    },
    {
      title: 'Change my ARM loan to fixed',
      value: 'change_my_ARM_loan_to_Fixed',
    },
    {
      title: 'Browse current mortgages rates',
      value: 'browse_current_mortgage_rates',
    },
    {
      title: 'Take cash out',
      value: 'take_cash_out',
    },
  ]
  purchaseDate = [
    {
      title: 'Within 30 Days',
      value: 'within_30_days',
    },
    {
      title: '2-3 Months',
      value: '2_3_months',
    },
    {
      title: '4-5 Months',
      value: '4_5_months',
    },
    {
      title: '6+ Months',
      value: '6+_months',
    },
  ]

  check: any
  public verifiedBadge = new FormControl(false)
  currentStep: number = 1
  totalSteps: number = 3
  public selectedOptions: { [key: string]: string } = {}
  showMore: boolean = false
  notSubmitted: boolean = false
  @ViewChild('stepper') private myStepper?: MatStepper

  toggleShowMore() {
    this.showMore = !this.showMore
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

  constructor(private service: LeadgenerationService) {
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
    console.log(this.selectedOptions, 'lll')
  }

  goBack(stepper: MatStepper) {
    stepper.previous()
  }

  goForward(stepper: MatStepper) {
    stepper.next()
  }

  isStepCompleted(step: string): boolean {
    // Implement the logic to check if the step is completed
    return !!this.selectedOptions[step]
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

  submitLead() {
    console.log(this.selectedOptions, 'options')
    this.service.CreateLead(this.selectedOptions).subscribe({
      next: () => {},
      error: () => {},
    })
  }

  ngAfterViewInit() {
    this.service.GetLeads().subscribe({ next: () => {} })
  }
}
