import { MatDialog , MatDialogModule} from '@angular/material/dialog';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-coupon-list',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule,  MatIconModule,
    MatDialogModule,
    MatButtonModule,],
  templateUrl: './coupon-list.component.html',
  styleUrl: './coupon-list.component.scss'
})
export class CouponListComponent {
  @ViewChild('secondDialog', { static: true }) secondDialog!: TemplateRef<any>
  public minDate = new Date()
  public maxDate: any

  constructor(private dialog:MatDialog){}

  addCoupon() {
    this.dialog.open(this.secondDialog, {
      width: '45%',
    })
  }

}
