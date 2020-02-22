
import FakeHeaders from "./fake-headers";

export default class FakeRequestResponse implements Response {

    ok = true;
    headers = new FakeHeaders();
    redirected = false;
    status = 200;
    statusText = "OK";
    trailer = Promise.resolve(new FakeHeaders());
    type: ResponseType = "basic";
    url = "";

    textResponse?: string
    jsonResponse?: any
    blobResponse?: Blob

    static withText(text: string, status = 200): FakeRequestResponse {
        const response = new FakeRequestResponse();
        response.textResponse = text;
        response.status = status;
        return response;
    }

    static withJsonAsText(json: any, status = 200): FakeRequestResponse {
        return FakeRequestResponse.withText(JSON.stringify(json), status);
    }

    static withEmptyJson(status = 200): FakeRequestResponse {
        return FakeRequestResponse.withText("{}", status);
    }

    static withErrors(errors: string[], status = 400): FakeRequestResponse {
        const response = new FakeRequestResponse();
        response.textResponse = JSON.stringify({
            errors: errors
        });
        response.status = status;
        return response;
    }

    clone(): Response {
        throw new Error("Method not implemented.");
    }

    body: ReadableStream<Uint8Array> | null = null;
    bodyUsed = true;

    arrayBuffer(): Promise<ArrayBuffer> {
        throw new Error("Method not implemented.");
    }

    blob(): Promise<Blob> {
        if (this.blobResponse) {
            return Promise.resolve(this.blobResponse);
        }
        throw new Error("ResponseBlob is not set");
    }

    formData(): Promise<FormData> {
        throw new Error("Method not implemented.");
    }

    json(): Promise<any> {
        if (this.jsonResponse) {
            return Promise.resolve(this.jsonResponse);
        }
        throw new Error("ResponseJson is not set");
    }

    text(): Promise<string> {
        if (this.textResponse) {
            return Promise.resolve(this.textResponse);
        }
        throw new Error("ResponseText is not set");
    }
}