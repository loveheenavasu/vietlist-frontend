import { CommonModule } from '@angular/common'
import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-plans.component.html',
  styleUrl: './subscription-plans.component.scss',
})
export class SubscriptionPlansComponent {
  orderValue: any
}
