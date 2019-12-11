import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class HttpRequestService {

  jsonDemoUrl = 'assets/config.json';

  constructor(private http: HttpService, private router: Router, private httpAngular: Http) {

  }

  getJsonDemo() {
    return this.http.get('https://gorest.co.in/public-api/users?_format=json&access-token=KyJeH2G2nlZGHOo9te45s1hmSHBnk2aDCWWw');
  }

  login(data) {
    return this.http.post('auth/account/login', data);
  }

}


