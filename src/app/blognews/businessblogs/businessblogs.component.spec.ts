import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessblogsComponent } from './businessblogs.component';

describe('BusinessblogsComponent', () => {
  let component: BusinessblogsComponent;
  let fixture: ComponentFixture<BusinessblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessblogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
