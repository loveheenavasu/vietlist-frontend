import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { EmailMarketingServiceService } from '../../service/email-marketing-service.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
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

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.scss',
})
export class SubscribersComponent implements OnInit {
  @Input() listId = 0
  @ViewChild('secondDialog', { static: true }) secondDialog: any
  dialogRef: MatDialogRef<any> | null = null
  subscriberList: any
  public status: any = Status
  constructor(
    public service: EmailMarketingServiceService,
    private dialog: MatDialog,
    private fullPageLoaderService: FullPageLoaderService,
  ) {
    // this.getSubscribers()
  }
  subscriberForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
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
  }
}
