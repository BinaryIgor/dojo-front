import { Response } from './model/response.js';

export class SmartRequests {

    constructor(requests) {
        this._requests = requests;
    }

    //TODO are all of these headers needed?
    getJson(url, headers = {}) {
        return this._wrapRequestPromise(this._requests.get(url, headers));
    }

    getBlob(url, headers = {}) {
        return this._requests.get(url, headers).then(r => r.blob())
            .then(blob => Response.successOf(URL.createObjectURL(blob)))
            .catch(e => Response.failure([e]));
    }

    //TODO show status?
    _wrapRequestPromise(request) {
        return request.then(r => r.text()).then(r => {
            let response;
            try {
                console.log(`Raw response ${r}`);
                let parsed = JSON.parse(r);
                if (parsed.errors) {
                    response = Response.failure(parsed.errors);
                } else {
                    response = Response.successOf(parsed);
                }
            } catch (e) {
                response = Response.failure([r]);
            }
            return response;
        }).catch(e => {
            console.log(`Error occurred = ${e}`);
            return Response.failure([e]);
        });
    }

    //TODO json content type?
    postJson(url, data, headers = {}) {
        return this._wrapRequestPromise(this._requests.post(url, JSON.stringify(data), headers));
    }

    post(url, headers = {}) {
        return this._wrapRequestPromise(this._requests.post(url, null, headers));
    }

    putJson(url, data, headers = {}) {
        return this._wrapRequestPromise(this._requests.put(url, JSON.stringify(data), headers));
    }

    delete(url, headers = {}) {
        return this._wrapRequestPromise(this._requests.delete(url, headers));
    }
}