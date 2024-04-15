import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-video-play',
  standalone: true,
  imports: [],
  templateUrl: './video-play.component.html',
  styleUrl: './video-play.component.scss'
})
export class VideoPlayComponent {
  public videodata:any
  constructor(private dialogRef:MatDialogRef<VideoPlayComponent>,@Inject(MAT_DIALOG_DATA)data:any){
    this.videodata = data.item
    console.log(this.videodata )
  }
}
