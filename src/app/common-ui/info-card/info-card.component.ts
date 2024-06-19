import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
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
  @Output() cardAction = new EventEmitter()
  @Output() btnAction = new EventEmitter()
  currentEllipsisId: string = 'slide0'

  slide(id: string) {
    console.log(id)
    this.currentEllipsisId = id
    let element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  cardClick(e: any) {
    this.cardAction.emit(e)
  }
  btnClick() {
    this.btnAction.emit()
  }
}
