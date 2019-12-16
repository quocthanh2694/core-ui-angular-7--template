import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(
    private translateService: TranslateService,
  ) {

  }

  ngOnInit(): void {
    this.translateMenu();
    this.translateService.onLangChange.subscribe((res) => {
      this.translateMenu();
    });
  }

  translateMenu() {
    this.navItems.forEach((menuItem) => {
      let txt = '';
      this.translateService.get(menuItem.name).subscribe((resTxt) => {
        txt = resTxt;
      });
      menuItem.name = txt;
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
