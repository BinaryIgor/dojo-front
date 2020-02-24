import Requests from "./requests";
import TokenStore from "../store/token-store";

export default class HttpRequests implements Requests {

    private readonly baseUrl: string;
    private readonly tokenStore: TokenStore;

    constructor(baseUrl: string, tokenStore: TokenStore) {
        this.baseUrl = baseUrl;
        this.tokenStore = tokenStore;
    }

    get(url: string, headers?: Headers): Promise<Response> {
        return this.execute(url, 'GET', headers);
    }

    private execute(url: string, method: string, headers?: Headers, data?: any): Promise<Response> {
        headers = this.addTokenIf(headers);
        return fetch(this.createUrl(url), {
            method: method,
            headers: headers,
            body: data
        });
    }

    private createUrl(url: string): string {
        return `${this.baseUrl}/${url}`;
    }

    private addTokenIf(headers: Headers | undefined): Headers | undefined {
        if (!this.tokenStore.isEmpty()) {
            headers = headers == null ? new Headers() : headers;
            headers.append('Authorization', `Bearer ${this.tokenStore.get()}`);
        }
        return headers;
    }

    post(url: string, data?: any, headers?: Headers): Promise<Response> {
        return this.execute(url, 'POST', headers, data);
    }

    put(url: string, data?: any, headers?: Headers): Promise<Response> {
        return this.execute(url, 'PUT', headers, data);
    }

    delete(url: string, headers?: Headers): Promise<Response> {
        return this.execute(url, 'DELETE', headers);
    }
}