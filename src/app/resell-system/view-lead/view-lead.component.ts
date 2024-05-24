import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-view-lead',
  standalone: true,
  imports: [],
  templateUrl: './view-lead.component.html',
  styleUrl: './view-lead.component.scss',
})
export class ViewLeadComponent {
  data: any

  allKeys = [
    {
      key: 'home_loan_purpose',
      title: 'Home loan purpose',
    },
    {
      key: 'home_description',
      title: 'Home description',
    },
    {
      key: 'property_use',
      title: 'Property use',
    },
    {
      key: 'reason_to_refinance',
      title: 'Reason to refinance',
    },
    {
      key: 'estimated_home_value',
      title: 'Estimated home value',
    },
    {
      key: 'mortgage_balance',
      title: 'Mortgage balance',
    },
    {
      key: '2nd_mortgage',
      title: 'Second mortgage',
    },
    {
      key: 'cash_borrow',
      title: 'Additional cash borrow',
    },
    {
      key: 'expected_home_purchase_date',
      title: 'Expected home purchase date',
    },
    {
      key: 'first_time_homebuyer',
      title: 'First time ome buyer',
    },
    {
      key: 'military_service_status',
      title: 'Military service status',
    },
    {
      key: 'real_estate_agent_engagement',
      title: 'Working with real-state agent',
    },
    {
      key: 'purchase_price',
      title: 'Purchase Price',
    },
    {
      key: 'estimated_down_payment',
      title: 'Estimated down payment',
    },
    {
      key: 'employment_status',
      title: 'Employment status',
    },
    {
      key: 'employer_benefits',
      title: 'Employer benefits',
    },
    {
      key: 'your_credit_profile',
      title: 'Credit Profile',
    },
    {
      key: 'bankruptcy_status',
      title: 'Bankruptcy status',
    },
    {
      key: 'down_payment_assistance',
      title: 'Assistance in down payment',
    },
    {
      key: 'home_buying_process',
      title: 'Home buying process',
    },
  ]

  keyToValue: any = {
    buy_a_new_home: 'Buy a new home',
    refinance_a_home: 'Refinance a home',
    take_cash_out: 'Take cash Out',
    single_family: 'Single Family',
    multifamily: 'Multifamily',
    condominium: 'Condominium',
    manufactured: 'Manufactured',
    primary_residence: 'Primary Residence',
    secondary_home: 'Secondary Home',
    investment_property: 'Investment Property',
    '5': 'Excellent',
    '4': 'Good',
    '3': 'Average',
    '2': 'Below Average',
    '1': 'Poor',
    employed: 'Employed',
    self_employed: 'Self Employed',
    retired: 'Retired',
    not_employed: 'Not Employed',
    yes: 'Yes',
    no: 'No',
    signed_purchase_agreement: 'I signed a purchase agreement',
    researching: 'Just researching',
    looking_at_homes: 'Looking at homes and listings',
    offer_pending: 'Offer Pending / Found a House',
    within_30_days: 'Within 30 Days',
    '2_3_months': '2_3 Months',
    '4_5_months': '4_5 Months',
    '6+_months': '6+ Months',
    lower_my_monthly_payment: 'Lower my monthly payments',
    pay_off_my_mortgage_faster: 'Pay off my mortgage faster',
    change_my_ARM_loan_to_Fixed: 'Change my ARM loan to fixed',
    browse_current_mortgage_rates: 'Browse current mortgages rates',
  }

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation()
    this.data = navigation?.extras?.state?.['data']
  }

  ngOnInit(): void {
    console.log(this.data)
  }
}
