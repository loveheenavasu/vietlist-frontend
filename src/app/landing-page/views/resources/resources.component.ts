import { MatDialog } from '@angular/material/dialog'
import { HomepageService } from './../service/homepage.service'
import { DatePipe, NgClass, NgIf } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { Router } from '@angular/router'
import { FullPageLoaderService } from '@vietlist/shared'
import { NgxPaginationModule } from 'ngx-pagination'
import { Subscription } from 'rxjs'
import { LoaderComponent } from 'src/app/common-ui'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'
import { WebinarRegistrationComponent } from '../webinar-registration/webinar-registration.component'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    AutocompleteComponent,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    MatSelectModule,
    NgxPaginationModule,
    NgIf,
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
})
export class ResourcesComponent {
  public datePipe = new DatePipe('en-US')
  public selectedLayout: string = 'grid'
  public resourceArr: any[] = []
  public resourceArr2: any[] = []
  public subscription!: Subscription
  public isLoader: boolean = false
  public postPerPage: number = 6
  public currentPage: number = 1
  public isPaginationClick: boolean = false
  public isPaginationVisible: boolean = false
  public totalCount: number = 0
  public totalPages: number = 0
  public resource_category = new FormControl('')
  public activeTab: any = 'articles'
  public isWebinarView: boolean = false
  public userDetails: any

  constructor(
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private homeservice: HomepageService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private profileService: ProfileService,
  ) {
    // this.getResourcesData(this.activeTab)
  }

  ngOnInit() {
    // this.getResourcesData(this.activeTab)
    this.cdr.detectChanges()
  }

  ngAfterViewInit() {
    this.getResourcesData(this.activeTab)
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  public gotToEventDetails(id: any) {
    if (this.activeTab !== 'e-books' || this.userDetails?.level_id === '3') {
      this.router.navigate(['resource-details', id])
    }
  }

  public onTabClick(tab: any) {
    this.resourceArr = []
    this.activeTab = tab  
    this.isPaginationClick = false
    this.currentPage = 1
    this.selectedLayout = 'grid'
    this.cdr.detectChanges()
    if (this.activeTab == 'webinar') {
      this.isWebinarView = true
      this.getWebinarData()
    } else {
      this.isWebinarView = false
      if(this.activeTab){
      this.getResourcesData(this.activeTab)
      }
    }
  }

  public getResourcesData(tab: any): void {
    this.fullPageLoaderService.showLoader()
    this.homeservice
      .getResources(this.postPerPage, this.currentPage, tab)
      .subscribe({
        next: (res: any) => {
          this.resourceArr = res.data
          if(this.resourceArr){
            this.fullPageLoaderService.hideLoader()
          }
          this.totalCount = res.total_count
        },
        error: (err: any) => {
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  public handlePageChange(event: number): void {
    this.isPaginationClick = true
    this.currentPage = event
    if (this.isPaginationClick) {
      this.getResourcesData(this.activeTab)
      this.cdr.detectChanges()
    }
  }

  public getWebinarData(): void {
    this.fullPageLoaderService.showLoader()
    this.homeservice
      .getResources(this.postPerPage, this.currentPage, this.activeTab)
      .subscribe({
        next: (res: any) => {
          this.cdr.detectChanges()
          this.fullPageLoaderService.hideLoader()
          const currentDate: any =
            this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? ''

          this.resourceArr2 = []
          res?.data.forEach((item: any) => {
            if (item.webinar_date > currentDate) {
              this.resourceArr2.push(item)
            }
          })
          this.totalCount = this.resourceArr2.length
        },
        error: (err: any) => {
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  public registrationForm(id: any) {
    const dialogRef = this.dialog.open(WebinarRegistrationComponent, {
      data: {
        resourceId: id,
      },
    })
    dialogRef.afterClosed().subscribe((res) => {
      this.cdr.detectChanges()
      this.getWebinarData()
      if (res) {
        // this.resourceArr2 = []; // Reset array before fetching new data
      }
    })
  }

  public fetchProfileDetail() {
    this.profileService.userDetails().subscribe({
      next: (res) => {
        this.userDetails = res.data?.user
      },
      error: (err: any) => {
        // this.loaderService.hideLoader()
      },
    })
  }

  openBooks(book:any) {
    if (book && book.ebook_link) {
      window.open(book.ebook_link, '_blank');
    }
  }
  
}
