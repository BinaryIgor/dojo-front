import { Response } from './model/response.js';

export class SmartRequests {

    constructor(requests) {
        this._requests = requests;
    }

    getJson(url, responseCallback, headers = {}) {
        return this._wrapRequestPromise(this._requests.get(url, headers), responseCallback);
    }

    //TODO show status?
    _wrapRequestPromise(request, responseCallback) {
        return request.then(r => r.text())
            .then(r => {
                let response;
                try {
                    let parsed = JSON.parse(r);
                    if (parsed.errors) {
                        response = Response.failure(parsed.errors);
                    } else {
                        response = Response.success(parsed);
                    }
                } catch (e) {
                    response = Response.failure([r]);
                }
                responseCallback(response);
            })
            .catch(e => responseCallback(Response.failure([e])));
    }

    //TODO json content type?
    postJson(url, data, responseCallback, headers = {}) {
        return this._wrapRequestPromise(this._requests.post(url, JSON.stringify(data), headers),
            responseCallback);

    }

    putJson(url, data, responseCallback, headers = {}) {
        return this._wrapRequestPromise(this._requests.put(url, JSON.stringify(data), headers),
            responseCallback);
    }

    delete(url, responseCallback, headers = {}) {
        return this._wrapRequestPromise(this._requests.delete(url, headers), responseCallback);
    }
}