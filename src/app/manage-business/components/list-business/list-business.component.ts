import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
@Component({
  selector: 'app-list-business',
  standalone: true,
  imports: [MatStepperModule,MatFormFieldModule,MatCardModule,MatRadioModule , MatSelectModule],
  templateUrl: './list-business.component.html',
  styleUrl: './list-business.component.scss'
})
export class ListBusinessComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;

  constructor(private _formBuilder: FormBuilder) {}
}
