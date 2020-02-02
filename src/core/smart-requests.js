import { Response } from './model/response.js';

export class SmartRequests {

    constructor(requests) {
        this._requests = requests;
    }

    getJson(url, headers = {}) {
        return this._wrapRequestPromise(this._requests.get(url, headers));
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
                    response = Response.success(parsed);
                }
            } catch (e) {
                response = Response.failure([r]);
            }
            return response;
        })
            .catch(e => {
                console.log(`Error occurred = ${e}`);
                return Response.failure([e]);
            });
    }

    //TODO json content type?
    postJson(url, data, headers = {}) {
        return this._wrapRequestPromise(this._requests.post(url, JSON.stringify(data), headers));
    }

    putJson(url, data, headers = {}) {
        return this._wrapRequestPromise(this._requests.put(url, JSON.stringify(data), headers));
    }

    delete(url, headers = {}) {
        return this._wrapRequestPromise(this._requests.delete(url, headers));
    }
}