import { Component } from '@angular/core'
import { PlansService } from './services/plans.service';
import { NgFor } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [NgFor],
  templateUrl: './subscription-plans.component.html',
  styleUrl: './subscription-plans.component.scss',
})
export class SubscriptionPlansComponent {

  subscriptionPlainDeatil?: any
  userAlreadyLogin: boolean = false;

  constructor(private subscriptionService: PlansService, private sanitizer: DomSanitizer, private router: Router) {

  }
  ngOnInit() {
    this.fetchSubscriptionPlanData()
    console.log("check the subscription data", this.fetchSubscriptionPlanData)

  }

  public fetchSubscriptionPlanData() {
    this.subscriptionService.subscriptionPlan().subscribe({
      next: (res) => {
        this.subscriptionPlainDeatil = res.data
        console.log("check subscription", this.subscriptionPlainDeatil)
      },
      error: (err) => {
        console.log("subscription error", err)
      }
    })
  }

  public getTrustedHTML(htmlString: string): SafeHtml {
    // htmlString = htmlString.replace('<ul>', '<li><i class="fa fa-check" aria-hidden="true"></i>');
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  public handleSignMe() {
    this.router.navigateByUrl("/login")

  }

}
