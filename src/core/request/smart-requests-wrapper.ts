import Response from "../response/response";
import { RequestResponse } from "./requests";
import Requests from "./requests";
import { ResponsePromise } from "../types";
import SmartRequests from "./smart-requests";

export default class SmartRequestsWrapper implements SmartRequests {

    private readonly requests: Requests

    constructor(requests: Requests) {
        this.requests = requests;
    }

    getJson<T>(url: string): ResponsePromise<T> {
        return this.wrapRequestPromise(this.requests.get(url));
    }

    //TODO show status?
    private wrapRequestPromise<T>(request: Promise<RequestResponse>): ResponsePromise<T> {
        return request.then(r => r.text()).then(r => {
            let response: Response<T>;
            try {
                console.log(`Raw response ${r}`);
                const parsed = JSON.parse(r);
                if (parsed.errors) {
                    response = Response.failure(parsed.errors as string[]);
                } else {
                    response = Response.successOf(parsed as T);
                }
            } catch (e) {
                response = Response.failure([r]);
            }
            return response;
        }).catch(e => {
            console.log(`Error occured = ${e}`);
            return Response.failure([e]);
        });
    }

    getBlob(url: string): ResponsePromise<string> {
        return this.requests.get(url).then(r => r.blob())
            .then(blob => Response.successOf(URL.createObjectURL(blob)))
            .catch(e => Response.failure([e]));
    }

    postMultipart<T>(url: string, form: FormData): ResponsePromise<T> {
        return this.wrapRequestPromise(this.requests.post(url, form));
    }

    //TODO json content type?
    postJson<T>(url: string, data: any): ResponsePromise<T> {
        const json = JSON.stringify(data);
        return this.wrapRequestPromise(this.requests.post(url, json));
    }

    post<T>(url: string): ResponsePromise<T> {
        return this.wrapRequestPromise(this.requests.post(url));
    }

    putJson<T>(url: string, data: any): ResponsePromise<T> {
        const json = JSON.stringify(data);
        return this.wrapRequestPromise(this.requests.put(url, json));
    }

    put<T>(url: string): ResponsePromise<T> {
        return this.wrapRequestPromise(this.requests.put(url));
    }

    delete<T>(url: string): ResponsePromise<T> {
        return this.wrapRequestPromise(this.requests.delete(url));
    }
}