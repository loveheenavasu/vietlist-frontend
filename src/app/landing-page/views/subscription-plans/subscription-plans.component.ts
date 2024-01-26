import { Component } from '@angular/core'
import { PlansService } from './services/plans.service';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [],
  templateUrl: './subscription-plans.component.html',
  styleUrl: './subscription-plans.component.scss',
})
export class SubscriptionPlansComponent {

  constructor(private subscriptionService: PlansService) {

  }
  ngOnInit() {
    console.log("check the subscription data")
    this.subscriptionService.subscriptionPlan().subscribe({
      next: (res) => {
        console.log("check subscription", res)
      },
      error: (err) => {
        console.log("subscription error", err)
      }
    })
  }

}
