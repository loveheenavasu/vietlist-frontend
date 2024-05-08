import { Component } from '@angular/core';
import { HomepageService } from '../service/homepage.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  public termsData:any
  constructor(private homeservice:HomepageService){}

  ngOnInit(){
    this.getData()
  }

  public getData(){
    this.homeservice.getTerms_Legaldata('terms-conditions').subscribe({
      next:(res)=>{
        this.termsData = res.data
        console.log(res)
      }
    })
  }
}
