import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { Component } from '@angular/core'

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [MatSelectModule, MatRadioModule],
  templateUrl: './consultation-form.component.html',
  styleUrl: './consultation-form.component.scss',
})
export class ConsultationFormComponent {}
