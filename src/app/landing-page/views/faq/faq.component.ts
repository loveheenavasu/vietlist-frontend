import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {MatExpansionModule} from '@angular/material/expansion';
import { HomepageService } from '../service/homepage.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule,CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  public panelOpenState = false;
  public faqsArr:any
  public activeTab:any = 'user'

  constructor(private homeservice:HomepageService){
    this.getFaqs()
  }

  ngOnInit(){
    this.getFaqs()
  }


  public getFaqs(){
    this.homeservice.faqs().pipe(takeUntilDestroyed()).subscribe({
      next:(res:any)=>{
        this.faqsArr = res?.data
        console.log(res , this.faqsArr, 'Response')
      }
    })
  }



  public toggleFAQ(tab: string) {
    this.activeTab = tab;
  }

}
