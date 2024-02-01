import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatStepperModule } from '@angular/material/stepper'
import { SubscriptionFormComponent } from '../subscription-form/subscription-form.component'
import { BusinessBioComponent } from '../business-bio/business-bio.component'
import { ConsultationFormComponent } from '../consultation-form/consultation-form.component'

@Component({
  selector: 'app-list-business',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    SubscriptionFormComponent,
    BusinessBioComponent,
    ConsultationFormComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './list-business.component.html',
  styleUrl: './list-business.component.scss',
})
export class ListBusinessComponent {
  public firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  })
  public secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  })
  public isEditable = false
  public businessInfoForm!:FormGroup
  constructor(private _formBuilder: FormBuilder) {}
}
