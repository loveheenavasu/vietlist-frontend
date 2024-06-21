import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-lead-card',
  standalone: true,
  imports: [],
  templateUrl: './lead-card.component.html',
  styleUrl: './lead-card.component.scss',
})
export class LeadCardComponent {
  @Input() lead: any
  @Input() actionName?: any
  @Output() leadActions = new EventEmitter()
  keyToValue: any = {
    buy_a_new_home: 'Buy a new home',
    refinance_a_home: 'Refinance a home',
    take_cash_out: 'Take cash Out',
    single_family: 'Single Family',
    multifamily: 'Multifamily',
    condominium: 'Condominium',
    manufactured: 'Manufactured',
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
 
  }

  constructor(){
    console.log(this.lead)
  }

  leadAction(id: string) {
    this.leadActions.emit(id)
  }

  extractDate(timestamp:any) {
    return timestamp.split(' ')[0]; // Splitting by space and taking the first part
}

}
