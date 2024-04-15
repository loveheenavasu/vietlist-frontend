import { Component, ViewEncapsulation } from '@angular/core'
import { TabsModule } from 'ngx-bootstrap/tabs'

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [TabsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AnalyticsComponent {}
