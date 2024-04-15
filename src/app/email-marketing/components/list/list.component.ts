import {
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { EmailMarketingServiceService } from '../../service/email-marketing-service.service'
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common'
import { FullPageLoaderService } from '@vietlist/shared'

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

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent {
  @ViewChild('secondDialog', { static: true }) secondDialog: any
  dialogRef: MatDialogRef<any> | null = null
  public isNameExist: boolean = false
  public isLoading: boolean = false
  lists: any
  constructor(
    public service: EmailMarketingServiceService,
    private dialog: MatDialog,
    private fullPageLoaderService: FullPageLoaderService,
  ) {
    this.getAllList()
  }

  getAllList() {
    this.service.GetAllList().subscribe(
      (res) => {
        this.lists = res?.data
      },
      (err) => {
        Swal.fire({
          toast: true,
          text: 'Failed to fetch list',
          animation: false,
          icon: 'error',
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      },
    )
  }
  listForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })

  date(unixTimestamp: any) {
    const date = new Date(parseInt(unixTimestamp))

    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const amPm = hours >= 12 ? 'pm' : 'am'
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    const formattedDate = `${month} ${day}, ${year} ${formattedHours}:${formattedMinutes} ${amPm}`
    return formattedDate
  }

  openDialogs() {
    this.dialogRef = this.dialog.open(this.secondDialog, {
      width: '45%',
      //panelClass: 'myDialogStyle'
    })
    this.secondDialog.afterClosed().subscribe(() => {
      console.log('The dialog was closed')
    })
  }

  createList() {
    this.isLoading = true
    this.service.CreateList(this.listForm.value).subscribe(
      (res) => {
        this.isLoading = false
        this.isNameExist = false
        this.getAllList()
        Swal.fire({
          toast: true,
          text: 'List Created Successfully!',
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
      (err) => {
        this.isLoading = false
        this.isNameExist = true
        console.log(err, 'err')
      },
    )
  }

  closeDialog(dialog: any) {
    dialog.close()
  }
}
