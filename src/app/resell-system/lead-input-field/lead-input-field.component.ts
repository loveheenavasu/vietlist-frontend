import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatStepperModule } from '@angular/material/stepper'

@Component({
  selector: 'app-lead-input-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatStepperModule,
  ],
  templateUrl: './lead-input-field.component.html',
  styleUrl: './lead-input-field.component.scss',
})
export class LeadInputFieldComponent {
  @Input() title: any
  @Input() label: any
  @Input() formControll: any
  @Input() selectedOptions: any
  @Input() key: any
  @Input() placeholder: any
  @Input() errorMsg: any
  @Input() errorMsgKey: any
  @Output() goBack = new EventEmitter<any>()
  @Output() nextStep = new EventEmitter<any>()
  @Output() updateErrorMessage = new EventEmitter<any>()

  goBackWard() {
    this.goBack.emit()
  }
  goForwardWard() {
    this.nextStep.emit()
  }

  updateMsg(msg: string) {
    this.updateErrorMessage.emit(msg)
  }
}
