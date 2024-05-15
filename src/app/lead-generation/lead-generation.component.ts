import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatStepperModule } from '@angular/material/stepper'

@Component({
  selector: 'app-lead-generation',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './lead-generation.component.html',
  styleUrl: './lead-generation.component.scss',
})
export class LeadGenerationComponent {
  selectedOption?: string
  public firstFormGroup: FormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  })

  currentStep: number = 1
  totalSteps: number = 3

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    })
  }

  selectOption(option: string) {
    this.selectedOption = option
    if (this.firstFormGroup) {
      this.firstFormGroup.get('firstCtrl')!.setValue(option)
    }
  }

  isStepCompleted(stepIndex: number): boolean {
    // Implement the logic to check if the step is completed
    return !!this.selectedOption
  }

  get progress(): number {
    return (this.currentStep / this.totalSteps) * 100
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }
}
