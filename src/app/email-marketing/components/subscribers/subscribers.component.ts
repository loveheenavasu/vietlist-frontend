import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { EmailMarketingServiceService } from '../../service/email-marketing-service.service'
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { status as Status } from '../../helper'
import { FullPageLoaderService } from '@vietlist/shared'
import { MatSelectModule } from '@angular/material/select'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.scss',
})
export class SubscribersComponent implements OnInit {
  @Input() listId = 0
  @ViewChild('secondDialog', { static: true }) secondDialog: any
  dialogRef: MatDialogRef<any> | null = null
  subscriberList: any
  list: any
  isLoading: any
  public status: any = Status
  constructor(
    public service: EmailMarketingServiceService,
    private dialog: MatDialog,
    private fullPageLoaderService: FullPageLoaderService,
  ) {
    // this.getSubscribers()
  }
  subscriberForm = new FormGroup({
    First_name: new FormControl('', [Validators.required]),
    Last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    List_id: new FormControl(''),
  })

  openDialogs() {
    this.dialogRef = this.dialog.open(this.secondDialog, {
      width: '45%',
    })
  }

  getSubscribers() {
    this.service.getListSubscribers(this.listId).subscribe(
      (res) => {
        this.subscriberList = res?.data
        this.fullPageLoaderService.hideLoader()
      },
      (err) => {
        this.fullPageLoaderService.hideLoader()
      },
    )
  }

  addSubscriber() {
    this.isLoading = true
    this.service
      .addSubscriber({
        ...(this.listId
          ? { ...this.subscriberForm.value, List_id: this.listId }
          : this.subscriberForm.value),
      })
      .subscribe(
        () => {
          this.isLoading = false
          Swal.fire({
            toast: true,
            text: 'Subscriber added successfully',
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          if (this.dialogRef) {
            this.dialogRef.close()
          }
        },
        () => {
          this.isLoading = false
        },
      )
  }

  ngOnInit(): void {
    this.fullPageLoaderService.showLoader()
    if (this.listId) {
      this.getSubscribers()
    } else {
      this.service.getAllSubscribers().subscribe(
        (res) => {
          this.fullPageLoaderService.hideLoader()
          this.subscriberList = res?.data
        },
        () => {
          this.fullPageLoaderService.hideLoader()
        },
      )
    }

    this.service.GetAllList().subscribe((res) => {
      this.list = res?.data
    })
  }
}
