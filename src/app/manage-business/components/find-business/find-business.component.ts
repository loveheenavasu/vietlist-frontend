import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-find-business',
  standalone: true,
  imports: [MatSelectModule, MatIconModule, MatButtonModule, MatMenuModule, CommonModule,],
  templateUrl: './find-business.component.html',
  styleUrl: './find-business.component.scss'
})
export class FindBusinessComponent {

  public selectedLayout: string = 'list'
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

}
