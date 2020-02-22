import { ResponsePromise } from "../../src/core/types";
import Response from "../../src/core/response/response";

export function resolveResponse<T>(response?: Response<T>): ResponsePromise<T> {
    return Promise.resolve(response ?? Response.failure(['FAKE_RESPONSE_NOT_DEFINED']));
}