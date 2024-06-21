import { FullPageLoaderService } from './../../shared/utils/services/loader.service'
import { Component } from '@angular/core'
import { LeadgenerationService } from '../resell.service'
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-leads-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leads-transaction-history.component.html',
  styleUrl: './leads-transaction-history.component.scss',
})
export class LeadsTransactionHistoryComponent {
  constructor(
    private service: LeadgenerationService,
    private loader: FullPageLoaderService,
  ) {}

  transactionHistory: any

  columns = [
    'Lead Id',
    'Address',
    'Country',
    'Payment Type',
    'Card Type',
    'Charge Id',
    'Location',
    'Date & Time'
  ]

  ngOnInit(): void {
    this.loader.showLoader()
    this.service.GetLeadsTransactionHistory().subscribe({
      next: (res) => {
        this.transactionHistory = res?.data
        this.loader.hideLoader()
      },
      error: () => {
        this.loader.hideLoader()
      },
    })
  }


}
