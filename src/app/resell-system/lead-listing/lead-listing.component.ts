import { Component } from '@angular/core'
import { LeadgenerationService } from '../resell.service'
import { FullPageLoaderService } from '@vietlist/shared'
import { Router } from '@angular/router'
import { LeadCardComponent } from '../lead-card/lead-card.component'
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
@Component({
  selector: 'app-lead-listing',
  standalone: true,
  imports: [LeadCardComponent,  MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './lead-listing.component.html',
  styleUrl: './lead-listing.component.scss',
})
export class LeadListingComponent {
  public leads: any
  public date = new FormControl('')
  
  constructor(
    public service: LeadgenerationService,
    private loader: FullPageLoaderService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.fetchLeads();
    this.date.valueChanges.subscribe((selectedDate:any) => {
      if (selectedDate) {
        const formattedDate = this.formatDate(selectedDate);
        this.fetchLeads(formattedDate);
      }
    });
    
  }


  purchaseLead(lead: any) {
    this.router.navigate(['/booking-payment'], {
      queryParams: {
        Lid: lead?.id,
      },
    })
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
      this.service.GetLeads(res).subscribe({
        next: (res) => {
          this.loader.hideLoader()
          this.leads = res?.data
        },
        error: () => {
          this.loader.hideLoader()
        },
      })
    }else{
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
}
