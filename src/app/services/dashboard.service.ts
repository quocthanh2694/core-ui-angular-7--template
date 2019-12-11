import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request/http-request.service';
import { HttpRequestListCommon } from '../models/common/httpRequestListEntity';
import { STATUS_CODE } from '../utilities/constants';

@Injectable()
export class DashboardService {

    constructor(private httpRequestService: HttpRequestService) { }

    async getJsonDemo() {

        const data: any = await this.httpRequestService.getJsonDemo().toPromise();
        const res: HttpRequestListCommon = data;

        // if (res.status_code !== STATUS_CODE.SUCCESS) {
        //     throw new Error(res.status_message);
        // }

        return res;
    }

}
