import { BusinessService } from './../../../manage-business/service/business.service';
import { MatSelectModule } from '@angular/material/select';
import { NgIf, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormControlValidationDirective } from '@vietlist/shared';

import { ForgotPasswordComponent } from 'src/app/auth';
import { AuthService } from 'src/app/auth/service/auth.service';
import { LoaderComponent } from 'src/app/common-ui';
import Swal from 'sweetalert2';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-add-video',
  standalone: true,
  imports: [   MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormControlValidationDirective,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent,
    NgIf,
    NgxDropzoneModule,
    CommonModule,],
  templateUrl: './add-video.component.html',
  styleUrl: './add-video.component.scss'
})
export class AddVideoComponent {
  public forgotPasswordForm!: FormGroup
  public isVideoUploading: boolean = false
  public isImageUploading: boolean = false
  public video_upload: any = [];
  public filess: any
  public vediosUrl: any[] = [];
  public imagePreviews: any[] = []
  public imageUrl: any
  public files: File[] = []

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
    private businessService:BusinessService
  ) {
    
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    })
  }

  ngOnInit(){
    this.updateSize()
  }

  public close() {
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


  public updateSize(){
    this.matDialogRef.updateSize('900px' , '100%')
  }

  public onSelect(event: any) {
    const files: File[] = event.addedFiles
    this.filess = files

    const videoFiles: File[] = files.filter((file) =>
      file.type.startsWith('video/'),
    )

    // If there are any image files, you can remove them
    const imageFiles: File[] = files.filter((file) =>
      file.type.startsWith('image/'),
    )
    if (imageFiles.length > 0) {
      // Handle the presence of image files (disable or display a message)
      Swal.fire({
        toast: true,
        text: 'Image files are not allowed. Please upload only video files.',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      console.log(
        'Image files are not allowed. Please upload only video files.',
      )
    }
    videoFiles.forEach((file) => {
      const reader = new FileReader()
      this.isVideoUploading = true
      reader.onload = () => {
        const videoUrl = reader.result as string
        this.businessService.uploadMedia(this.filess[0]).subscribe({
          next: (res: any) => {
            this.isVideoUploading = false
            this.video_upload = [res.image_url]
            console.log(this.video_upload)

            this.vediosUrl = [...this.vediosUrl, res.image_url]
          },
          error: (err: any) => {
          },
        })

      }
      reader.readAsDataURL(file)
    })
  }

  public removeItems(index: any) {
    this.video_upload.splice(index, 1);
  }


  public onRemove(videoElement: HTMLElement) {
    if (videoElement && videoElement.parentNode) {
      videoElement.parentNode.removeChild(videoElement)
    }
  }

  onSelectImage(event: any) {
    if (this.imagePreviews.length >= 1) {
      Swal.fire({
        toast: true,
        text: 'You can upload only one image',
        animation: false,
        icon: 'error',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
  
    const file = event.addedFiles[0]; // Only consider the first added file
    this.files = [file];
  
    this.displayImagePreviews();
  }
  

  displayImagePreviews() {
    this.isImageUploading = true;
    const filesToUpload = this.files.slice(0, 5);
    filesToUpload.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.businessService.uploadMedia(file).subscribe({
        next: (res: any) => {
          this.isImageUploading = false;
          this.imagePreviews.push(res.image_url);
          if (this.imagePreviews.length >= 5) {
            this.isImageUploading = false;
          }
        },
        error: (err: any) => {
          this.isImageUploading = false;
        },
      });
    });
  }

  public removeItem(index: any) {
    this.imagePreviews.splice(index, 1);
  }

}
