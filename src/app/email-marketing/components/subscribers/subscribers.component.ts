import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { EmailMarketingServiceService } from '../../service/email-marketing-service.service'
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import {
  FormBuilder,
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
  isSubscriberSelected: boolean = false
  currentSubscriber: any
  statusArray = [
    { name: 'Unsubscribe', value: 'unsubscribe' },
    { name: 'Subscribe', value: 'subscribe' },
  ]
  public status: any = Status

  constructor(
    public service: EmailMarketingServiceService,
    private dialog: MatDialog,
    private fullPageLoaderService: FullPageLoaderService,
    private formBuilder: FormBuilder,
  ) {
    // this.getSubscribers()
  }
  subscriberForm = new FormGroup({
    First_name: new FormControl('', [Validators.required]),
    Last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    List_id: new FormControl(''),
    status: new FormControl(''),
  })

  setFormFields(subscriber?: any, listId?: any) {
    console.log(listId, 'listId?.IDlistId?.IDlistId?.IDlistId?.ID')
    this.subscriberForm = this.formBuilder.group({
      First_name: new FormControl(subscriber?.name?.split(' ')[0] || '', [
        Validators.required,
      ]),
      Last_name: new FormControl(subscriber?.name?.split(' ')[1] || '', [
        Validators.required,
      ]),
      email: new FormControl(subscriber?.email || '', [Validators.required]),
      List_id: new FormControl(listId?.ID || ''),
      status: new FormControl(subscriber?.status || ''),
    })
  }

  openDialogs(subscriber?: any) {
    let listId = this.list?.find(
      (elem: any) => elem?.name === subscriber?.lists[0],
    )
    if (subscriber) {
      this.isSubscriberSelected = true
      this.currentSubscriber = subscriber
      this.setFormFields(subscriber, listId)
    } else {
      this.isSubscriberSelected = false
      this.currentSubscriber = null
      this.setFormFields()
    }

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

  updateSubscriberStatus(id: number) {
    this.fullPageLoaderService.showLoader()
    if (this.subscriberForm.value.status === 'unsubscribe') {
      if (this.subscriberForm.value.status) {
        this.service
          .updateSubscriberStatus({
            id,
            status: this.subscriberForm.value?.status,
          })
          .subscribe(() => {
            this.getAllSubscriber()
          })
      }
      this.fullPageLoaderService.hideLoader()
    } else {
      this.getAllSubscriber()
    }
  }

  deleteSubscriber(id: number) {
    this.service
      .updateSubscriberStatus({
        id,
        status: 'delete',
      })
      .subscribe(() => {
        this.getAllSubscriber()
      })
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
        (res) => {
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
          this.updateSubscriberStatus(res?.subscriber_id)
          if (this.dialogRef) {
            this.dialogRef.close()
          }
        },
        () => {
          this.isLoading = false
        },
      )
  }

  getAllSubscriber() {
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

  ngOnInit(): void {
    this.fullPageLoaderService.showLoader()
    if (this.listId) {
      this.getSubscribers()
    } else {
      this.getAllSubscriber()
    }

    this.service.GetAllList().subscribe((res) => {
      this.list = res?.data
    })
  }
}
