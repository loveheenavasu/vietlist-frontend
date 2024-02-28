import { ActivatedRoute, Route, Router } from '@angular/router'
import { Component, ViewEncapsulation } from '@angular/core'
import { EventService } from '../../service/event.service'
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common'
import { FullPageLoaderService } from '@vietlist/shared'
import { NgxStarRatingModule } from 'ngx-star-rating'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { NgxStarsModule } from 'ngx-stars'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { BusinessService } from 'src/app/manage-business/service/business.service'
import { ProfileService } from 'src/app/manage-profile/service/profile.service'
import { HomepageService } from 'src/app/landing-page/views/service/homepage.service'
// NgxStarRatingModule
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TitleCasePipe, CommonModule, NgxDropzoneModule, NgxStarRatingModule, DatePipe, CommonModule,],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EventDetailsComponent {
  starRatingValue: number = 5;
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
  constructor(
    private eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private fullPageLoaderService: FullPageLoaderService,
    private router: Router,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private profileService: ProfileService,
    private footerContent: HomepageService,
  ) {
    this.reviewForm = this.fb.group({
      ratings: ['', Validators.required],
      rating: ['', Validators.required],
      name: [''],
      email: [''],
      website: [''],
      save: [''],
      comments: [''],
      starRatingValue:['']
    })

    this._activatedRoute.params.subscribe((res) => {
      this.postId = res['id']
    })
    this._activatedRoute.queryParams.subscribe((res) => {
      this.isGlobal = res['isGlobal'];
      console.log(this.isGlobal, 'this.isGlobal');
    });
  }


  ngOnInit() {
    this.starRatingValue = this.reviewForm.value.starRatingValue
    if (this.postId) {
      this.getEventDetails()

    }
    this.getReviews()
  }


  public getFooterContent() {
    this.footerContent.footerContent().subscribe({
      next: (res: any) => {
        this.footerPageContent = res.data
      },
    })
  }

  public manageBusiness() {
    this.router.navigateByUrl('/manage-profile/manage-events')
  }
  public getEventDetails() {
    this.fullPageLoaderService.showLoader()
    this.eventService.getEventDetailsByPostId(this.postId).subscribe({
      next: (res) => {
        this.fullPageLoaderService.hideLoader()
        this.eventDetails = res?.data[0] || 'NA'
        this.latitude = Number(this.eventDetails?.latitude),
          this.longitude = Number(this.eventDetails?.longitude)
        console.log(res)
        this.initMap()
      },
      error: (err) => { },
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
    let maxImages: any = 5;
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

    this.isImageUploading = true;


    const filesToUpload = this.files.slice(0, maxImages);

    filesToUpload.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Upload each file
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isImageUploading = false;
          this.levelOneImageArr.push(res.image_url);
          if (this.levelOneImageArr.length >= maxImages) {
            this.isImageUploading = false;
          }
        },
        error: (err: any) => {
          this.isImageUploading = false;
          // Handle errors if needed
        },
      });
    });
  }

  public removeImageItem(index: any) {
    this.levelOneImageArr.splice(index, 1);
  }


  submit() {
    const body = {
      post_id: this.postId,
      user_id: this.eventDetails?.user_detail?.user_id,
      rating: this.reviewForm.value.rating,
      ratings: this.reviewForm.value.ratings,
      // attachments: this.levelOneImageArr,
    }

    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // Handle nested object properties
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          formData.append(`${key}[${nestedKey}]`, String(nestedValue));
        });
      } else {
        formData.append(key, String(value));
      }
    });

    formData.append('attachments', JSON.stringify(this.levelOneImageArr));

    // Access the FormData object
    formData.forEach((value, key) => {
      console.log(key + ', ' + value);
  });
    console.log(formData, 'formData')
    
    if (this.reviewForm.valid) {

      this.profileService.reviewSet(formData).subscribe({
        next: (res) => {
          console.log(res, 'hhhhhhhhhhh')
          this.getReviews()
          
        },
        error: (err) => {

        },
      })
    } else {
      console.log('Not valid----------')
    }
  }

  getReviews() {
    // const body = {
    //   post_id: this.postId
    // }
    // const formData = new FormData();
    // Object.entries(body).forEach(([key, value]) => {
    //   if (typeof value === 'object' && value !== null) {
    //     // Handle nested object properties
    //     Object.entries(value).forEach(([nestedKey, nestedValue]) => {
    //       formData.append(`${key}[${nestedKey}]`, String(nestedValue));
    //     });
    //   } else {
    //     formData.append(key, String(value));
    //   }
    // });
    //  console.log(formData, this.postId , 'formDataformDataformDataformData')
    this.businessService.GetReviewList(this.postId).subscribe({
      next: (res) => {
        console.log(res, 'jdhfjghjdghjfgjhdg')
      }
    })
  }
}
