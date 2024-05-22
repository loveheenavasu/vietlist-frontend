import { Component } from '@angular/core'
import { LeadgenerationService } from '../resell.service'
@Component({
  selector: 'app-lead-listing',
  standalone: true,
  imports: [],
  templateUrl: './lead-listing.component.html',
  styleUrl: './lead-listing.component.scss',
})
export class LeadListingComponent {
  constructor(public service: LeadgenerationService) {}

  ngOnInit(): void {
    this.service.GetLeads().subscribe({
      next: (res) => {
        console.log(res)
      },
    })
  }
}
