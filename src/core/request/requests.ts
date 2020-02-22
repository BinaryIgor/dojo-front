export type RequestResponse = Response;

export default interface Requests {

    get(url: string, headers?: Headers): Promise<RequestResponse>

    post(url: string, data?: any, headers?: Headers): Promise<RequestResponse>

    put(url: string, data?: any, headers?: Headers): Promise<RequestResponse>

    delete(url: string, headers?: Headers): Promise<RequestResponse>
}