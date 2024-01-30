import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PlansService } from '../service/plan.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {

  public subscriptionPlainDetail?: any
  public userAlreadyLogin: boolean = false;

  constructor(private subscriptionService: PlansService, private sanitizer: DomSanitizer, private router: Router) {

  }

 
  ngOnInit() {
    this.fetchSubscriptionPlanData()
    console.log("check the subscription data", this.fetchSubscriptionPlanData)

  }

  public fetchSubscriptionPlanData() {
    this.subscriptionService.subscriptionPlan().subscribe({
      next: (res:any) => {
        this.subscriptionPlainDetail = res.data
      },
      error: (err:any) => {
      
      }
    })
  }

  public getTrustedHTML(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  public handleSignMe() {
    this.router.navigateByUrl("/login")
  }

}
