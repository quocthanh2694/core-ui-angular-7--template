import { Paging } from '../entity/paging';


export class HttpRequestListCommon {
    data: Data;
    status: string;
    status_code: number;
    status_message: string;
};

class Data {
    items: any;
    paging: Paging;
};


