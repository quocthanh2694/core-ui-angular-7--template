import { Component } from '@angular/core';
import { URI } from '../../../uri';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth-service/login.service';
import { logger } from '../../../utilities/logger.service';
import { LoginModel } from '../../../models/login.model';
declare const md5: any;
import '../../../../assets/js/md5.js';
import { STATUS_CODE } from '../../../utilities/constants';
import { AlertService } from '../../../services/alert/alert.service';
import { ApiHelperService } from '../../../services/apiHelper.service';
import { LocalStorageService } from '../../../utilities/localStorage.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private apiHelperService: ApiHelperService,
    private appService: AppService,
  ) {

  }

  async onClickLoginButton() {
    console.log(this.username, this.password);
    this.appService.loadingEventEmitter.emit(true);
    try {
      // LoginModel
      const model: any = {
        password: md5(this.password),
        phone: this.username,
        socialMethod: 'phone',
      };
      const res = await this.loginService.login(model);

      console.log(res);
      if (res.status_code === STATUS_CODE.SUCCESS) {
        this.processLogin(res);
      } else {
        throw res;
      }
    } catch (err) {
      this.apiHelperService.processApiError(err);
    }
    this.appService.loadingEventEmitter.emit(false);
  }

  processLogin(res) {
    // save token
    this.localStorageService.set(this.localStorageService.key.authorization, res.data.authorization);
    // navigate to home
    this.router.navigate([URI.DASHBOARD]);
  }

  onClickRegister() {
    this.router.navigate([URI.REGISTER]);
  }
}
