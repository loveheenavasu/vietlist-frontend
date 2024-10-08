import { BusinessService } from './../../../manage-business/service/business.service'
import { MatSelectModule } from '@angular/material/select'
import { NgIf, CommonModule } from '@angular/common'
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core'
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FullPageLoaderService } from '@vietlist/shared'
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router'
import { FormControlValidationDirective } from '@vietlist/shared'

import { ForgotPasswordComponent } from 'src/app/auth'
import { AuthService } from 'src/app/auth/service/auth.service'
import { LoaderComponent } from 'src/app/common-ui'
import Swal from 'sweetalert2'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { Subscription, forkJoin } from 'rxjs'

@Component({
  selector: 'app-add-video',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormControlValidationDirective,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
    NgIf,
    NgxDropzoneModule,
    CommonModule,
  ],
  templateUrl: './add-video.component.html',
  styleUrl: './add-video.component.scss',
})
export class AddVideoComponent implements OnInit {
  isVideoUploading: any = {}
  isImageUploading: any = {}
  isLoading: boolean = false
  public video_upload: any = []
  public filess: any
  public videoUrl: any[] = []
  public imagePreviews: any[] = []
  public imageUrl: any
  public files: File[] = []
  public name = new FormControl('', Validators.required)
  public video_type = new FormControl('', Validators.required)
  public postId: any
  public dialogData: any
  public isLoader = false
  public videosFields = [0]
  public videoDetails: FormGroup
  totalVideoCount: any
  videoLimitFull: boolean = false
  isValidated = true
  /**
   *
   * @param matDialogRef
   * @param dialog
   * @param router
   * @param authService
   * @param fb
   */
  constructor(
    public matDialogRef: MatDialogRef<ForgotPasswordComponent>,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private businessService: BusinessService,
    private fullPageLoaderService: FullPageLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.postId = data.postId
    this.dialogData = data.item
    if (this.dialogData) {
      this.name.patchValue(this.dialogData.name)
      this.video_type.patchValue(this.dialogData.video_type)
      // this.imagePreviews = this.dialogData?.thumbnail_image
      //   ? [this.dialogData.thumbnail_image]
      //   : []
      // this.videoUrl = this.dialogData?.video_url
      //   ? [this.dialogData.video_url]
      //   : []
    }
    console.log(this.dialogData)

    this.videoDetails = this.fb.group({
      videos: this.fb.array([]),
    })
  }

  ngOnInit() {
    this.updateSize()
    let PostId = this.postId || this.data?.item?.post_id
    this.getAllVideosList(PostId)
    if (this.data?.item) {
      this.addMore()
    }
  }

  maxVideoCondition() {
    let a = this.totalVideoCount + this.videos().controls.length
    console.log(this.videos().controls.length, 'this.videos().controls.length')
    console.log(this.totalVideoCount, 'total')
    if (a < 5) {
      return true
    } else {
      return false
    }
  }
  videoDetailss: any = []
  onChange(e: any, i: any, name: any) {
    this.videoDetailss[i][name] = e
  }

  addMore() {
    const { item } = this.data
    if (item) {
      this.videoDetailss.push({
        name: item?.name,
        video_type: item?.video_type,
        video_url: item?.video_url[0],
        thumbnail_image: item?.thumbnail_image,
      })
      this.videos().push(
        this.fb.group({
          name: [item?.name, Validators.required],
          video_type: [item?.video_type, Validators.required],
          video_url: [item?.video_url[0], Validators.required],
          thumbnail_image: [item?.thumbnail_image, Validators.required],
        }),
      )
    } else {
      console.log(this.maxVideoCondition(), 'this.maxVideoCondition()')
      if (this.maxVideoCondition()) {
        this.videoDetailss.push(this.newVideoFields())
        this.videos().push(this.newVideoField())
      } else {
        Swal.fire({
          toast: true,
          text: 'Video upload limit reached',
          animation: false,
          icon: 'error',
          position: 'top-right',
          showConfirmButton: false,
          timer: 10000,
          timerProgressBar: true,
        })
        this.videoLimitFull = true
        this.close()
      }
    }
  }

  newVideoFields() {
    return {
      name: '',
      video_type: '',
      video_url: '',
      thumbnail_image: '',
    }
  }
  newVideoField(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      video_type: ['', Validators.required],
      video_url: ['', Validators.required],
      thumbnail_image: ['', Validators.required],
    })
  }

  videos(): FormArray {
    return this.videoDetails.get('videos') as FormArray
  }
  removeVideoField(i: number) {
    // this.videos().removeAt(i)
    this.videoDetailss.splice(i, 1)
  }

  public getAllVideosList(postId: any) {
    this.fullPageLoaderService.showLoader()
    this.isLoading = true
    this.businessService.getAllVideoIntegration(postId).subscribe({
      next: (res: any) => {
        this.fullPageLoaderService.hideLoader()
        this.isLoading = false
        if (res?.message === 'No data Found') {
          this.totalVideoCount = 0
        } else {
          this.totalVideoCount = Number(res?.total_count)
        }
        if (!this.data?.item) {
          this.addMore()
        }
      },
      error: (err: any) => {
        this.isLoading = false
        this.fullPageLoaderService.hideLoader()
        console.log(err, 'error')
      },
    })
  }

  public close() {
    this.videoUrl = []
    this.matDialogRef.close()
  }

  public navigateToLogin() {
    this.close()
    this.router.navigateByUrl('/login')
  }

  public navigateToRegister() {
    this.close()
    this.router.navigateByUrl('/register')
  }

  public updateSize() {
    this.matDialogRef.updateSize('900px', '100%')
  }

  //  public onSelect(event: any) {
  //   this.isVideoUploading = true;
  //   const files: File[] = event.addedFiles;
  //   this.filess = files;
  //   const videoFiles: File[] = files.filter((file) =>
  //     file.type.startsWith('video/')
  //   );

  //   // Allow only 5 video files
  //   if (videoFiles.length > 5) {
  //     Swal.fire({
  //       toast: true,
  //       text: 'You can select only up to 5 video files at a time.',
  //       animation: false,
  //       icon: 'error',
  //       position: 'top-right',
  //       showConfirmButton: false,
  //       timer: 10000,
  //       timerProgressBar: true,
  //     });
  //     return; // Exit the method if more than 5 videos are selected
  //   }

  //   const imageFiles: File[] = files.filter((file) =>
  //     file.type.startsWith('image/')
  //   );

  //   if (imageFiles.length > 0) {
  //     Swal.fire({
  //       toast: true,
  //       text: 'Image files are not allowed. Please upload only video files.',
  //       animation: false,
  //       icon: 'error',
  //       position: 'top-right',
  //       showConfirmButton: false,
  //       timer: 10000,
  //       timerProgressBar: true,
  //     });
  //     console.log(
  //       'Image files are not allowed. Please upload only video files.'
  //     );
  //     return; // Exit the method if image files are present
  //   }

  //   // Process video files
  //   videoFiles.forEach((file) => {
  //     const reader = new FileReader();
  //     this.isVideoUploading = true;
  //     reader.onload = () => {
  //       const videoUrl = reader.result as string;
  //       this.businessService.uploadMedia(file).subscribe({
  //         next: (res: any) => {
  //           this.isVideoUploading = false;
  //           this.video_upload = [res.image_url];
  //           console.log(this.video_upload, 'Video_Upload');
  //           if (!this.videoUrl?.includes(res?.image_url)) {
  //             this.videoUrl?.push(res?.image_url);
  //           }
  //           console.log(this.videoUrl, 'VideosUrlVideosUrl');
  //         },
  //         error: (err: any) => {
  //           this.isVideoUploading = false;
  //         },
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // }

  public onSelect(event: any, i: any) {
    this.isVideoUploading = {
      status: true,
      index: i,
    }
    const files: File[] = event.addedFiles

    // Allow only one video file
    if (files.length !== 1 || !files[0].type.startsWith('video/')) {
      Swal.fire({
        toast: true,
        text: 'Please upload only one video file.',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
      })
      this.isVideoUploading = {
        status: false,
        index: i,
      }
      return
    }

    const file: File = files[0]

    // Process the video file
    const reader = new FileReader()
    this.isVideoUploading = {
      status: true,
      index: i,
    }
    reader.onload = () => {
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isVideoUploading = {
            status: false,
            index: i,
          }
          this.video_upload = [res.image_url]
          if (!this.videoUrl?.includes(res?.image_url)) {
            this.videoUrl?.push(res?.image_url)
            console.log(this.videoUrl, ' url ======== videos().controls', i)
            this.videoDetailss[i].video_url = res?.image_url
          }
        },
        error: (err: any) => {
          this.isVideoUploading = {
            status: false,
            index: i,
          }
        },
      })
    }
    reader.readAsDataURL(file)
  }

  public removeItems(i: any, key: any) {
    this.videoDetailss[i][key] = ''
  }

  public onRemove(videoElement: HTMLElement) {
    if (videoElement && videoElement.parentNode) {
      videoElement.parentNode.removeChild(videoElement)
    }
  }

  onSelectImage(event: any, i: any) {
    const file = event.addedFiles[0] // Only consider the first added file
    this.files = [file]

    this.displayImagePreviews(i)
  }

  displayImagePreviews(i: any) {
    // this.isImageUploading = true
    this.isImageUploading = {
      status: true,
      index: i,
    }
    const filesToUpload = this.files.slice(0, 5)
    filesToUpload.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
      }
      reader.readAsDataURL(file)
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          // this.isImageUploading = false
          this.isImageUploading = {
            status: false,
            index: i,
          }
          if (res) {
            this.imagePreviews.push(res.image_url)
            this.videoDetailss[i].thumbnail_image = res?.image_url
          }

          if (this.imagePreviews.length >= 5) {
            // this.isImageUploading = false
            this.isImageUploading = {
              status: false,
              index: i,
            }
          }
        },
        error: (err: any) => {
          // this.isImageUploading = false
          this.isImageUploading = {
            status: false,
            index: i,
          }
        },
      })
    })
  }

  public removeItem(index: any) {
    this.imagePreviews.splice(index, 1)
  }

  private subscriptions: Subscription[] = []

  validate(arr: any) {
    for (const obj of arr) {
      for (const key in obj) {
        if (!obj[key]) {
          return false
        }
      }
    }
    return true
  }

  public addVideo() {
    console.log(this.videoDetailss, 'this.videoDetailss')
    if (!this.validate(this.videoDetailss)) {
      Swal.fire({
        toast: true,
        text: 'Please fill all the field first',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
      })
      return
    }
    this.isLoader = true
    this.subscriptions = this.videoDetailss?.map((body: any) => {
      return this.businessService.videoIntegration({
        ...body,
        post_id: this.postId,
      })
    })
    if (this.postId) {
      forkJoin(this.subscriptions).subscribe({
        next: (responses: any[]) => {
          this.isLoader = false
          responses.forEach((res) => {
            Swal.fire({
              toast: true,
              text: res.message,
              animation: false,
              icon: 'success',
              position: 'top-right',
              showConfirmButton: false,
              timer: 10000,
              timerProgressBar: true,
            })
          })
          this.close()
        },
        error: (error: any) => {
          console.error('API Error:', error)
        },
        complete: () => {
          this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
          )
        },
      })
    } else {
      console.log(this.videoDetailss, 'this.videoDetailss update')
      const updatebody = {
        ...this.videoDetailss?.[0],
        post_id: this.postId,
        video_id: this.dialogData.video_id,
      }
      this.businessService.updateVideo(updatebody).subscribe({
        next: (res) => {
          this.isLoader = false
          Swal.fire({
            toast: true,
            text: res.message,
            animation: false,
            icon: 'success',
            position: 'top-right',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
          })
          this.close()
        },
      })
    }
  }
}
