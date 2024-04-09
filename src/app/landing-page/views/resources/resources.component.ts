import { HomepageService } from './../service/homepage.service'
import { DatePipe, NgClass, NgIf } from '@angular/common'
import { ChangeDetectorRef, Component } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { Router } from '@angular/router'
import { FullPageLoaderService} from '@vietlist/shared'
import { NgxPaginationModule } from 'ngx-pagination'
import { Subscription } from 'rxjs'
import { LoaderComponent } from 'src/app/common-ui'
import { AutocompleteComponent } from 'src/app/shared/utils/googleaddress'

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
  public resourceArr2:any[]=[]
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
  public isWebinarView:boolean = false
  constructor(
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private homeservice: HomepageService,
    private cdr:ChangeDetectorRef
  ) {
    this.getResourcesData(this.activeTab)
  }

  ngOnInit() {
    this.getResourcesData(this.activeTab)
    this.cdr.detectChanges()
  }

  ngAfterViewInit(){
    this.getResourcesData(this.activeTab)
  }

  public handleLayout(layout: string) {
    this.selectedLayout = layout
  }

  public gotToEventDetails(id: any, isGlobal: any) {
    this.router.navigate(['/event-details', id], {
      queryParams: { isGlobal: isGlobal },
    })
  }

 public onTabClick(tab: any) {
    this.activeTab = tab 
    this.isPaginationClick = false
    this.currentPage = 1
    this.selectedLayout = 'grid'
    this.cdr.detectChanges()
    if(this.activeTab == 'webinar'){
      this.isWebinarView = true
      this.getWebinarData()
    } else {
      this.isWebinarView = false
      this.getResourcesData(this.activeTab)
    }
  }

 public getResourcesData(tab:any): void {
    this.fullPageLoaderService.showLoader()
    this.homeservice
      .getResources(
        this.postPerPage,
        this.currentPage,
       tab
      )
      .subscribe({
        next: (res: any) => {
          this.fullPageLoaderService.hideLoader()
          this.resourceArr = res.data
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
          this.getResourcesData(this.activeTab);
          this.cdr.detectChanges()
        } 
      }


      public getWebinarData(){
        this.fullPageLoaderService.showLoader()
        this.homeservice
          .getResources(
            this.postPerPage,
            this.currentPage,
            this.activeTab
          )
          .subscribe({
            next: (res: any) => {
              this.fullPageLoaderService.hideLoader()
              this.resourceArr2 = res.data
              console.log(this.resourceArr , "resourceArr")
              this.totalCount = res.total_count
            },
            error: (err: any) => {
              this.fullPageLoaderService.hideLoader()
            },
          })
      }

  }

