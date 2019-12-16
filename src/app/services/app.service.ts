import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AppService {

    loadingEventEmitter: EventEmitter<any> = new EventEmitter();

    constructor() { }

}
