import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-calculator-main',
  standalone: true,
  imports: [MatSlideToggleModule,MatRadioModule,MatSliderModule],
  templateUrl: './calculator-main.component.html',
  styleUrl: './calculator-main.component.scss'
})
export class CalculatorMainComponent {

  public incrementYear(yearElement: any) {
    const currentValue = parseInt(yearElement.textContent, 10);
    yearElement.textContent = (currentValue + 1) + " years";
  }
}
