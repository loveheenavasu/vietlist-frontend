import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, ViewChild } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
  StripeService,
} from 'ngx-stripe'
import {
  Appearance,
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js'
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [
    StripePaymentElementComponent,
    StripeElementsDirective,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './subscription-plans.component.html',
  styleUrl: './subscription-plans.component.scss',
})
export class SubscriptionPlansComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent

  private readonly _fb = inject(UntypedFormBuilder)

  paymentElementForm = this._fb.group({
    name: ['John doe', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]],
  })

  appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#673ab7',
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
  }

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false,
    },
  }

  stripe = injectStripe(
    'pk_test_51OcjKcSDTxn5PnSnUkGsFY6f3eDEpOoHEoxCrUO5srUQucFKEDoHmEP0tOzbH1kDHaVjkIuB8suYLHXmv8kiqWGR00Tw3CJyHB',
  )
  paying = signal(false)

  public http = inject(HttpClient);
  
  public stripeService = inject(StripeService);

  constructor(private authService:AuthService){
  }
  ngOnInit() {
    // this.https://vietlist.biz/wp-json/vietlist/v1/subscription
    //   .createPaymentIntent({
    //     amount: this.paymentElementForm.get('amount').value,
    //     currency: 'usd'
    //   })
    //   .subscribe(pi => {
    //     this.elementsOptions.clientSecret = pi.client_secret as string;
    //   });
  }
paymentIntent:any
isPayment:boolean = false
  pay2(){
    this.authService.createPayment({
      user_id:118
    }).subscribe((res:any)=>{
      this.paymentIntent = res.client_secret
      if(this.paymentIntent){
        this.isPayment = true
      }
      console.log(res , "Payment Response")
    })
  }
  pay() {
    if (this.paying() || this.paymentElementForm.invalid) return
    this.paying.set(true)

    const { name, email, address, zipcode, city } =
      this.paymentElementForm.getRawValue()

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paying.set(false)
        console.log('Result', result)
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message })
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true })
          }
        }
      })
  }

  checkout() {
    // Check the server.js tab to see an example implementation
    this.http.post('http://localhost:4242/create-checkout-session', {})
      .pipe(
        switchMap((session: any) => {
          return this.stripeService.redirectToCheckout({ sessionId: session.id })
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          alert(result.error.message);
        }
      });
  }
}
