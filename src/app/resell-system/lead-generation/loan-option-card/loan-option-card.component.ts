import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatStepperModule } from '@angular/material/stepper'

@Component({
  selector: 'app-loan-option-card',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatButtonModule],
  templateUrl: './loan-option-card.component.html',
  styleUrl: './loan-option-card.component.scss',
})
export class LoanOptionCardComponent {
  @Input() steps: any
  @Input() width?: any
  @Input() isTextCard?: boolean
  @Input() title: any
  @Input() selectedOptions: any
  @Input() key: any
  @Output() selectOption = new EventEmitter<{ option: string; key: string }>()
  @Output() goBack: EventEmitter<any> = new EventEmitter()
  @Output() nextStep: EventEmitter<any> = new EventEmitter()
  @ViewChild('element') element?: ElementRef

  selectOptions(option: string, key: string) {
    this.selectOption.emit({ option, key })
    if (this.element) {
      this.element.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }
  back() {
    this.goBack.emit()
  }
  next() {
    this.nextStep.emit()
  }
}
