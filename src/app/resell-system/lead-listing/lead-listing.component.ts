import { Component } from '@angular/core'
import { LeadgenerationService } from '../resell.service'
import { FullPageLoaderService } from '@vietlist/shared'
import { Router } from '@angular/router'
import { LeadCardComponent } from '../lead-card/lead-card.component'
@Component({
  selector: 'app-lead-listing',
  standalone: true,
  imports: [LeadCardComponent],
  templateUrl: './lead-listing.component.html',
  styleUrl: './lead-listing.component.scss',
})
export class LeadListingComponent {
  constructor(
    public service: LeadgenerationService,
    private loader: FullPageLoaderService,
    private router: Router,
  ) {}
  leads: any
  purchaseLead(lead: any) {
    // lid is Lead id
    this.router.navigate(['/booking-payment'], {
      queryParams: {
        Lid: lead?.id,
      },
    })
  }

  ngOnInit(): void {
    this.loader.showLoader()
    this.service.GetLeads().subscribe({
      next: (res) => {
        this.loader.hideLoader()
        this.leads = res?.data
      },
      error: () => {
        this.loader.hideLoader()
      },
    })
  }
}
