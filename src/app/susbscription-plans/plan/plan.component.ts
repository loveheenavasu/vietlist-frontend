import { AuthenticationService } from './../../shared/utils/services/authentication.service';
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
  public planId:any;
  public authToken : any
  constructor(private subscriptionService: PlansService, private sanitizer: DomSanitizer, private router: Router , private sessionService:AuthenticationService) {

  }

 
  ngOnInit() {
    this.fetchSubscriptionPlanData()

  }

  public fetchSubscriptionPlanData() {
    this.subscriptionService.subscriptionPlan().subscribe({
      next: (res:any) => {
        this.subscriptionPlainDetail = res.data
        this.planId = res.data.id
        console.log(this.subscriptionPlainDetail , "plans" , res )
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


  navigateToConfirmPayment(id:any){
    this.router.navigate(['/confirm-payment' , id ])
    // this.subscriptionService.createIntent().subscribe({
    //   next:(res)=>{
    //     console.log(res , "res")
        
    //   },
    //   error:(err)=>{

    //   }
    // })
    
  }
}
