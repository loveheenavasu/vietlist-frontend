import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { TextHelperService } from 'src/app/shared/utils/services/textHelper.service'

@Component({
  selector: 'app-insaurance-agent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insaurance-agent.component.html',
  styleUrl: './insaurance-agent.component.scss',
})
export class InsauranceAgentComponent {
  constructor(public textHelper: TextHelperService) {}
  agengtDecs =
    '  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsumsuspendisse ultrices gravida. Risus commodo viverra maecenas accumsanlacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsumsuspendisse ultrices gravida. Risus commodo viverra maecenas accumsanlacus vel facilisis.'
  arr = [1, 2, 3, 4]
}
