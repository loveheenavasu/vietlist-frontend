import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-find-business',
  standalone: true,
  imports: [MatSelectModule , MatIconModule , MatButtonModule , MatMenuModule],
  templateUrl: './find-business.component.html',
  styleUrl: './find-business.component.scss'
})
export class FindBusinessComponent {

}
