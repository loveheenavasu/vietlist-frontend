import { Component } from '@angular/core'
import { LeadListingComponent } from '../lead-listing/lead-listing.component'
import { LeadgenerationService } from '../resell.service'
import { FullPageLoaderService } from '@vietlist/shared'
import { Router } from '@angular/router'
import { LeadCardComponent } from '../lead-card/lead-card.component'
@Component({
  selector: 'app-my-leads',
  standalone: true,
  imports: [LeadListingComponent, LeadCardComponent],
  templateUrl: './my-leads.component.html',
  styleUrl: './my-leads.component.scss',
})
export class MyLeadsComponent {
  constructor(
    public service: LeadgenerationService,
    private loader: FullPageLoaderService,
    private router: Router,
  ) {}
  leads: any
  purchaseLead(id: string) {
    // lid is Lead id
    // this.router.navigate(['/booking-payment'], {
    //   queryParams: {
    //     Lid: id,
    //   },
    // })
  }

  downloadLeadPdf(lead: any) {
    const { lead_pdf, id } = lead
    if (lead_pdf) {
      window.open(lead_pdf)
    } else {
      this.loader.showLoader()
      this.service.GetLeadPdfDownloadUrl(id).subscribe({
        next: (res) => {
          console.log(res)
          if (res) {
            window.open(res?.pdf_url)
          }
          this.loader.hideLoader()
        },
        error: () => {
          this.loader.hideLoader()
        },
      })
    }
  }
  navigateToListing() {
    this.router.navigateByUrl('/lead-listing')
  }
  ngOnInit(): void {
    this.loader.showLoader()
    this.service.GetLeadsByUserId().subscribe({
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
