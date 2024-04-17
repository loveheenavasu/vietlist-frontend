import { LoaderComponent } from 'src/app/common-ui';
import { ViewCouponComponent } from './../view-coupon/view-coupon.component'
import { FullPageLoaderService } from './../../../../shared/utils/services/loader.service'
import { MatSelectModule } from '@angular/material/select'
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { CouponService } from '../service/coupon.service'
import Swal from 'sweetalert2'
import { NgxPaginationModule } from 'ngx-pagination'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-coupon-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    DatePipe,
    NgxPaginationModule,
    LoaderComponent
  ],
  templateUrl: './coupon-list.component.html',
  styleUrl: './coupon-list.component.scss',
})
export class CouponListComponent {
  @ViewChild('secondDialog', { static: true }) secondDialog!: TemplateRef<any>
  public minDate = new Date()
  public maxDate: any
  public couponForm: FormGroup
  public couponsArr: any[] = []
  public dialogRef!: MatDialogRef<any>
  public dialogData: any
  public postPerPage: number = 6
  public currentPage: number = 1
  public isPaginationClick: boolean = false
  public isPaginationVisible: boolean = false
  public totalCount: number = 0
  public totalPages: number = 0
  public isLoading: boolean = false

  constructor(
    private dialog: MatDialog,
    private couponService: CouponService,
    private fb: FormBuilder,
    private fullpageloaderservice: FullPageLoaderService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.couponForm = this.fb.group({
      coupon_code: ['', Validators.required],
      coupon_title: ['', Validators.required],
      coupon_desc: ['', Validators.required],
      type: ['', Validators.required],
      coupon_value: ['', Validators.required],
      expiry_date: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getCoupons()
  }

  screensize: any = '35%'
  dialogWidth: any
  height: any
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event)
    this.screensize = event.target.innerWidth
  }

  
  addCoupon() {
    this.couponForm.reset();
    this.dialogData = null;
    this.dialogData = '';  
    this.dialogRef = this.dialog.open(this.secondDialog, {
      width: '45%',
      height: 'auto',
    });
  }
  

  public createCoupon() {
    this.isLoading = true
    if (this.dialogData) {
      const body = {
        id: this.dialogData.id, // Include the id in the body
        coupon_code: this.couponForm.get('coupon_code')?.value,
        coupon_title: this.couponForm.get('coupon_title')?.value,
        coupon_desc: this.couponForm.get('coupon_desc')?.value,
        type: this.couponForm.get('type')?.value,
        coupon_value: this.couponForm.get('coupon_value')?.value,
        expiry_date: this.couponForm.get('expiry_date')?.value,
      }

      this.couponService.updateCoupon(body).subscribe({
        next: (res) => {
          Swal.fire({
            toast: true,
            text: res.message,
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          this.isLoading = false
          this.getCoupons()
          this.dialogRef.close()
        },
      })
    } else {
      this.couponService.createCoupon(this.couponForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            toast: true,
            text: res.message,
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          this.isLoading = false
          this.getCoupons()
          this.dialogRef.close()
        },
        error: (err) => {},
      })
    }
  }

  public getCoupons() {
    this.fullpageloaderservice.showLoader()
    this.couponService.getCoupon(this.postPerPage, this.currentPage).subscribe({
      next: (res) => {
        this.couponsArr = res.data
        this.totalCount = res.total_count
        this.fullpageloaderservice.hideLoader()
      },
      error: (err) => {
        this.fullpageloaderservice.hideLoader()
      },
    })
  }

  public delete(id: any) {
    Swal.fire({
      title: 'Do you really want to delete your coupon?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.couponService.deleteCoupon(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              toast: true,
              text: res.message,
              animation: false,
              icon: 'success',
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
            this.getCoupons()
          },
        })
      }
    })
  }

  public edit(key: any) {
    this.dialogData = key
    if (this.dialogData) {
      this.couponForm.patchValue({
        coupon_code: this.dialogData.coupon_code,
        coupon_title: this.dialogData.coupon_title,
        coupon_desc: this.dialogData.coupon_desc,
        type: this.dialogData.type,
        coupon_value: this.dialogData.coupon_value,
        expiry_date: new Date(this.dialogData.expiry_date),
      })
    }
    console.log(this.dialogData, 'dialogdata')
    this.dialogRef = this.dialog.open(this.secondDialog, {
      width: this.dialogWidth,
    })
  }

  handlePageChange(event: number): void {
    this.currentPage = event
    this.getCoupons()
  }

  public view(key: any) {
    this.dialog.open(ViewCouponComponent, {
      data: key,
    })
  }


}
