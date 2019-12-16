import { Component } from '@angular/core';
import { URI } from '../../../uri';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private router: Router,
  ) {

  }

  onClickRegister() {
    this.router.navigate([URI.REGISTER]);
  }
}
