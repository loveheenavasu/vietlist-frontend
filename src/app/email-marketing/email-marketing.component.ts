import { Component, ViewEncapsulation } from '@angular/core'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { ListComponent } from './components/list/list.component'

@Component({
  selector: 'app-email-marketing',
  standalone: true,
  imports: [TabsModule, ListComponent],
  templateUrl: './email-marketing.component.html',
  styleUrl: './email-marketing.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EmailMarketingComponent {}
