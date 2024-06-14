import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core'

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @Input() title: string = 'Discover Elite Business Categories!'
  @Input() btnText: string = 'List your Business'
  @Input() subTitle: string =
    'Navigate the Spectrum of Opportunities: Dive into our diverse business categories to find precisely what you’re seeking, all under the trustedumbrella of Vietlist.biz.'
  @Input() cardData: any = Array.apply(null, Array(8))
}
