import { BusinessService } from './../../../manage-business/service/business.service'
import { MatSelectModule } from '@angular/material/select'
import { NgIf, CommonModule } from '@angular/common'
import { Component, Inject } from '@angular/core'
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
export class AddVideoComponent {
  public isVideoUploading: boolean = false
  public isImageUploading: boolean = false
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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.postId = data.postId
    this.dialogData = data.item
    if (this.dialogData) {
      this.name.patchValue(this.dialogData.name)
      this.video_type.patchValue(this.dialogData.video_type)
      this.imagePreviews = this.dialogData?.thumbnail_image
        ? [this.dialogData.thumbnail_image]
        : []
      this.videoUrl = this.dialogData?.video_url
        ? [this.dialogData.video_url]
        : []
    }
    console.log(this.dialogData)

    this.videoDetails = this.fb.group({
      videos: this.fb.array([]),
    })
  }

  ngOnInit() {
    this.updateSize()
    this.addMore()
  }

  addMore() {
    this.videos().push(this.newVideoField())
    console.log(
      this.videos().controls.length,
      'this.videos()this.videos()this.videos()this.videos()',
    )
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
    this.videos().removeAt(i)
    console.log(this.videoDetails.value, 'this.videos()')
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
  //       timer: 3000,
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
  //       timer: 3000,
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

  public onSelect(event: any) {
    // if (this.videoUrl.length > 0) {
    //   Swal.fire({
    //     toast: true,
    //     text: 'You have already uploaded a video. Please remove the existing video before uploading a new one.',
    //     animation: false,
    //     icon: 'error',
    //     position: 'top-right',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   })
    //   return
    // }

    this.isVideoUploading = true
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
        timer: 3000,
        timerProgressBar: true,
      })
      this.isVideoUploading = false
      return
    }

    const file: File = files[0]

    // Process the video file
    const reader = new FileReader()
    this.isVideoUploading = true
    reader.onload = () => {
      const videoUrl = reader.result as string
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isVideoUploading = false
          this.video_upload = [res.image_url]
          if (!this.videoUrl?.includes(res?.image_url)) {
            this.videoUrl?.push(res?.image_url)
            this.videoDetails.value.videos[this.videoUrl.length - 1].video_url =
              res?.image_url
            console.log(this.videoDetails.value, 'this.videos()')
          }
        },
        error: (err: any) => {
          this.isVideoUploading = false
        },
      })
    }
    reader.readAsDataURL(file)
  }

  public removeItems(index: any) {
    this.videoUrl.splice(index, 1)
    console.log(index, 'index')
    console.log(this.videoUrl, '')
  }

  public onRemove(videoElement: HTMLElement) {
    if (videoElement && videoElement.parentNode) {
      videoElement.parentNode.removeChild(videoElement)
    }
  }

  onSelectImage(event: any) {
    const file = event.addedFiles[0] // Only consider the first added file
    this.files = [file]

    this.displayImagePreviews()
  }

  displayImagePreviews() {
    this.isImageUploading = true
    const filesToUpload = this.files.slice(0, 5)
    filesToUpload.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
      }
      reader.readAsDataURL(file)
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isImageUploading = false
          if (res) {
            this.imagePreviews.push(res.image_url)
            this.videoDetails.value.videos[
              this.imagePreviews.length - 1
            ].thumbnail_image = res?.image_url
            console.log(this.videoDetails.value, 'this.videos()2')
          }

          if (this.imagePreviews.length >= 5) {
            this.isImageUploading = false
          }
        },
        error: (err: any) => {
          this.isImageUploading = false
        },
      })
    })
  }

  public removeItem(index: any) {
    this.imagePreviews.splice(index, 1)
  }

  private subscriptions: Subscription[] = []

  public addVideo() {
    console.log(this.videoDetails.value.videos, 'this.videoDetail')
    // return
    this.isLoader = true
    this.subscriptions = this.videoDetails.value.videos?.map((body: any) => {
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
              timer: 3000,
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
      const updatebody = {
        name: this.name.value,
        post_id: this.postId,
        video_type: this.video_type.value,
        thumbnail_image: this.imagePreviews[0],
        video_url: this.videoUrl,
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
            timer: 3000,
            timerProgressBar: true,
          })
          this.close()
        },
      })
    }
  }
}
