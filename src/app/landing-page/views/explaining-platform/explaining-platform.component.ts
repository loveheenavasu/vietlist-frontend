import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { SafeUrlPipe } from 'src/app/shared/utils/safe.pipe'

@Component({
  selector: 'app-explaining-platform',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './explaining-platform.component.html',
  styleUrl: './explaining-platform.component.scss',
})
export class ExplainingPlatformComponent {
  @Input() homePageData?: any

  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef
  isPlaying: boolean = false
  isLoading: boolean = false
  constructor(private router: Router) {}

  ngOnInit() {}

  togglePlayPause() {
    const videoPlayer = this.videoPlayerRef.nativeElement as HTMLVideoElement

    if (videoPlayer.paused) {
      this.isLoading = true
      videoPlayer
        .play()
        .then(() => {
          this.isPlaying = true
          this.isLoading = false
        })
        .catch((error) => {
          console.error('Error playing video:', error)
        })
    } else {
      videoPlayer.pause()
      this.isPlaying = false
    }
  }

  handleVideoLoad() {
    this.isLoading = false
  }

  handleVideoError(event: Event) {
    this.isLoading = false
    console.error('Video failed to load', event)
  }
  public navigatetOnBusiness() {
    this.router.navigateByUrl('/business-listing')
  }
}
