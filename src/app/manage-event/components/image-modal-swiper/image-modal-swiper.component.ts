import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { register } from 'swiper/element/bundle';

register()

@Component({
  selector: 'app-image-modal-swiper',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './image-modal-swiper.component.html',
  styleUrl: './image-modal-swiper.component.scss'
})
export class ImageModalSwiperComponent {
  @ViewChild('busniessCategoriesSwiper') swiper!: ElementRef

  swiperParams = {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: true,
    slidesPreview: 1,

    on: {
      init() { },
    },
  }

  constructor(public matDialogRef: MatDialogRef<ImageModalSwiperComponent>, @Inject(MAT_DIALOG_DATA) public data: { images: string[] }) {

    console.log("check image data", data?.images)
    if (data && data?.images) {
      setTimeout(() => {
        const swiperEl = this.swiper.nativeElement
        Object.assign(swiperEl, this.swiperParams)
        swiperEl.initialize()
      })
    }
  }

  closeDialog() {
    this.matDialogRef.close()
  }

}
