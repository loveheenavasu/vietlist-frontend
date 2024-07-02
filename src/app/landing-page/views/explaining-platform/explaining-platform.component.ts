import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-explaining-platform',
  standalone: true,
  imports: [],
  templateUrl: './explaining-platform.component.html',
  styleUrl: './explaining-platform.component.scss',
})
export class ExplainingPlatformComponent {
  @Input() homePageData?: any

  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef;
  isPlaying: boolean = false;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  togglePlayPause() {
    const videoPlayer = this.videoPlayerRef.nativeElement as HTMLVideoElement;

    if (videoPlayer.paused) {
      videoPlayer.play();
      this.isPlaying = true;
    } else {
      videoPlayer.pause();
      this.isPlaying = false;
    }
  }


  public navigatetOnBusiness(){
    this.router.navigateByUrl('/business-listing')
  }
}
