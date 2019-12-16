import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { LoginModel } from '../../models/login.model';
import { HttpResponseCommon } from '../../models/common/httpResponseCommon';

@Injectable()
export class LoginService {

    constructor(
        private httpRequestService: HttpRequestService,
    ) { }

    async login(model: LoginModel): Promise<HttpResponseCommon<any>> {
        const data: any = await this.httpRequestService.login(model).toPromise();
        const res = data;
        // if (res.status_code !== STATUS_CODE.SUCCESS) {
        //     throw new Error(res.status_message);
        // }
        return res;

    }

}
