import { ActivatedRoute, Route, Router } from '@angular/router'
import { Component, ViewEncapsulation } from '@angular/core'
import { EventService } from '../../service/event.service'
import { CommonModule, DatePipe, NgIf, TitleCasePipe } from '@angular/common'
import { AuthenticationService, FullPageLoaderService } from '@vietlist/shared'
import { NgxStarRatingModule } from 'ngx-star-rating'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { NgxStarsModule } from 'ngx-stars'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { LoaderComponent } from 'src/app/common-ui'
import Swal from 'sweetalert2'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
// NgxStarRatingModule
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent,
    FormsModule,
    TitleCasePipe,
    NgxDropzoneModule,
    NgxStarRatingModule,
    DatePipe,
    CommonModule,
    
    NgIf
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EventDetailsComponent {
  public loader: boolean = false
  public footerPageContent?: any
  public reviewForm!: FormGroup
  public isImageUploading: boolean = false
  public files: File[] = []
  public levelOneImageArr: any[] = []
  public rating = 0
  public postId: any
  public eventDetails: any
  public map: google.maps.Map | null = null // Declare and initialize the map property
  public latitude: number = 0
  public longitude: number = 0
  public userDetails: any
  public isGlobal: any
  public isLoader: boolean = false
  public reviewsArray : any[]=[]
  public isAuthenticationCheck:any
  public isReplyFieldOpen:boolean = false
  public isReplycomFieldOpen:boolean = false
  public replyIndex: number = -1;
  public replyIndexshow :number = -1;
  public isAuthentecate!: boolean
  public slectedvalue : boolean = false
  public storValues:any

  public replyInput = new FormControl('')
  public commentId : any
  public repliesArray: any[]=[]
  /**
   * 
   * @param eventService 
   * @param _activatedRoute 
   * @param fullPageLoaderService 
   * @param router 
   * @param fb 
   * @param businessService 
   * @param profileService 
   * @param footerContent 
   * @param sessionService 
   */
  constructor(
    private eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private profileService: ProfileService,
    private footerContent: HomepageService,
    private sessionService:AuthenticationService
  ) {
    this.reviewForm = this.fb.group({
      comment_content: ['', Validators.required],
      rating: ['', Validators.required],
      comment_author: [''],
      comment_author_email: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      comment_author_url: [''],

    })
    this.sessionService.isAuthenticated$.subscribe((res: any) => {

      if (res) {
        console.log(res, 'resres is Authenticated')
        this.isAuthentecate = res
        const controlsToValidate = [
          "comment_author_email",
          "comment_author",
          "comment_author_url"
        ];

        controlsToValidate.forEach(controlName => {
          const control = this.reviewForm.get(controlName);
          if (res) {
            control?.setValidators(Validators.required);
          } else {
            control?.clearValidators();

          }
          control?.updateValueAndValidity();
        });
      }
    })

    this._activatedRoute.params.subscribe((res) => {
      this.postId = res['id']
    })
    this._activatedRoute.queryParams.subscribe((res) => {
      this.isGlobal = res['isGlobal']
      console.log(this.isGlobal, 'this.isGlobal')
    })
  
  }
   
  selcetdvalues(){
    // this.storValues ={
    //   this.
    // }

  }

  ngOnInit() {
    if (this.postId) {
      this.getEventDetails()
    }
    this.getReviews()
  }



  public goToEvent() {
    this.router.navigateByUrl('/manage-profile/manage-events')
  }

  public getEventDetails() {
    this.fullPageLoaderService.showLoader()
    this.eventService.getEventDetailsByPostId(this.postId).subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()
        this.eventDetails = res?.data[0] || 'NA'
          ; (this.latitude = Number(this.eventDetails?.latitude)),
            (this.longitude = Number(this.eventDetails?.longitude))
        console.log(res)
        this.initMap()
      },
      error: (err) => { 
        this.fullPageLoaderService.hideLoader()
      },
    })
  }

  public initMap() {
    const mapElement = document.getElementById('map')
    if (mapElement !== null) {
      console.log(this.latitude, this.eventDetails?.longitude, 'lng ;at')
      this.map = new google.maps.Map(mapElement, {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      if (this.latitude && this.longitude) {
        // Add a marker to the map
        const marker = new google.maps.Marker({
          position: {
            lat: this.latitude,
            lng: this.longitude,
          },
          map: this.map,
          title: 'Marker Title',
        })
      }
    } else {
      console.error('Map element not found.')
    }
  }

  public onSelectImages(event: any) {
    this.files = [...event.addedFiles]
    // if (this.levelOneImageArr.length >= 5) {
    //   Swal.fire({
    //     toast: true,
    //     text: 'You have already selected the maximum number of images allowed.Upgrade Plan for more.',
    //     animation: false,
    //     icon: 'warning',
    //     position: 'top-right',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    // if (this.vediosHide.level_id == '1') {

    //   if (this.files.length > 5) {
    //     console.log('upload 5 images ')
    //     Swal.fire({
    //       toast: true,
    //       text: 'Max 5 images allowed. Upgrade your plan for more',
    //       animation: false,
    //       icon: 'error',
    //       position: 'top-right',
    //       showConfirmButton: false,
    //       timer: 3000,
    //       timerProgressBar: true,
    //     })
    //     return
    //   }
    // }
    this.displayLevelOneImages()
  }

  public displayLevelOneImages() {
    let maxImages: any = 5
    // if (this.files.length > maxImages) {
    //   Swal.fire({
    //     toast: true,
    //     text: `You can only select up to ${maxImages} images at a time.`,
    //     animation: false,
    //     icon: 'error',
    //     position: 'top-right',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    this.isImageUploading = true

    const filesToUpload = this.files.slice(0, maxImages)

    filesToUpload.forEach((file, index) => {
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string
      }
      reader.readAsDataURL(file)

      // Upload each file
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isImageUploading = false
          this.levelOneImageArr.push(res.image_url)
          if (this.levelOneImageArr.length >= maxImages) {
            this.isImageUploading = false
          }
        },
        error: (err: any) => {
          this.isImageUploading = false
          // Handle errors if needed
        },
      })
    })
  }

  public removeImageItem(index: any) {
    this.levelOneImageArr.splice(index, 1)
  }

  public submit() {
    this.isLoader = true
    const body = {
      comment_post_ID: this.postId,
      // user_id: this.eventDetails?.user_detail?.user_id,
      rating: this.reviewForm.value.rating,
      comment_author_url: this.reviewForm.value.comment_author_url,
      comment_author_email: this.reviewForm.value.comment_author_email,
      comment_author: this.reviewForm.value.comment_author,
      comment_content: this.reviewForm.value.comment_content,
      // attachments: this.levelOneImageArr,
    }
    const formData = new FormData()
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          formData.append(`${key}[${nestedKey}]`, String(nestedValue))
        })
      } else {
        formData.append(key, String(value))
      }
    })
    // formData.append('attachments', JSON.stringify(this.levelOneImageArr));
    formData.forEach((value, key) => {
      console.log(key + ', ' + value)
    })
    console.log(formData, 'formData')

    if (this.reviewForm.valid) {
      this.profileService.reviewSet(formData).subscribe({
        next: (res) => {
          this.isLoader = false
          this.getReviews()
          this.getEventDetails()
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
        },
        error: (err) => {
          this.isLoader = false
        },
      })
    } else {
    }
  }

 public getReviews() {
    this.businessService.GetReviewList(this.postId).subscribe({
      next: (res) => {
         this.reviewsArray = res?.data
         console.log(this.reviewsArray)
      },
    })
  }

  public showReplyField(index: number) {

    console.log(index , "INDEX")
    this.isReplyFieldOpen = true;
    this.replyIndex = index;
  }
  public showReplyCommentField(index: number, id:any) {

    console.log(index , "INDEX")
    this.isReplycomFieldOpen = true;
    this.replyIndexshow = index;
     this.getReplies(index, id)
  }
  // public hideReplyField() {
  //   this.isReplyFieldOpen = false;
  //   this.replyIndexshow = -1; 
  // }

  public hideReplyField() {
    this.isReplycomFieldOpen = false;
    this.replyIndex = -1; 
  }

  public handlereply(index:any , commentId:any){
    this.commentId = commentId
    const body = {
      comment_post_ID: this.postId,
      comment_content: this.replyInput.value,
      comment_parent: this.commentId
    }
    const formData = new FormData()
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          formData.append(`${key}[${nestedKey}]`, String(nestedValue))
        })
      } else {
        formData.append(key, String(value))
      }
    })
    this.eventService.setReviewReply(formData).subscribe({
      next:(res)=>{
      this.getReplies(index, this.commentId)
      }
    })
  }


  public getReplies(index:any, id:any){
    this.repliesArray = []
    this.loader = true
    this.isReplycomFieldOpen = true;
    this.replyIndexshow = index;
    this.eventService.getReviewReply(this.commentId?this.commentId:id ,this.postId).subscribe({
      next:(res)=>{
        this.repliesArray = res?.data
        this.loader = false
        if(this.repliesArray.length == 0){
          Swal.fire({
            toast: true,
            text: 'REPLIES NO FOUND!',
            animation: false,
            icon: 'warning',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,

          });
        }
        console.log(this.repliesArray ,"Replies")
      },error:(err)=>{
        
      }
    })
  }
}
