import { Component } from '@angular/core'
import { Router, RouterLink } from '@angular/router'


@Component({
  selector: 'app-benefits-of-joining',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './benefits-of-joining.component.html',
  styleUrl: './benefits-of-joining.component.scss',
})
export class BenefitsOfJoiningComponent {

  constructor(private router: Router) { }

  backToLogin() {
    this.router.navigateByUrl('/login')
  }
}
