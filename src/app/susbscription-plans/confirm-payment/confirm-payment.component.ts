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
import { AuthenticationService, FullPageLoaderService, LocalStorageService } from '@vietlist/shared'
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment.development'
import { NgFor, NgIf } from '@angular/common'
const stripePublishKey = environment.stripe_publish_key
declare var stripe: any
declare var elements: any
@Component({
  selector: 'app-confirm-payment',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.scss',
})
export class ConfirmPaymentComponent {
  @ViewChild('cardInfo', { static: false }) cardInfo!: ElementRef
  @ViewChild('billingAddressElement', { static: true })
  billingAddressElement!: ElementRef

  public stripe: any
  public loading = false
  public confirmation: any
  public billingAddressElements: any
  public billingAddress: any
  public card: any
  cardHandler = this.onChange.bind(this)
  public error: any
  public authToken: any
  public planId: any
  public paymentIntent: any
  public paymentMethod: any
  constructor(
    private stripeService: AngularStripeService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private sessionService: AuthenticationService,
    private subscriptionService: PlansService,
    private loaderService: FullPageLoaderService,
    public router:Router,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.planId = params['id']
    })
    this.authToken = this.sessionService.getAuthToken()
    if (this.authToken) {
      this.getPaymentIntent()
    }
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
        this.card = elements.create('card' , {hidePostalCode: true,})
        this.card.mount(this.cardInfo.nativeElement)
        const billingAddressOptions = {
          classes: {
            base: 'stripe-address-element',
          },
          placeholder: 'Enter your billing address',
          // Set mode to 'billing' to collect billing address
          mode: 'billing',
        }
        this.billingAddressElements = elements.create(
          'address',
          billingAddressOptions,
        )

        this.billingAddressElements.mount(
          this.billingAddressElement.nativeElement,
        )
        this.billingAddressElements.on('change', (event: any) => {
          this.billingAddress = event.value
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
        console.log(this.paymentIntent , "this.payemnetintent")
      },
      error: (err: any) => {},
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

 
  // async onSubmit(form: NgForm) {
  //   const { paymentMethod, error } = await this.stripe.confirmCardSetup(this.paymentIntent , {
  //     payment_method: {
  //       card:this.card
  //     },
      
  //   })

  //   if (error) {
  //     Swal.fire({
  //       toast: true,
  //       text: error.error.message,
  //       animation: false,
  //       icon: 'error',
  //       position: 'top-right',
  //       showConfirmButton: false,
  //       timer: 3000,
  //       timerProgressBar: true,
  //     })
  //     console.log('Error:', error)
  //   } else {
  //     console.log('Success!', paymentMethod)
  //     // Access billing details
  //     this.paymentMethod = paymentMethod.payment_method
  //     // const billingDetails = paymentMethod.billing_details
  //     // console.log('Billing Details:', billingDetails)
  //     this.confirmSubscription()
  //   }
  // }

  async onSubmit(form: NgForm) {
    // Assuming you have a card element, if not, adapt accordingly
    const { setupIntent, error } = await this.stripe.confirmCardSetup(this.paymentIntent, {
      payment_method: {
        card: this.card,
      },
    });

    if (error) {
      console.error(error.message);
    } else {
      this.paymentMethod = setupIntent
      if(this.paymentMethod){
        this.confirmSubscription()
      }
      console.log('SetupIntent confirmed:', setupIntent);
      // Handle success, e.g., redirect to a success page
    }
  }



  public confirmSubscription() {
    const body = {
      level_id: this.planId,
      "pm_data": {
        id: this.paymentMethod.payment_method,
        billing_details: this.billingAddress
      }
    }
    this.subscriptionService.confirmSubscription(body).subscribe({
      next: (res) => {
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
        if(res.status == "active"){
          this.localStorageService.saveData("userStatus" , "true")
        }
        this.router.navigateByUrl('/manage-profile')
      },
    })
  }
}
