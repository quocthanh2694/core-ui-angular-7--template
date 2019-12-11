import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService } from '../../services/alert/alert.service';
import { logger } from '../../utilities/logger.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [
    DashboardService,
  ]
})
export class DashboardComponent implements OnInit {

  @ViewChild('myModal') public myModal: ModalDirective;

  constructor(
    private alertService: AlertService,
    private dashboardService: DashboardService,
  ) {

  }
  async ngOnInit() {
    logger.debug('xx');
    const res = await this.dashboardService.getJsonDemo();
    console.log(res);
  }

  onClickOpenModal() {
    this.myModal.show();
  }
  onClickToastr() {
    this.alertService.success('message', 'title');
  }
}
