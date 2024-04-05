import { PlansService } from '../service/plan.service'
import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core'
import { NgForm, FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
import {
  AuthenticationService,
  FullPageLoaderService,
  UserStatus,
} from '@vietlist/shared'
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment.development'
import { CommonModule, NgFor, NgIf } from '@angular/common'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { EventService } from 'src/app/manage-event/service/event.service'

@Component({
  selector: 'app-confirm-payment',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.scss',
})
export class ConfirmPaymentComponent {
  @ViewChild('cardInfo', { static: false }) cardInfo!: ElementRef
  @ViewChild('billingAddressElement', { static: true })
  public billingAddressElement!: ElementRef
  public stripe: any
  public loading = false
  public confirmation: any
  public billingAddressElements: any
  public billingAddress: any
  public card: any
  public bookingPaymentIntent: any
  cardHandler = this.onChange.bind(this)
  public error: any
  public authToken: any
  public planId: any
  public paymentIntent: any
  public paymentMethod: any
  public billingDetails: any
  public billingAddressValid: boolean = false; // Add this line
  public bookingData: any
  public eventPrice: any
  public eventIds: any
  public numberOfBooking: any

  constructor(
    private stripeService: AngularStripeService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private sessionService: AuthenticationService,
    private subscriptionService: PlansService,
    private loaderService: FullPageLoaderService,
    public router: Router,
    private profileServie: ProfileService,
    private eventService: EventService,
    private _activatedRoute: ActivatedRoute

  ) {
    this.route.queryParams.subscribe(params => {
      this.eventIds = params
      console.log(this.eventIds , "eventIds")
    });
    this._activatedRoute.params.subscribe((res) => {
      this.createBookingIntent()
    })

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.planId = params['id']
      console.log(this.planId , "PlanIdd")
      this.eventPrice = params['price']
    })
    this.authToken = this.sessionService.getAuthToken()
    if (this.authToken) {
      this.getPaymentIntent()
    }
    this.getBillingDetails()
  }
  


  getBillingDetails() {
    // this.fullPageLoader.showLoader()
    this.profileServie.getBillingAddress().subscribe({
      next: (res: any) => {
        // this.fullPageLoader.hideLoader()
        this.billingDetails = res.data
        console.log(this.billingDetails, 'billingDetailsbillingDetails')
        if (res) {
          this.stripeService
            .setPublishableKey(environment.stripe_publish_key)
            .then((stripe) => {
              this.stripe = stripe
              const appearance = {
                theme: 'flat',
                variables: { colorPrimaryText: 'red' },
              }
              const elements = stripe.elements({ appearance })
              this.card = elements.create('card', { hidePostalCode: true })
              this.card.mount(this.cardInfo.nativeElement)
              const billingAddressOptions = {
                classes: {
                  base: 'stripe-address-element',
                },
                placeholder: 'Enter your billing address',
                mode: 'billing',
              }
              // this.billingAddressElements = elements.create(
              //   'address',
              //   billingAddressOptions,
              this.billingAddressElements = elements.create("address", {
                mode: "shipping",

                defaultValues: {
                  name: this.billingDetails?.pmpro_bfirstname,
                  address: {
                    line1: this.billingDetails?.pmpro_baddress1,
                    line2: this.billingDetails?.pmpro_baddress2,
                    city: this.billingDetails?.pmpro_bcity,
                    state: this.billingDetails?.pmpro_bstate,
                    country: this.billingDetails?.pmpro_bcountry,
                    postal_code: this.billingDetails?.pmpro_bzipcode,
                  },
                  // address: {
                  //   line1: this.billingDetails?.pmpro_baddress1,
                  //   line2: this.billingDetails?.pmpro_baddress2,
                  //   city: this.billingDetails?.pmpro_bcity,
                  //   state: this.billingDetails?.pmpro_bstate,
                  //   postal_code: this.billingAddress?.pmpro_bzipcode,
                  //   country: this.billingAddress?.pmpro_bcountry,
                  // },
                },
              });
              this.billingAddressElements.mount('#billing-address-element');
              this.billingAddressElements.mount(
                this.billingAddressElement.nativeElement,
              )
              this.billingAddressElements.on('change', (event: any) => {
                this.billingAddress = event.value
                this.billingAddressValid = !!event.complete;
              })
              this.stripe = stripe
            })

        }
      }
    })

  }


  ngAfterViewInit() {
    this.stripeService
      .setPublishableKey(environment.stripe_publish_key)
      .then((stripe) => {
        this.stripe = stripe
        const appearance = {
          theme: 'flat',
          variables: { colorPrimaryText: 'red' },
        }
        const elements = stripe.elements({ appearance })
        this.card = elements.create('card', { hidePostalCode: true })
        this.card.mount(this.cardInfo.nativeElement)
        const billingAddressOptions = {
          classes: {
            base: 'stripe-address-element',
          },
          placeholder: 'Enter your billing address',
          mode: 'billing',
        }

        // this.billingAddressElements = elements.create(
        //   'address',

        //   billingAddressOptions,
        this.billingAddressElements = elements.create("address", {
          mode: "shipping",

          defaultValues: {
            name: this.billingDetails?.pmpro_bfirstname,
            address: {
              line1: this.billingDetails?.pmpro_baddress1,
              line2: this.billingDetails?.pmpro_baddress2,
              city: this.billingDetails?.pmpro_bcity,
              state: this.billingDetails?.pmpro_bstate,
              postal_code: this.billingDetails?.pmpro_bzipcode,
              country: this.billingDetails?.pmpro_bcountry
            },
            // address: {
            // line1: 'demoggfghf',
            // line2: 'ytrtyrtyrytryt',
            // city: this.billingDetails?.pmpro_bcity,
            // state: this.billingDetails?.pmpro_bstate,
            // postal_code: this.billingAddress?.pmpro_bzipcode,
            // country: this.billingAddress?.pmpro_bcountry,
            // },
          },
        });

        this.billingAddressElements.mount('#billing-address-element');



        this.billingAddressElements.mount(
          this.billingAddressElement.nativeElement,
        )
        this.billingAddressElements.on('change', (event: any) => {
          this.billingAddress = event.value
          this.billingAddressValid = !!event.complete;
        })
        this.stripe = stripe
      })


  }
  public getPaymentIntent() {
    this.loaderService.showLoader()
    this.subscriptionService.createIntent().subscribe({
      next: (res: any) => {
        this.loaderService.hideLoader()
        this.paymentIntent = res.client_secret
      },
      error: (err: any) => { },
    })
  }

  public onChange(error: any) {
    if (error) {
      this.error = error.message
    } else {
      this.error = null
    }
    this.cd.detectChanges()
  }


  async onSubmit(form: NgForm) {
    if (form.invalid || !this.billingAddressValid) {
      // Handle invalid form submission
      Swal.fire({
        toast: true,
        text: 'Please fill the Billing Address..',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      return;
    }
    const { setupIntent, error } = await this.stripe.confirmCardSetup(
      this.paymentIntent,
      {
        payment_method: {
          card: this.card,
        },
      },
    )

    if (error) {
      Swal.fire({
        toast: true,
        text: error.message,
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } else {
      this.paymentMethod = setupIntent
      if (this.paymentMethod && this.eventIds?.numberOfBooking) {
        console.log('price available')
        this.confirmBookingPayment()
      } else if (this.paymentMethod && !this.eventIds?.numberOfBooking) {
        console.log('price Not available')
        this.confirmSubscriptionPayment()
      }
    }
  }

  public confirmSubscriptionPayment() {
    this.loaderService.showLoader()
    const body = {
      level_id: this.planId,
      pm_data: {
        id: this.paymentMethod?.payment_method,
        billing_details: this.billingAddress,
      },
    }
    this.subscriptionService.confirmSubscription(body).subscribe({
      next: (res) => {
        this.loaderService.hideLoader()
        Swal.fire({
          toast: true,
          text: res.message,
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        if (res.data?.status == UserStatus.Active) {
          const status = UserStatus.Active
          this.sessionService.setSubscriptonStatus(status)
          this.router.navigateByUrl('/manage-profile')
        }
      },
    })
  }


  /************* API FOR BOOKING AN EVENT ************/

  //API TO CREATE BOOKING INTENT//
  public createBookingIntent() {

    this.eventService.createPaymentIntentForBooking().subscribe({
      next: (res: any) => {

        if (res) {
          this.bookingPaymentIntent = res?.client_secret
        }
        console.log(res, this.bookingPaymentIntent)
      },
      error: (err) => {

      }
    })
  }

  public confirmBookingPayment() {
    this.loaderService.showLoader()
    const body = {
      booking_id: this.eventIds?.bookingId,
      event_id: this.eventIds?.eventId,
      number_of_booking: parseInt(this.eventIds?.numberOfBooking),
      pm_data: {
        id: this.paymentMethod?.payment_method,
        billing_details: this.billingAddress,
      },
    }
    this.eventService.stripebookingPayment(body).subscribe({
      next: (res: any) => {
        Swal.fire({
          toast: true,
          text: res.message,
          animation: false,
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        this.router.navigate(['/thank-you'])
        this.loaderService.hideLoader()
      },
      error: (err) => {
        this.loaderService.hideLoader()
      }
    })
  }
}
