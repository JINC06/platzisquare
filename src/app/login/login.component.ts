import { Component } from '@angular/core';
import {AutorizacionService} from '../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user: any = {};
  constructor(private autorizacionService: AutorizacionService) {
  }
  login() {
    this.autorizacionService.login(this.user.email, this.user.password);
  }
  facebookLogin() {
    this.autorizacionService.facebookLogin();
  }
}
