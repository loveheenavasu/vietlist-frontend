import { TitleCasePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-view-coupon',
  standalone: true,
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.scss'],
  imports:[MatDialogModule , TitleCasePipe]

})
export class ViewCouponComponent {
  public couponData : any

  constructor(
    public matDialogRef: MatDialogRef<ViewCouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.couponData = data
    console.log(data , "DATA")
  }

  ngOnInit() {
    this.updateSize();
  }

  public close() {
    this.matDialogRef.close();
  }

  public updateSize() {
    this.matDialogRef.updateSize('600px', '450px');
  }

}
