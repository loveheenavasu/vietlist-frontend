import {
  Component,
  Input,
  OnInit,
  Output,
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
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { EventEmitter } from '@angular/core'
import { CircularProgressbarComponent } from 'src/app/common-ui/circular-progressbar/circular-progressbar.component'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CircularProgressbarComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  @ViewChild('secondDialog', { static: true }) secondDialog: any
  dialogRef: MatDialogRef<any> | null = null
  @Output() navigateToTabs = new EventEmitter<any>()
  @Output() setListId = new EventEmitter<any>()
  @Input() lists: any
  public isNameExist: boolean = false
  public isLoading: boolean = false
  currentList: any
  isListSelected: boolean = false
  constructor(
    public service: EmailMarketingServiceService,
    private dialog: MatDialog,
    private fullPageLoaderService: FullPageLoaderService,
    private formBuilder: FormBuilder,
  ) {
    // this.getAllList()
  }

  start_details = {
    sent: 1,
    opens: 100,
    clicks: 0,
    unsubs: 0,
    bounces: 0,
  }

  // getAllList() {
  //   this.service.GetAllList().subscribe(
  //     (res) => {
  //       this.lists = res?.data
  //     },
  //     (err) => {
  //       Swal.fire({
  //         toast: true,
  //         text: 'Failed to fetch list',
  //         animation: false,
  //         icon: 'error',
  //         position: 'top-right',
  //         showConfirmButton: false,
  //         timer: 3000,
  //         timerProgressBar: true,
  //       })
  //     },
  //   )
  // }
  listForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  navigateToSubscriber(tabIndex: any, listId: any) {
    this.setListId.emit(listId)
    this.navigateToTabs.emit(tabIndex)
  }

  setFormFields(list?: any) {
    this.listForm = this.formBuilder.group({
      name: [list.name || '', Validators.required], // Use default value or empty string
      description: [list.description || ''], // Use default value or empty string
    })
  }

  openDialogs(list?: any) {
    if (list) {
      this.currentList = list
      this.isListSelected = true
      this.setFormFields(list)
    } else {
      this.currentList = null
      this.isListSelected = false
      this.setFormFields()
    }
    this.dialogRef = this.dialog.open(this.secondDialog, {
      width: '45%',
    })
    this.secondDialog.afterClosed().subscribe(() => {
      console.log('The dialog was closed')
    })
  }

  createList() {
    this.isLoading = true
    this.service.CreateList(this.listForm?.value).subscribe(
      (res) => {
        this.isLoading = false
        this.isNameExist = false
        // this.getAllList()
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

  ngOnInit(): void {}
}
