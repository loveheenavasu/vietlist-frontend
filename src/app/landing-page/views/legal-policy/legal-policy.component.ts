import { Component } from '@angular/core';
import { HomepageService } from '../service/homepage.service';

@Component({
  selector: 'app-legal-policy',
  standalone: true,
  imports: [],
  templateUrl: './legal-policy.component.html',
  styleUrl: './legal-policy.component.scss'
})
export class LegalPolicyComponent {
  public termsData:any
  constructor(private homeservice:HomepageService){}

  ngOnInit(){
    this.getData()
  }

  public getData(){
    this.homeservice.getTerms_Legaldata('legal-policy').subscribe({
      next:(res:any)=>{
        this.termsData = res.data
        console.log(res)
      }
    })
  }
}
