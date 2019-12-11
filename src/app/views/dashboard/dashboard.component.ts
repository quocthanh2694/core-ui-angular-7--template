import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService } from '../../services/alert/alert.service';
import { logger } from '../../utilities/logger.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  @ViewChild('myModal') public myModal: ModalDirective;

  constructor(
    private alertService: AlertService,
  ) {

  }
  ngOnInit(

  ) {
    logger.debug('xx');
  }

  onClickOpenModal() {
    this.myModal.show();
  }
  onClickToastr() {
    this.alertService.success('message', 'title');
  }
}
