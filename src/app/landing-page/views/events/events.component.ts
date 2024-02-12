import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  @Input() homePageData?: any
  public eventContent?: any
  constructor() { }

  ngOnInit() {
    this.eventContent = this.homePageData
  }
}
