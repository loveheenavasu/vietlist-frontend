import { PlansService } from '../service/plan.service'

import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core'
import { NgForm, FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
import { AuthenticationService } from '@vietlist/shared'
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment.development'
const stripePublishKey = environment.stripe_publish_key
declare var stripe: any
declare var elements: any
@Component({
  selector: 'app-confirm-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './confirm-payment.component.html',
  styleUrl: './confirm-payment.component.scss',
})
export class ConfirmPaymentComponent {
  @ViewChild('cardInfo', { static: false }) cardInfo!: ElementRef

  stripe: any
  loading = false
  confirmation: any

  card: any
  cardHandler = this.onChange.bind(this)
  error: any
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
      .setPublishableKey(
        stripePublishKey,
      )
      .then((stripe) => {
        this.stripe = stripe
        const elements = stripe.elements()
        this.card = elements.create('card')
        console.log(this.card, 'card')
        this.card.mount(this.cardInfo.nativeElement)
        this.card.addEventListener('change', this.cardHandler)
      })
  }

  public getPaymentIntent() {
    this.subscriptionService.createIntent().subscribe({
      next: (res: any) => {
        this.paymentIntent = res.client_secret
        console.log(this.paymentIntent , "===")
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

  async onSubmit(form: NgForm) {
    // const secret = "seti_1OeFV1DyROdF1Yteg7u9Fyad_secret_PTBsxWq7Weioz5VcGgtfNwBzYNM8ip3"
    // Assuming  you have a card element, if not, adapt accordingly

    console.log(this.card.card, "card")
    const { setupIntent, error } = await this.stripe.createPaymentMethod(
      this.paymentIntent,
      {
        payment_method: {
          card: this.card, // Replace with your card element or card details
          billing_details: {
            name:"Tanya",
            email:"test@yopmail.com",
            address: {
              line1:'XYZ',
              postal_code: '123',
              city: 'Test'
            },
          },
        },
      },
    )
    if (error) {
      console.error(error.message)
    } else {

      const paymentMethodJSON = JSON.stringify(setupIntent)
      this.paymentMethod = paymentMethodJSON
      console.log(this.paymentMethod , "pppp")
      if(this.paymentMethod){
        this.confirmSubscription()
      }
    }
  }


  public confirmSubscription(){
    const body = {
      level_id:this.planId,
      pm_data:this.paymentMethod
    }
    this.subscriptionService.confirmSubscription(body).subscribe({
      next:(res)=>{
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
      }
    })
  }
}
