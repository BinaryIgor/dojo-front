export class Requests {

    constructor(baseUrl, tokenStore) {
        this._baseUrl = baseUrl;
        this._tokenStore = tokenStore;
    }

    get(url, headers={}) {
        return this._execute(url, 'GET', headers, null);
    }

    _addTokenIf(headers) {
        if (!this._tokenStore.empty) {
            headers['Authorization'] = `Bearer ${this._tokenStore.get()}`
        }
    }

    _execute(url, method, headers, data) {
        this._addTokenIf(headers);
        return fetch(this._createUrl(url), {
            method: method,
            headers: headers,
            body: data
        });
    }

    _createUrl(url){
        return `${this._baseUrl}/${url}`;
    }

    post(url, data, headers={}) {
        return this._execute(url, 'POST', headers, data);  
    }

    put(url, data, headers={}) {
        return this._execute(url, 'PUT', headers, data);  
    }

    delete(url, headers={}) {
        return this._execute(url, 'DELETE', headers, null);
    }
}