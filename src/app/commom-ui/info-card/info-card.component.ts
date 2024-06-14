import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @Input() title!: string
  @Input() btnText!: string
  @Input() subTitle!: string
  @Input() cardData: any
  currentEllipsisId: string = 'slide0'

  slide(id: string) {
    console.log(id)
    this.currentEllipsisId = id
    let element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
}
