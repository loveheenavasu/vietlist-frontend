import { Component, Input } from '@angular/core'
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


  constructor(private router:Router) { }

  ngOnInit() {
  }

  public navigatetOnBusiness(){
    this.router.navigateByUrl('/business-listing')
  }
}
