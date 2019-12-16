import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './services/app.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
    <div class="loading-whole-page" *ngIf="loading">
      <img src="assets/img/common/ajax-loader.gif" width="60"/>
    </div>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = false;

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.translateService.setDefaultLang('vi');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });


    // loading
    this.appService.loadingEventEmitter.subscribe((show: boolean) => {
      this.loading = show;
    });
  }
}
