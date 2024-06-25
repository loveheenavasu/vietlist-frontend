import { Component } from '@angular/core'
import { LeadListingComponent } from '../lead-listing/lead-listing.component'
import { LeadgenerationService } from '../resell.service'
import { FullPageLoaderService } from '@vietlist/shared'
import { Router } from '@angular/router'
import { LeadCardComponent } from '../lead-card/lead-card.component'
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
@Component({
  selector: 'app-my-leads',
  standalone: true,
  imports: [
    LeadListingComponent,
    LeadCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './my-leads.component.html',
  styleUrl: './my-leads.component.scss',
})
export class MyLeadsComponent {
  public date = new FormControl('')
  public leads: any
  
  constructor(
    public service: LeadgenerationService,
    private loader: FullPageLoaderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Initially fetch leads without a date
    this.fetchLeads();
    this.date.valueChanges.subscribe((selectedDate:any) => {
      if (selectedDate) {
        const formattedDate = this.formatDate(selectedDate);
        this.fetchLeads(formattedDate);
      }
    });
    
  }


  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padNumber(date.getMonth() + 1);
    const day = this.padNumber(date.getDate());
    return `${year}-${month}-${day}`;
  }


  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }



  fetchLeads(res?:any) {
    if (this.date) {
      this.loader.showLoader();
      this.service.GetLeadsByUserId(res).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.leads = res?.data || [];
        },
        error: () => {
          this.loader.hideLoader();
          // Handle error fetching leads
        }
      });
    }else{
      this.service.GetLeadsByUserId().subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.leads = res?.data || [];
        },
        error: () => {
          this.loader.hideLoader();
          // Handle error fetching leads

        }
      });
    }
  }
  
  viewLead(lead: string) {
    this.router.navigate(['/view-leads'], {
      state: { data: lead },
    })
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

  public clearFilter(){
    this.fetchLeads()
    this.date.setValue('')
  }
  
  // ngOnInit(): void {
  //   this.loader.showLoader()
  //   this.service.GetLeadsByUserId(this.date).subscribe({
  //     next: (res) => {
  //       this.loader.hideLoader()
  //       this.leads = res?.data
  //     },
  //     error: () => {
  //       this.loader.hideLoader()
  //     },
  //   })
  // }
}
