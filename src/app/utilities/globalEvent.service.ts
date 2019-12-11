import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalEventService {
    public changeLanguageEvent: EventEmitter<string> = new EventEmitter();
}
