import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator-main',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './calculator-main.component.html',
  styleUrl: './calculator-main.component.scss'
})
export class CalculatorMainComponent {

}
