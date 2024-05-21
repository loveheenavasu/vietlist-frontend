import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
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
  @Output() selectOption: EventEmitter<any> = new EventEmitter()
  @Output() goBack: EventEmitter<any> = new EventEmitter()
  @Output() nextStep: EventEmitter<any> = new EventEmitter()

  selectOptions(option: string, key: string) {
    this.selectOption.emit({ option, key })
  }
  back() {
    this.goBack.emit()
  }
  next() {
    this.nextStep.emit()
  }
}
