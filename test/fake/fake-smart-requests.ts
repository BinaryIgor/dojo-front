import Response from "@/core/response/response";
import { ResponsePromise } from "@/core/types";
import SmartRequests from "@/core/request/smart-requests";
import { resolveResponse } from "./fakes";

export default class FakeSmartRequests implements SmartRequests {

    expectedResponse?: Response<any>
    expectedBlobResponse?: Response<string>
    capturedUrl?: string
    capturedBlobUrl?: string
    capturedData?: any

    getJson<T>(url: string): ResponsePromise<T> {
        this.capturedUrl = url;
        return resolveResponse(this.expectedResponse);
    }

    getBlob(url: string): ResponsePromise<string> {
        this.capturedBlobUrl = url;
        return resolveResponse(this.expectedBlobResponse);
    }

    postMultipart<T>(url: string, form: FormData): ResponsePromise<T> {
        this.capturedUrl = url;
        return resolveResponse(this.expectedResponse);
    }

    postJson<T>(url: string, data?: any): ResponsePromise<T> {
        this.capturedUrl = url;
        this.capturedData = data;
        return resolveResponse(this.expectedResponse);
    }

    putJson<T>(url: string, data?: any): ResponsePromise<T> {
        this.capturedUrl = url;
        this.capturedData = data;
        return resolveResponse(this.expectedResponse);
    }

    delete<T>(url: string): ResponsePromise<T> {
        this.capturedUrl = url;
        return resolveResponse(this.expectedResponse);
    }
}