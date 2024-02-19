import { MatSelectModule } from '@angular/material/select';
import { Component } from '@angular/core';
import { ProfileService } from 'src/app/manage-profile/service/profile.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BusinessService } from 'src/app/manage-business/service/business.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-create-ads',
  standalone: true,
  imports: [MatSelectModule, MatDatepickerModule, MatTabsModule],
  templateUrl: './create-ads.component.html',
  styleUrl: './create-ads.component.scss'
})
export class CreateAdsComponent {
  public allSpaces: any[] = []
  public files: File[] = []
  public isImageLoading: boolean = false
  public imagePreviews: any
  public imageUrl: any
  public filesString: any
  public uploadMediaUrl: any
  constructor(private profileService: ProfileService, private router: Router, private businessService: BusinessService,) { }

  ngOnInit() {
    this.getAllSpaces()
  }

  public getAllSpaces() {
    this.profileService.getSpaces().subscribe({
      next: (res) => {
        this.allSpaces = res?.data
      }
    })
  }

  onSelectImage(event: any) {
    this.files.push(...event.target.files);
  
    const formData = new FormData();
  
    for (let i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }
  
    this.displayImagePreviews();
  }
  
  displayImagePreviews() {
    this.isImageLoading = true;
    this.imagePreviews = [];
  
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const result = e.target.result;
        if (typeof result === 'string') {
          this.imagePreviews.push(result);
        }
      };
  
      reader.readAsDataURL(file);
    }
    this.businessService.uploadMedia(this.files[0]).subscribe({
      next: (res: any) => {
        this.isImageLoading = false;
        this.imageUrl = res.image_url;
      },
      error: (err: any) => {
        // Handle errors
      },
    });
  }
  
  removeItem(index: any) {
    this.imagePreviews.splice(index, 1);
  }
}
