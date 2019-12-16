import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { GlobalEventService } from '../../utilities/globalEvent.service';

@Injectable()
export class AlertService {

  msgSuccess;
  msgCreated;
  msgEdited;
  msgDeleted;
  msgSavedBlockchain;
  msgFailSaveBlockchain;
  anErrorOccur;
  msgDataWasExisted;

  constructor(private toastrService: ToastrService,
    private translateService: TranslateService,
    private globalEventService: GlobalEventService,
  ) {
    this.toastrService.toastrConfig.preventDuplicates = true;

    this.getTranslateLanguages();

    this.globalEventService.changeLanguageEvent.subscribe(languageKey => {
      this.translateService.use(languageKey);
      this.getTranslateLanguages();
    });

  }



  private getTranslateLanguages() {
    this.translateService.get([
      'created_success',
      'edited_success',
      'deleted_success',
      'save_blockchain_success',
      'fail_save_blockchain',
      'an_error_occur',
      'data_was_existed',
      'success',
    ]).subscribe((trans) => {
      this.msgCreated = trans['created_success'];
      this.msgSuccess = trans['success'];
      this.msgEdited = trans['edited_success'];
      this.msgDeleted = trans['deleted_success'];
      this.msgSavedBlockchain = trans['save_blockchain_success'];
      this.msgFailSaveBlockchain = trans['fail_save_blockchain'];
      this.anErrorOccur = trans['an_error_occur'];
      this.msgDataWasExisted = trans['data_was_existed'];
    });
  }

  success(msg, title?, duration?) {
    this.toastrService.info('<span class="now-ui-icons ui-1_bell-53"></span><span>' + msg + '</span>', title, {
      timeOut: duration || 3000,
      closeButton: true,
      enableHtml: true,
      disableTimeOut: true,
      toastClass: 'alert alert-info alert-with-icon',
      positionClass: 'toast-top-right'
    });
  }

  error(msg, duration?) {
    if (!msg) {
      msg = this.anErrorOccur;
    }
    this.toastrService.info('<span class="now-ui-icons ui-1_bell-53"></span><span>' + msg + '</span>', '', {
      timeOut: duration || 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-danger alert-with-icon',
      positionClass: 'toast-top-right'
    });
  }

  warning(msg: string, duration?) {
    return this.toastrService.info('<span class="now-ui-icons ui-1_bell-53"></span><span>' + msg + '</span>', '', {
      timeOut: duration || 3000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-danger alert-with-icon',
      positionClass: 'toast-top-right'
    });
  }

  mqttWarning(title: string = '', msg: string, duration?) {
    return this.toastrService.info('<span class="now-ui-icons ui-1_bell-53"></span><span>' + msg + '</span>', title, {
      timeOut: duration || 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-warning alert-with-icon',
      positionClass: 'toast-top-right'
    });
  }
}
