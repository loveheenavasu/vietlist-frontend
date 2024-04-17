import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, Input } from '@angular/core'

@Component({
  selector: 'app-circular-progressbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circular-progressbar.component.html',
  styleUrl: './circular-progressbar.component.scss',
})
export class CircularProgressbarComponent implements AfterViewInit {
  @Input() percentage = 0
  @Input() title = ''

  constructor() {}

  setProgress(percent: number) {
    const circle = document.querySelector('.circle') as HTMLElement
    const progress = document.getElementById('progress') as HTMLElement

    // Calculate the angle based on percentage
    const angle = (percent / 100) * 360

    // Set the clip-path to show the progress
    circle.style.clipPath = `inset(0% ${100 - percent}% 0% 0%)`

    // Update the progress text
    progress.textContent = percent + '%'
  }

  ngAfterViewInit(): void {
    this.setProgress(this.percentage)
  }

  getCircleStyles(): string {
    return `--value: ${this.percentage}`
  }
}
