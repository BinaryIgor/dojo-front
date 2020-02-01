export class Requests {

    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    get(url, headers={}) {
        return this._execute(url, 'GET', headers, null);
    }

    //TODO remove no-cors
    _execute(url, method, headers, data) {
        return fetch(this._createUrl(url), {
            method: method,
            mode: 'no-cors',
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