import { Injectable } from '@angular/core';
import { AlertService } from './alert/alert.service';
import { logger } from '../utilities/logger.service';

@Injectable()
export class ApiHelperService {

    constructor(
        private alertService: AlertService,
    ) { }

    processApiError(err) {
        logger.debug(err);
        this.alertService.error('');
    }
}
