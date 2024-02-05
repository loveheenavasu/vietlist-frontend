import { Component } from '@angular/core'
import { Router } from '@angular/router'


@Component({
  selector: 'app-benefits-of-joining',
  standalone: true,
  imports: [],
  templateUrl: './benefits-of-joining.component.html',
  styleUrl: './benefits-of-joining.component.scss',
})
export class BenefitsOfJoiningComponent {

  constructor(private router: Router) { }
  handleAddBusiness() {
    this.router.navigateByUrl("/listing-business")
  }

  backToLogin() {
    this.router.navigateByUrl('/login')
  }
}
