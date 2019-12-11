import { Injectable } from '@angular/core';


interface LocalStorageKey {
    authorization: string;
    user: string;
    languageKey: string;
}

@Injectable()
export class LocalStorageService {

    key: LocalStorageKey = {
        authorization: 'authorization',
        user: 'user',
        languageKey: 'languageKey'
    };

    constructor() {
    }

    set(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    get(key: string) {
        const data = localStorage.getItem(key);
        if (data !== 'undefined') {
            return JSON.parse(data);
        } else {
            return undefined;
        }
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}
