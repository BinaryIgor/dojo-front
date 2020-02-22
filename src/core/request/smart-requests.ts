import { ResponsePromise } from "../types";

export default interface SmartRequests {

    getJson<T>(url: string): ResponsePromise<T>

    getBlob(url: string): ResponsePromise<string>

    postMultipart<T>(url: string, form: FormData): ResponsePromise<T>

    postJson<T>(url: string, data?: any): ResponsePromise<T>

    putJson<T>(url: string, data?: any): ResponsePromise<T>

    delete<T>(url: string): ResponsePromise<T>
}