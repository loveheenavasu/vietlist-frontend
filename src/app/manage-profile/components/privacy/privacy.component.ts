import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [MatSelectModule , MatCheckboxModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

}
