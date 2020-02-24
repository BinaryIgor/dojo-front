import Requests from "@/core/request/requests";
import FakeRequestResponse from "./fake-request-response";

export default class FakeRequests implements Requests {

    capturedUrl?: string
    capturedHeaders?: Headers
    capturedData?: any
    requestResponse: FakeRequestResponse = new FakeRequestResponse();


    get(url: string, headers?: Headers): Promise<Response> {
        return this.respondCapturing(url, undefined, headers);
    }

    private respondCapturing(url: string, data?: string, headers?: Headers): Promise<Response> {
        this.capturedUrl = url;
        this.capturedData = data;
        this.capturedHeaders = headers;
        return Promise.resolve(this.requestResponse);
    }

    post(url: string, data?: any, headers?: Headers): Promise<Response> {
        return this.respondCapturing(url, data, headers);
    }

    put(url: string, data?: any, headers?: Headers | undefined): Promise<Response> {
        return this.respondCapturing(url, data, headers);
    }

    delete(url: string, headers?: Headers | undefined): Promise<Response> {
        return this.respondCapturing(url, undefined, headers);
    }
}