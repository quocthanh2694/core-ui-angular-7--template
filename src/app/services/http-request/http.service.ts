import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/internal/operators/map';
import { AlertService } from '../alert/alert.service';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../utilities/localStorage.service';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
    private myToastrService: AlertService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private router: Router) { }

  getOption(endpoint = '') {
    let httpOptions: any;

    if (!endpoint.includes('/account/login')) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.localStorageService.get(this.localStorageService.key.authorization) || ''
        })
      };
      httpOptions.headers.append('');
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
    }

    return httpOptions;
  }

  getWithArrayParams(endpoint, params?: any) {
    const headers: any = this.getOption(endpoint).headers;
    return this.http.get(environment.apiDomain + endpoint, { headers, params })
      .pipe(
        catchError(this.handleError(this)),
        map(this.handleResponse(this)),
      );
  }

  get(endpoint, paramsIn?: any) {
    const paramUri = this.encodeParams(paramsIn);
    return this.http.get(environment.apiDomain + endpoint + paramUri, this.getOption(endpoint))
      .pipe(
        catchError(this.handleError(this)),
        map(this.handleResponse(this)),
      );
  }

  post(endpoint, data) {
    return this.http.post(environment.apiDomain + endpoint, data, this.getOption(endpoint))
      .pipe(
        catchError(this.handleError(this))
      );
  }

  put(endpoint, data) {
    return this.http.put(environment.apiDomain + endpoint, data, this.getOption(endpoint))
      .pipe(
        catchError(this.handleError(this))
      );
  }

  delete(endpoint, paramIn?) {
    const paramUri = this.encodeParams(paramIn);
    return this.http.delete(environment.apiDomain + endpoint + paramUri, this.getOption(endpoint))
      .pipe(
        catchError(this.handleError(this))
      );
  }

  private encodeParams(paramsIn) {
    const params = _.cloneDeep(paramsIn);
    let paramUri = '';
    if (params) {
      paramUri = '?';
      const arr = Object.keys(params);
      arr.forEach((item: any) => {
        paramUri = paramUri + item + '=' + encodeURIComponent(params[item]) + '&';
      });
    }
    return paramUri;
  }

  private handleError(self) {

    return (error: any) => {
      const errorBK = Object.assign({}, error);
      console.log(errorBK);
      switch (error.status) {
        case 403: // un-authorize
        case 401: // un-authorize
          this.translateService.get('session_has_expired').subscribe(res => {
            error.message = res;
          });
          self.router.navigateByUrl('login');
          break;
        case 0:
        case 502:
          // can not connect to server
          let txt_1 = '';
          this.translateService.get('can_not_connect_to_server').subscribe(res => {
            txt_1 = res;
          });
          self.myToastrService.error(txt_1);
          break;
        case 404:
          let txt = '';
          this.translateService.get('not_found').subscribe(res => {
            txt = res;
          });
          self.myToastrService.error(txt);
          break;
        default:
          break;
      }
      this.translateService.get('an_error_occur').subscribe(res => {
        error.message = res;
      });
      return throwError(error);
    };
  }

  private handleResponse(self) {
    return (res) => {
      switch (res.status_code) {
        case 910: // your account is not have permission
          // self.myToastrService.showToastrError('Permission denied.');
          self.router.navigateByUrl('login');
          break;
      }
      return res;
    };
  }

}
