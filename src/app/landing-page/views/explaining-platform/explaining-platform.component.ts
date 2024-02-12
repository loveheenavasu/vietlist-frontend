import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-explaining-platform',
  standalone: true,
  imports: [],
  templateUrl: './explaining-platform.component.html',
  styleUrl: './explaining-platform.component.scss',
})
export class ExplainingPlatformComponent {
  @Input() homePageData?: any
  public platformContent?: any

  constructor() { }

  ngOnInit() {
    this.platformContent = this.homePageData
  }
}
