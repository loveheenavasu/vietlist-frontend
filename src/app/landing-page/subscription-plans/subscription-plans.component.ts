import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [],
  templateUrl: './subscription-plans.component.html',
  styleUrl: './subscription-plans.component.scss',
})
export class SubscriptionPlansComponent {
  constructor() {
    console.log('Hellow')
  }
  @HostListener('window:resize', ['$event'])
  handleKeyDown(event: Event) {
    console.log(event)
  }
}
