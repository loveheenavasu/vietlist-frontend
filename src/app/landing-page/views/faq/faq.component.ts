import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { HomepageService } from '../service/homepage.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  public panelOpenState = false;
  public faqsArr:any
  constructor(private homeservice:HomepageService){
    this.getFaqs()
  }

  ngOnInit(){
    this.getFaqs()
  }


  public getFaqs(){
    this.homeservice.faqs().subscribe({
      next:(res:any)=>{
        this.faqsArr = res?.data
        console.log(res , this.faqsArr, 'Response')
      }
    })
  }

}
