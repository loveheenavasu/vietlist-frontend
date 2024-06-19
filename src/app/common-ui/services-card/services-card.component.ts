import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-services-card',
  standalone: true,
  imports: [],
  templateUrl: './services-card.component.html',
  styleUrl: './services-card.component.scss',
})
export class ServicesCardComponent {
  @Input('bgImg') bgImg: string = '/assets/image/legal.png'
  @Input('title') title: string = 'Legal Services'
  @Input('subTitle') subTitle: string =
    'Navigate the Spectrum of Opportunities: Dive into our diverse business categories to find precisely what you’re seeking, all under the trusted umbrella of Vietlist.biz.'
}
