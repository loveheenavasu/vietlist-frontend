import { NgClass, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { Router, RouterLink } from '@angular/router'
import { FullPageLoaderService, LocalStorageService } from '@vietlist/shared'
import { NgxPaginationModule } from 'ngx-pagination'
import { Subject, takeUntil } from 'rxjs'
import { TruncateHtmlPipe } from 'src/app/shared/utils/truncate.pipe'
import Swal from 'sweetalert2'
import { ProfileService } from '../../../service/profile.service'
import { PropertyService } from 'src/app/property-listings/property.service'

@Component({
  selector: 'app-synced-listing',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    NgIf,
    RouterLink,
    MatTooltipModule,
    NgxPaginationModule,
    TruncateHtmlPipe,
  ],
  templateUrl: './synced-listing.component.html',
  styleUrl: './synced-listing.component.scss',
})
export class SyncedListingComponent {
  public selectedLayout: string = 'grid'
  public properties: any[] = []
  public postPerPage: number = 4
  public currentPage: number = 1
  public isPaginationClick: boolean = false
  public isPaginationVisible: boolean = false
  public totalCount: number = 0
  public totalPages: number = 0
  private destroy$ = new Subject<void>()

  constructor(
    private profileService: ProfileService,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private localStorage: LocalStorageService,
    public propertyService: PropertyService,
  ) {}

  ngOnInit() {
    this.getProperties()
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }
  removeUnderScore(text: string) {
    return text?.split('_').join(' ')
  }

  getProperties() {
    this.fullPageLoaderService.showLoader()
    this.profileService
      .getMLS(this.postPerPage, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          console.log(res, 'RESPONSE')
          this.fullPageLoaderService.hideLoader()
          this.properties = res?.data
          this.totalCount = res.total_count
        },
        error: (err) => {
          this.fullPageLoaderService.hideLoader()
        },
      })
  }

  public viewProperty(Id: any) {
    this.router.navigate(['/property', Id])
  }

  public handlePageChange(event: number): void {
    this.currentPage = event
    // if(this.isPaginationClick){
    this.getProperties()
    // }
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
